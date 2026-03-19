-- 1. Create a function that inserts a new row into your public "User" table
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."User" (id, email, name, image, "updatedAt")
  values (
    new.id::text,                          -- Use the Supabase Auth ID
    new.email,                             -- Use the user's email
    new.raw_user_meta_data->>'full_name',  -- Extract name from Google metadata
    new.raw_user_meta_data->>'avatar_url', -- Extract profile pic from Google metadata
    now()                                  -- Set the initial updatedAt time
  );
  return new;
end;
$$;

-- 2. Create the trigger that runs the function above every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
