-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- No public read access
CREATE POLICY "No public read for newsletter" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (false);

-- Add admin_key column to rsvps for admin access
-- Create admin access function (service role only)
CREATE OR REPLACE FUNCTION public.get_all_rsvps()
RETURNS SETOF public.rsvps
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.rsvps ORDER BY created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.get_all_subscribers()
RETURNS SETOF public.newsletter_subscribers
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.newsletter_subscribers ORDER BY created_at DESC;
$$;