-- Add IP address column to feedback table
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS ip_address TEXT;

-- Enable RLS on feedback table
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create function to validate feedback
CREATE OR REPLACE FUNCTION public.validate_feedback()
RETURNS TRIGGER AS $$
BEGIN
    -- Rate limiting: máximo 5 feedbacks por dia por IP
    IF EXISTS (
        SELECT 1
        FROM public.feedback
        WHERE created_at > NOW() - INTERVAL '1 day'
        AND ip_address = current_setting('request.headers')::json->>'x-forwarded-for'
        GROUP BY ip_address
        HAVING COUNT(*) >= 2
    ) THEN
        RAISE EXCEPTION 'Rate limit exceeded: maximum 5 feedbacks per day per IP';
    END IF;
    
    -- Validar email se fornecido
    IF NEW.email IS NOT NULL AND NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format';
    END IF;

    -- Validar conteúdo (não vazio e tamanho máximo)
    IF NEW.content IS NULL OR length(NEW.content) = 0 THEN
        RAISE EXCEPTION 'Feedback content cannot be empty';
    END IF;

    IF length(NEW.content) > 1000 THEN
        RAISE EXCEPTION 'Feedback content cannot exceed 1000 characters';
    END IF;
    
    -- Set IP address from request headers
    NEW.ip_address := current_setting('request.headers')::json->>'x-forwarded-for';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS validate_feedback_trigger ON public.feedback;

-- Create trigger for feedback validation
CREATE TRIGGER validate_feedback_trigger
    BEFORE INSERT ON public.feedback
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_feedback();

-- Drop existing policies if any
DROP POLICY IF EXISTS "Feedback anon and logged" ON public.feedback;
DROP POLICY IF EXISTS "Allow authenticated users to insert feedback" ON public.feedback;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.feedback;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.feedback;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users" ON public.feedback
    FOR SELECT TO authenticated
    USING (true);

-- Allow both authenticated and anonymous users to insert feedback
CREATE POLICY "Enable insert for all users" ON public.feedback
    FOR INSERT TO anon, authenticated
    WITH CHECK (
        content IS NOT NULL
        AND length(content) > 0
        AND length(content) <= 1000
        AND (
            email IS NULL 
            OR email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
        )
    );

-- Add comment to explain the security measures
COMMENT ON FUNCTION public.validate_feedback IS 'Validates feedback submissions with rate limiting and email validation';
COMMENT ON COLUMN public.feedback.ip_address IS 'IP address of the feedback submitter for rate limiting'; 