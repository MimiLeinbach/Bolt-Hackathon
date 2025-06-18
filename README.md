Product Requirements Document (PRD)
AI Itinerary - MVP for Bolt Hackathon
Vision: A collaborative trip planning web app that makes group travel planning simple and fun.

Team Structure:

Mimi: Trip Creation (forms, validation, trip setup)
Avril: Itinerary & Activities (day views, activity management)
Emily: Collaboration Features (sharing, participant management)
User Stories:

Mimi's Features (Trip Creation):

As a user, I can create a new trip with name, start date, end date, and participant count
As a user, I can see a clean form with validation
As a user, I can view a trip summary after creation
As a user, I can edit trip details
Avril's Features (Itinerary/Activities):

As a user, I can view days auto-generated from date range
As a user, I can add activities to specific days
As a user, I can see activity details (description, location, cost, who added it)
Emily's Features (Collaboration):

As a user, I can generate shareable links for trips
As a user, I can see participant bubbles when people join
As a user, I can manage who has access to the trip
Technical Architecture for Minimal Conflicts:

Separate route files for each feature area
Shared components in /components/shared/
Individual stores for each feature using Zustand
Mock data in /data/ folder
Local storage utilities in /utils/
Ready to build your trip creation foundation, Mimi? I'll set up:

Clean project structure
Trip creation form with validation
Trip store for state management
Basic routing structure
Shared components you'll all use
