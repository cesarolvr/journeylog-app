-- Set timezone
SET timezone TO 'UTC';

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sequences
CREATE SEQUENCE IF NOT EXISTS public.feedback_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Create journey table
CREATE TABLE IF NOT EXISTS public.journey (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    user_id UUID NOT NULL,
    name VARCHAR NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    selected_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    theme TEXT DEFAULT 'dark' NOT NULL,
    font TEXT DEFAULT 'default',
    frequency TEXT DEFAULT 'daily'
);

-- Create log table
CREATE TABLE IF NOT EXISTS public.log (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    type VARCHAR DEFAULT 'BULLET',
    content VARCHAR,
    journey_id UUID NOT NULL,
    user_id UUID NOT NULL,
    FOREIGN KEY (journey_id) REFERENCES public.journey(id),
    FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Create notification table
CREATE TABLE IF NOT EXISTS public.notification (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enabled_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    journey_id UUID NOT NULL,
    user_id UUID NOT NULL,
    "when" TEXT DEFAULT 'daily' NOT NULL,
    "where" TEXT DEFAULT 'email' NOT NULL,
    last_sent TIMESTAMP WITH TIME ZONE,
    next_sent TIMESTAMP WITH TIME ZONE,
    email TEXT,
    phone TEXT,
    journey_name TEXT NOT NULL,
    user_name TEXT NOT NULL,
    FOREIGN KEY (journey_id) REFERENCES public.journey(id),
    FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
    id BIGINT DEFAULT nextval('public.feedback_id_seq'::regclass) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    content VARCHAR NOT NULL,
    email VARCHAR
);

-- Create indexes
CREATE INDEX IF NOT EXISTS journey_user_id_idx ON public.journey(user_id);
CREATE INDEX IF NOT EXISTS log_journey_id_idx ON public.log(journey_id);
CREATE INDEX IF NOT EXISTS log_user_id_idx ON public.log(user_id);
CREATE INDEX IF NOT EXISTS notification_journey_id_idx ON public.notification(journey_id);
CREATE INDEX IF NOT EXISTS notification_user_id_idx ON public.notification(user_id);

-- Enable Row Level Security
ALTER TABLE public.journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Journey policies
CREATE POLICY "Enable delete for users based on user_id" ON public.journey
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Enable insert for authenticated users only" ON public.journey
    FOR INSERT TO authenticated WITH CHECK (true);

-- Log policies
CREATE POLICY "Allow users to view their own logs" ON public.log
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own logs" ON public.log
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own logs" ON public.log
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own logs" ON public.log
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Notification policies
CREATE POLICY "Allow edge functions unrestricted access to notifications" ON public.notification
    FOR ALL TO anon USING (true);

CREATE POLICY "Permitir que usuários vejam suas próprias notificações" ON public.notification
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Permitir que usuários adicionem suas próprias notificações" ON public.notification
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Permitir que usuários atualizem suas próprias notificações" ON public.notification
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Permitir que usuários removam suas próprias notificações" ON public.notification
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Feedback policy
CREATE POLICY "Feedback anon and logged" ON public.feedback
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER handle_journey_updated_at
    BEFORE UPDATE ON public.journey
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_log_updated_at
    BEFORE UPDATE ON public.log
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Set ownership
ALTER TABLE public.journey OWNER TO postgres;
ALTER TABLE public.log OWNER TO postgres;
ALTER TABLE public.notification OWNER TO postgres;
ALTER TABLE public.feedback OWNER TO postgres;
ALTER SEQUENCE public.feedback_id_seq OWNER TO postgres;
ALTER FUNCTION public.handle_updated_at() OWNER TO postgres; 