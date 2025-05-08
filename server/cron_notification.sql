-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

select
  cron.schedule (
    'send-reminders',
    '0 * * * *',
    'select "send_notifications"()'
  );

    -- '0 * * * *',
create
or replace function send_notifications () returns void language plpgsql as $$
DECLARE
    notification_record RECORD;
    notifications JSONB := '[]'::jsonb;
BEGIN
    FOR notification_record IN 
        SELECT * 
        FROM notification 
        WHERE date_trunc('hour', next_sent) = date_trunc('hour', NOW())
        AND next_sent::date = NOW()::date
    LOOP
        notifications := notifications || jsonb_build_object('id', notification_record.id, 'journey_id', notification_record.journey_id, 'user_id', notification_record.user_id, 'when', notification_record."when", 'phone', notification_record."phone", 'where', notification_record."where", 'next_sent', notification_record.next_sent, 'last_sent', notification_record.last_sent, 'journey_name', notification_record.journey_name, 'user_name', notification_record.user_name, 'email', notification_record.email);
    END LOOP;
      
    raise log 'notifications: %', notifications;
    IF notifications <> '[]'::jsonb THEN
        PERFORM
          net.http_post(
            url:='https://hlxsttizrktwfgsnumqm.supabase.co/functions/v1/reminder',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhseHN0dGl6cmt0d2Znc251bXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MzA0NzcsImV4cCI6MjAzNjMwNjQ3N30.yC0edYJFAW1SpzVboOchttm8e-_UpNxfZtJNxMgYldo"}'::jsonb,
            -- body:=notifications::jsonb
            body:=notifications::jsonb
            
          );
    ELSE
        RAISE NOTICE 'No notifications to send.';
    END IF;
END;
$$

select
  send_notifications ();

select
  cron.unschedule ('send-reminders');