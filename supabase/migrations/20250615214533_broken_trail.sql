/*
  # Fix infinite recursion in trips RLS policies

  1. Policy Changes
    - Drop existing problematic policies that cause infinite recursion
    - Create new policies that avoid circular dependencies
    - Ensure trip creators can read their own trips immediately
    - Allow trip participants to read trips they're part of without recursion

  2. Security
    - Maintain proper access control
    - Prevent unauthorized access to trips
    - Allow proper trip creation workflow
*/

-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Users can read trips they participate in" ON trips;
DROP POLICY IF EXISTS "Users can create trips" ON trips;
DROP POLICY IF EXISTS "Trip owners can update trips" ON trips;

-- Create new policies that avoid recursion
CREATE POLICY "Users can read their own created trips"
  ON trips
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can read trips where they are participants"
  ON trips
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT trip_id 
      FROM trip_participants 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create trips"
  ON trips
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Trip creators can update their trips"
  ON trips
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Trip owners can update trips via participants"
  ON trips
  FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT trip_id 
      FROM trip_participants 
      WHERE user_id = auth.uid() 
      AND role = 'owner'
    )
  );