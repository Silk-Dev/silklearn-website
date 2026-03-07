create table if not exists waitlist_signups (
  id bigserial primary key,
  email text not null unique,
  company_name text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_signups_created_at_idx
  on waitlist_signups (created_at desc);