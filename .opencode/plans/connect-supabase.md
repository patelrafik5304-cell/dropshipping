# Connect Supabase

## Current State
- `@supabase/supabase-js` and `@supabase/ssr` installed
- `lib/supabase.ts` - client with server and browser helpers
- `middleware.ts` - auth session refresh middleware
- `lib/types.ts` - TypeScript types for all 4 tables
- `supabase/schema.sql` - SQL schema ready to run
- `.env.local` exists but has empty values

## Plan
1. Write `.env.local` with the user's Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL=https://uwacdtneetegljotgqoo.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...28A`
2. Verify the connection works by testing the Supabase client
3. Verify the schema tables exist (or remind user to run schema.sql)
4. Build and confirm no errors
