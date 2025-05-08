-- Create function to check journey limit for free users
CREATE OR REPLACE FUNCTION public.check_journey_limit()
RETURNS TRIGGER AS $$
DECLARE
    journey_count INTEGER;
    is_pro BOOLEAN;
BEGIN
    -- Check if user is pro
    SELECT EXISTS (
        SELECT 1 
        FROM public.users 
        WHERE id = NEW.user_id 
        AND subscription = 'habit_creator'
    ) INTO is_pro;

    -- If user is not pro, check journey count
    IF NOT is_pro THEN
        SELECT COUNT(*) 
        INTO journey_count 
        FROM public.journey 
        WHERE user_id = NEW.user_id;

        IF journey_count >= 2 THEN
            RAISE EXCEPTION 'Free users can only create up to 2 journeys. Please upgrade to Pro for unlimited journeys.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for journey limit
DROP TRIGGER IF EXISTS check_journey_limit_trigger ON public.journey;
CREATE TRIGGER check_journey_limit_trigger
    BEFORE INSERT ON public.journey
    FOR EACH ROW
    EXECUTE FUNCTION public.check_journey_limit();

-- Add comment to explain the security measure
COMMENT ON FUNCTION public.check_journey_limit IS 'Enforces a limit of 2 journeys for free users'; 