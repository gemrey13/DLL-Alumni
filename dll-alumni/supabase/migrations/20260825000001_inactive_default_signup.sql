-- Migration: Change default signup status from 'active' to 'inactive'
-- New users who register via the public signup form will start as 'inactive'
-- and must be activated by an admin after verifying their alumni status.
--
-- Note: Admin-created accounts (via admin panel or service role) are unaffected
-- because they go through different insert paths.

-- Replace the handle_new_user trigger function to set status = 'inactive'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, first_name, last_name, status)
  VALUES (
    NEW.id,
    'alumni',
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'inactive'
  );
  -- Create default notification preferences
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The trigger itself doesn't need to be recreated since we're replacing the function.
-- If the trigger doesn't exist yet, create it:
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END
$$;
