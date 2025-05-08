-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

select
  cron.schedule (
    'subscriptions-cleanup',
    '* 9 * * *',
    'select "cancel_subscription"()'
  );
    -- '* 9 * * *',


  create
or replace function cancel_subscription () returns void language plpgsql as $$
BEGIN
  -- Atualizar os usuários na tabela `users`
  WITH updated_users AS (
    UPDATE users
    SET subscription = 'free', to_cancel_at = null
    WHERE date_trunc('day', to_cancel_at) = date_trunc('day', NOW())
      AND subscription = 'habit_creator'
    RETURNING id -- retorna o id dos usuários atualizados
  )
  -- Deletar notificações associadas aos usuários atualizados
  DELETE FROM notification
  WHERE user_id IN (SELECT id FROM updated_users);
END
$$

select
  cron.unschedule ('subscriptions-cleanup');