-- Create function to check if user is pro
CREATE OR REPLACE FUNCTION public.is_pro_user(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.users
        WHERE id = user_id
        AND subscription = 'habit_creator'
        AND to_cancel_at IS NULL
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to validate notification creation
CREATE OR REPLACE FUNCTION public.validate_notification_creation()
RETURNS TRIGGER AS $$
BEGIN
    -- Allow edge functions to bypass this check
    IF (SELECT current_setting('request.jwt.claims', true))::json->>'role' = 'service_role' THEN
        RETURN NEW;
    END IF;

    -- Check if user is pro
    IF NOT public.is_pro_user(NEW.user_id) THEN
        RAISE EXCEPTION 'Only pro users can create notifications';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for notification validation
CREATE TRIGGER validate_notification_creation_trigger
    BEFORE INSERT ON public.notification
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_notification_creation();

-- Update RLS policies to include pro user check
DROP POLICY IF EXISTS "Permitir que usuários adicionem suas próprias notificações" ON public.notification;
CREATE POLICY "Permitir que usuários pro adicionem suas próprias notificações" ON public.notification
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() = user_id AND
        public.is_pro_user(user_id)
    );

-- Add comment to explain the validation
COMMENT ON FUNCTION public.is_pro_user IS 'Checks if a user has an active habit_creator subscription';
COMMENT ON FUNCTION public.validate_notification_creation IS 'Validates that only pro users can create notifications'; 