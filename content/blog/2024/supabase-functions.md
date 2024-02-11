---
title: "Supabase functions"
pubDate: 2024-02-11T09:00:00+03:00
draft: false
tags: ["supabase", "postgresql", "function", "trigger"]
category: "development"
featuredImage: "/posts/2024/supabase-functions/cover.webp"
---

Recently I started to work with [Supabase](https://supabase.com), which I must addmit is a joy to use!, but I was stuck on some logic I wanted to do which is to create an organization and a user profile when a new user signup. So naturally I started to read about supabase functions which are [PostgreSQL functions](https://www.postgresql.org/docs/current/functions.html).

It wasn't very easy thing to do, since I didn't use [PostgreSQL](https://www.postgresql.org) since version 9 and I didn't know about all the latest and greatest, but that didn't stopped me from Google Search it, ask ChatGPT about it, watching some YouTube tutorials, and read some blog posts on it - I couldn't find anything close to what I needed to achieve. So I put some old school music and got to work - play with it for hours while reading the PostgreSQL documentation, and finally I succeeded!

As I said before, I couldn't find anyone that publish something close to it, so I figure I have to.

The signup method is looking like this:

```javascript
const { data, error } = await supabase.auth.signUp({
  email: localState.email,
  password: localState.password,
  options: {
    data: {
      first_name: localState.firstName,
      last_name: localState.lastName,
      organization_name: localState.organizationName,
    },
  },
});
```

As you can see, there is the email and password, which is passed to the signUp method, but the extrea information is `first_name` and `last_name` which I wanted to put in the `profiles` table, and the `organization_name` which I wanted to put in the `organizations` table. And, of course, linked them all together with some old school foreign keys.

&nbsp;

## 1. Tables

So, first let's create the `profiles` table:

```sql
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  phone text,
  organization_id uuid references public.organizations on delete cascade not null,
);
```

And now let's create the `organizations` table:

```sql
create table organizations (
  id uuid not null primary key,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  name text,
);
```

As you can see the `profiles` table is the one linking between the user from `auth` table and the organization from `organizations` table. And you can head over to the Database tab to see the schema in a graphical representation with Supabase Schema Visualizer:

![Schema Visualizer](/posts/2024/supabase-functions/schema-visualizer.webp "Schema Visualizer")

&nbsp;

## 2. Function

Now it's time to create the function itself. The function should get the `organization_name` and create a new organization in the `organizations` table. We should save the organization newly created id to then use it when we create a new profile in the `profiles` table, along with the `first_name` and `last_name` from the signUp extrea options.

```sql
create or replace function handle_new_org_and_profile() returns trigger as $$
declare
  org_id uuid;
begin
  -- insert new organization
  insert into public.organizations(name)
  values (new.raw_user_meta_data->>'organization_name')
  returning id into org_id;
  --  insert new profile
  insert into public.profiles (id, first_name, last_name, organization_id)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', org_id);
  return new;
end;
$$ language plpgsql security definer;
```

The object from the signUp call is hosted in this `new` variable, and the extrea options are in the `raw_user_meta_data` field. The two separated insert statment don't share a state, but we need to take the newly created organization id somehow. To do that we `declare` an id at the top of the function which every statement in the function and access too.

We `returning` the id from the `insert` command `into` the `org_id` variable we declared. Then we can use it in the next `insert` statement for our `organization_id` column.

&nbsp;

## 3. Trigger

Finally, somehow need to call this function automatically every time a new row is created in the `auth.users` table, and we can do that with [triggers](https://supabase.com/docs/guides/database/postgres/triggers). So let's create a trigger to execute the `handle_new_org_and_profile` function we created above for each row in `auth.users` after the database insert the row.

```sql
create trigger on_auth_user_create_org_and_profile
  after insert on auth.users
  for each row execute procedure handle_new_org_and_profile();
```

&nbsp;

## 4. Summary

You're not all set.
