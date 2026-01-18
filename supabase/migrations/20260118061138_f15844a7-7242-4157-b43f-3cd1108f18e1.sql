-- Create RSVP table for storing guest registrations
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert RSVPs (public form)
CREATE POLICY "Anyone can submit RSVP" 
ON public.rsvps 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading via backend/admin (no public read)
CREATE POLICY "No public read access" 
ON public.rsvps 
FOR SELECT 
USING (false);