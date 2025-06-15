/*
  # Fix user signup trigger

  1. Database Functions
    - Create or replace `handle_new_user` function to automatically create profile entries
    - Function extracts user data from auth.users and creates corresponding profile

  2. Triggers
    - Create trigger to call `handle_new_user` function after user insertion
    - Ensures every new user gets a profile created automatically

  3. Security
    - Function runs with security definer privileges to bypass RLS
    - Only creates profiles for newly inserted auth users
*/

-- Create or replace the function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger to automatically call handle_new_user when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();