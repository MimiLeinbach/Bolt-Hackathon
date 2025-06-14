# **AI Itinerary PRD & Planning Document**


# **Bolt Hackathon Project \- AI Itinerary PRD** {#bolt-hackathon-project---ai-itinerary-prd}

# TL;DR

AI Itinerary is designed to make group trip planning effortless, transparent, and fun. It solves the mess of coordinating accommodations, activities, and meals by giving groups a shared hub for organizing every detail, tracking costs, and syncing payments seamlessly. The product targets friends, families, and coworkers planning trips together, drawing on needs surfaced in the attached personas.  
---

## Goals

### Business Goals

* Launch a fully functional responsive web MVP for the hackathon, demonstrating seamless group trip coordination.  
* Validate demand by targeting 10+ active groups using the platform post-hackathon.  
* Garner positive user feedback (80%+ satisfaction rate from initial testers). “Easier than building a Google Sheet”

### User Goals

* Enable fast and clear setup of shared trips, minimizing confusion in group coordination.  
* Ensure every participant has visibility into itineraries and costs.  
* Centralize trip communication and planning so nothing is lost across multiple channels.  
* Make managing group expenses easy and transparent, reducing manual calculation and platform-hopping.  
* Create a delightful, inclusive experience—no one left out or overwhelmed.

### Non-Goals

* Supporting enterprise-grade features (e.g., complex permissions, API for third-party vendors).  
* Deep, custom travel booking integrations (airfare, hotels) for MVP.  
* In-app real-time chat (beyond pragmatic comment threads within trip content).  
* Integrations with payment apps such as Splitwise for MVP.

---

## User Stories

**Persona 1:** “The Planner” (e.g., Jess—Organizational Enthusiast, takes charge of details)

* As a Planner, I want to create a new group trip and add all participants, so that everyone is on the same page from the start.  
* As a Planner, I want to pre-fill dates and suggest initial accommodation options, so the group can weigh in.  
* As a Planner, I want to track each participant’s RSVP and availability, so no one is scheduled for days they can't attend.  
* As a Planner, I want to assign activities/meals to participants, so the work of organizing is shared.  
* As a Planner, I want to review all trip costs by person, so I can keep the group’s budget balanced.

**Persona 2:** “The Busy Joiner” (e.g., Alex—Wants involvement but limited time)

* As a Joiner, I want an easy way to sign in and see all my upcoming trips, so I never lose track.  
* As a Joiner, I want to quickly update my availability, so the group has accurate info.  
* As a Joiner, I want to view the trip’s accommodations, activities, and meals, so I am prepared and feel included.  
* As a Joiner, I want to see exactly what I owe (and pay it easily), so I’m never surprised by costs.

---

## 

## 

## 

## 

## 

## Technical Scope for Bolt MVP

## Pages & Components

## 1\. Home/Welcome Screen

* ## Create Trip” button

* Create “I already have an account” Button

## 2\. Create Trip Form

* ## Inputs: Name, Start Date, End Date, \#Participants

## 3\. Itinerary Page

* ## Trip name, start date, and number of participants displayed at the top

* ## Days auto-generated based on date range

* ## “Add Activity” button per day

* ## “Add Accomodation” button per day

* “Add Meal button” per day

## 4\. Add Activity Modal

* ## Inputs: Description, Location, Date, Cost (optional)

* ## Auto-tag “Added by \[name\]

## 5\. \*\*Invite Screen\*\*

* ## Once 1–2 activities are added, show shareable link or option to invite friends by input their emails

* ## Participant bubbles shown at the top of the itinerary page when others join

## Functional Requirements

* **Onboarding & Access (Priority: Critical)**  
  * Sign-in capability for trip participants  
  * Personalized landing page displaying user’s upcoming trips  
  * Content visibility restricted to authenticated participants  
  * Create new trip: enter trip name, date range, and number of people  
  * Itinerary split by days based on selected range  
  * Each activity shows date, description, location, cost (optional), and who added it  
  * Participants can be invited via link or email  
  * Any participant can add/edit/reorder activities

* **Trip Management (Priority: Critical)**  
  * Circular image for each participant consisting of initials on color background; manual edit option.  
  * For each trip: list of participants with images shown at top; editable individual date ranges (default to trip dates).  
* **Trip Content Management (Priority: High)**  
  * Three organizer modules per trip: Accommodations, Activities, Meals.  
  * In each section: add line items with unlimited-length description, date, location, cost, and participant subset.  
  * Default participant set to all; may edit per item.  
  * Real-time cost per person calculation for each line item.  
  * Ability to reorder line items via drag & drop.  
* **Expense Tracking & Payments (Priority: High)**  
  * Show total trip cost per participant (auto-calculated from items).  
  * Basic cost tracking and cost-per-person calculation per item (optional in MVP)  
  * Future-proof for integration into payment apps such as Splitwise  
* **Collaboration (Priority: Medium)**  
  * All participants are able to add, edit, or reorder line items within trip sections.  
  * Comments or suggestions on trip content (lightweight, non-chat).  
* **Platform Compatibility (Priority: Essential)**  
  * Responsive, consistent experience across web, iPhone, and Android.

---

## User Experience

**Entry Point & First-Time User Experience**

* When opening the app, user (the planner) lands into a welcome screen with two options either to create a trip or to access to their account if they already have one  
* The User creating a trip is guided through naming, date selection, and number of participants.  
* A dashboard is created with a Default, playful AI-generated image for the trip at the top. User (the planner) can start building the trip. The dashboard has three buttons: add accommodation, add an activity and add a meal/food (modules)  
* As the planner inputs accommodations, activities and meals, the dashboard displays the itinerary broken by day and modules  
* Once the planner has added 3-5 modules , a micro-interaction pops up to encourage the planner to invite friends to collaborate/or share the trips with friends.   
* If the user confirms, then they are invited to create a profile (account) and then to add the emails of their friends


  
**Core Experience**

* Step 1: User selects a trip from “My Trips.”  
  * Clean dashboard with participant bubbles and trip details up top.  
  * UI echoes across devices for ease of use.  
* Step 2: Review and manage participant info.  
  * Each participant can edit their travel dates and avatar/image.  
  * Visual date range displayed; updates in real-time for everyone.  
* Step 3: Drill into trip content: Accommodations, Activities, Meals.  
  * Each section contains a sortable, additive list of items.  
  * Rich item entry: Description (unlimited), date, location, relevant participants.  
  * Costs auto-calculated and displayed per item; participant cost auto-updated.  
* Step 4: Cost Management  
  * Current total owed per participant visible in header/footer.  
* Step 5: Collaboration features  
  * Any participant can add items, suggest edits, or reorder plans.  
  * Light in-line commenting for discussion (no real-time chat for MVP).

**Advanced Features & Edge Cases**

* Error handling: If a participant’s date range doesn’t cover a scheduled item, prompt to adjust.  
* Handling trip overflows (more than, e.g., 12 participants shown as \+N bubble).

**UI/UX Highlights**

* High-contrast, intuitive icons/buttons and universal navigation.  
* Consistent experience: trip management flows identical across web and apps.  
* Clean, mobile-friendly layout with day-by-day trip breakdown  
* Participant avatars shown in circles with initials or images  
* Smooth, intuitive add/edit flow with modals  
* Real-time updates when trip is modified  
* Delightful, minimal UI for a friendly experience

---

## Narrative

Jess, the go-to planner in her friend group, is done juggling spreadsheets. She opens the app, creates a trip, adds trip name, dates, and starts entering activities that all her friends have already agreed on during the last potluck. After 2–3 entries, she invites friends via link or email. Alex, who’s busy at work, joins from the link, immediately sees the trip’s essentials: who’s coming, the exact dates, and the latest plan for cabins, hikes, and shared dinners, and adds his favorite hike. Everyone contributes—no confusion, no stress

---

## Success Metrics

### User-Centric Metrics

* % of invited participants who sign in and join a trip (Target: \>85%)  
* Number of trips fully planned (all sections filled, costs split) per week   
* User satisfaction score from post-trip survey (Target: \>80% of test users say it’s easier to plan a trip with our app then creating a Google Sheet)

### Business Metrics

* Total number of trips created within 30 days of hackathon  
* User retention rate 2 weeks after first trip (Target: 60%+ users create a second trip within 90 days of the first one. 

### Technical Metrics

* Cross-platform visual QA score (Goal: no critical issues)  
* Uptime/reliability during hackathon demo/live test (Target: \>99%)  
* Error/bug rate from user reported issues (Target: \<1 per 10 active users)

### Tracking Plan

* Trip creation/ join events  
* Participant sign-in/sign-up/conversion  
* Item add/edit/delete/reorder actions  
* Cost editing  
* Comments added/suggested activities

---

## Technical Considerations

### Technical Needs

* Modern web front end (mobile-first design)  
* Simple back-end for authentication, trip, participant, and content data; role-based access for privacy.

### Data Storage & Privacy

* Store all content in secure, privacy-compliant storage (encrypted personal info, images, audit logs).  
* Restrict trip data visibility to authenticated, added participants only.  
* Simple “delete my account/data” option in product.

### Scalability & Performance

* Designed to comfortably handle 10–20 active trips/groups concurrently in MVP.  
* Lightweight, efficient app for quick loading and offline-resilient UI for mobile.

### Potential Challenges

* Cross-platform UX consistency with small engineering team.  
* Smooth participant onboarding (especially mobile signups) with minimal friction.

---

## **3-Person Team Division**

### **Mimi \- Person 1: Authentication & Trip Management**

**Responsibilities:**

* User authentication system (Google OAuth)  
* "My Trips" dashboard  
* Trip creation flow  
* User profile management  
* Database schema design

**Key Screens:** Landing/Sign-in, Dashboard, Create Trip, Profile

### **Avril \- Person 2: Trip Details & Line Items**

**Responsibilities:**

* Trip detail page with tabbed interface  
* Line item CRUD (Create, Read, Update, Delete)  
* Cost calculation logic  
* Participant display and basic management

**Key Screens:** Trip Overview, Add/Edit Line Item modals, all 3 tab views

### **Emily \- Person 3: UI/UX & Integration**

**Responsibilities:**

* Responsive design system and components  
* State management and API integration  
* Basic expense summary and totals  
* Polish and bug fixes

**Key Focus:** Overall user experience, component library, API coordination

# **Requirements** {#requirements}

* # Provide a simple, clear way for groups to coordinate trips together. 

* Landing page shows upcoming trips  
* New trips can be added on trips page  
* A circular graphic is associated with the trip and with each participant.   
* A date range is shown for each participant, default to the trip dates.  
* When a trip is selected, all participants are displayed at the top of the page.  
* Participants can edit their dates (default is trip dates) and images.  
* The total trip cost for each participant is shown (calculated from the line items for the trip)  
* The trip has 3 content sections: accommodations, activities, meals   
* Line items can be added beneath each section  
* All trip participants can add line items   
* The following content entries are associated with each line item: Description (unlimited length), Date, Location, Cost, Participants (default to all trip participants)  
* The Cost per person is calculated and displayed with each line item  
* Line items can be reordered, edited, or deleted

### **Wireframes** {#wireframes}

\<\!DOCTYPE html\>  
\<html lang="en"\>  
\<head\>  
    \<meta charset="UTF-8"\>  
    \<meta name="viewport" content="width=device-width, initial-scale=1.0"\>  
    \<title\>AI Itinerary \- Wireframes\</title\>  
    \<style\>  
        \* {  
            margin: 0;  
            padding: 0;  
            box-sizing: border-box;  
        }  
          
        body {  
            font-family: \-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;  
            background: \#f5f5f5;  
            padding: 20px;  
        }  
          
        .wireframe-container {  
            max-width: 1200px;  
            margin: 0 auto;  
        }  
          
        .wireframe-title {  
            text-align: center;  
            margin-bottom: 30px;  
            color: \#333;  
        }  
          
        .wireframe-grid {  
            display: grid;  
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));  
            gap: 30px;  
            margin-bottom: 40px;  
        }  
          
        .wireframe {  
            background: white;  
            border: 2px solid \#ddd;  
            border-radius: 8px;  
            padding: 20px;  
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);  
        }  
          
        .wireframe h3 {  
            color: \#2563eb;  
            margin-bottom: 15px;  
            text-align: center;  
            border-bottom: 2px solid \#e5e7eb;  
            padding-bottom: 8px;  
        }  
          
        .screen {  
            border: 1px solid \#333;  
            border-radius: 4px;  
            padding: 15px;  
            background: \#fafafa;  
            min-height: 400px;  
        }  
          
        .header {  
            background: \#2563eb;  
            color: white;  
            padding: 10px;  
            margin: \-15px \-15px 15px \-15px;  
            border-radius: 3px 3px 0 0;  
            display: flex;  
            justify-content: space-between;  
            align-items: center;  
        }  
          
        .nav-tabs {  
            display: flex;  
            border-bottom: 1px solid \#ddd;  
            margin-bottom: 15px;  
        }  
          
        .nav-tab {  
            flex: 1;  
            padding: 8px;  
            background: \#f8f9fa;  
            border: 1px solid \#ddd;  
            border-bottom: none;  
            text-align: center;  
            font-size: 12px;  
        }  
          
        .nav-tab.active {  
            background: white;  
            border-bottom: 1px solid white;  
            margin-bottom: \-1px;  
        }  
          
        .card {  
            border: 1px solid \#ddd;  
            border-radius: 4px;  
            padding: 10px;  
            margin-bottom: 10px;  
            background: white;  
        }  
          
        .participant-row {  
            display: flex;  
            align-items: center;  
            gap: 10px;  
            margin-bottom: 8px;  
        }  
          
        .avatar {  
            width: 30px;  
            height: 30px;  
            border-radius: 50%;  
            background: \#e5e7eb;  
            display: flex;  
            align-items: center;  
            justify-content: center;  
            font-size: 12px;  
        }  
          
        .avatar.large {  
            width: 50px;  
            height: 50px;  
            font-size: 16px;  
        }  
          
        .button {  
            background: \#2563eb;  
            color: white;  
            border: none;  
            padding: 8px 16px;  
            border-radius: 4px;  
            cursor: pointer;  
            font-size: 12px;  
            margin: 2px;  
        }  
          
        .button.secondary {  
            background: \#6b7280;  
        }  
          
        .button.small {  
            padding: 4px 8px;  
            font-size: 10px;  
        }  
          
        .input {  
            border: 1px solid \#ddd;  
            padding: 6px;  
            border-radius: 3px;  
            width: 100%;  
            margin-bottom: 8px;  
            font-size: 12px;  
        }  
          
        .line-item {  
            border-left: 3px solid \#2563eb;  
            padding: 8px;  
            margin-bottom: 8px;  
            background: \#f8f9fa;  
        }  
          
        .cost-display {  
            background: \#dcfce7;  
            border: 1px solid \#16a34a;  
            padding: 6px;  
            border-radius: 3px;  
            text-align: center;  
            color: \#15803d;  
            font-weight: bold;  
            font-size: 12px;  
        }  
          
        .participants-header {  
            display: flex;  
            gap: 10px;  
            margin-bottom: 15px;  
            padding: 10px;  
            background: \#f1f5f9;  
            border-radius: 4px;  
        }  
          
        .modal-overlay {  
            position: fixed;  
            top: 0;  
            left: 0;  
            right: 0;  
            bottom: 0;  
            background: rgba(0,0,0,0.5);  
            display: flex;  
            align-items: center;  
            justify-content: center;  
        }  
          
        .modal {  
            background: white;  
            padding: 20px;  
            border-radius: 8px;  
            width: 90%;  
            max-width: 400px;  
        }  
          
        .form-group {  
            margin-bottom: 10px;  
        }  
          
        .form-group label {  
            display: block;  
            font-size: 12px;  
            margin-bottom: 4px;  
            color: \#374151;  
        }  
          
        .checkbox-group {  
            display: flex;  
            flex-wrap: wrap;  
            gap: 8px;  
            margin-top: 5px;  
        }  
          
        .checkbox-item {  
            display: flex;  
            align-items: center;  
            gap: 4px;  
            font-size: 11px;  
        }  
          
        .flow-description {  
            background: \#f0f9ff;  
            border: 1px solid \#0ea5e9;  
            border-radius: 4px;  
            padding: 10px;  
            margin-bottom: 15px;  
            font-size: 12px;  
            color: \#0c4a6e;  
        }  
    \</style\>  
\</head\>  
\<body\>  
    \<div class="wireframe-container"\>  
        \<h1 class="wireframe-title"\>AI Itinerary \- App Wireframes\</h1\>  
          
        \<\!-- Landing & Auth Screens \--\>  
        \<div class="wireframe-grid"\>  
            \<div class="wireframe"\>  
                \<h3\>1. Sign In / Landing\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>🏕️ AI Itinerary\</div\>  
                    \</div\>  
                    \<div style="text-align: center; margin: 40px 0;"\>  
                        \<div style="font-size: 18px; margin-bottom: 20px;"\>Plan Group Trips Together\</div\>  
                        \<div style="margin-bottom: 30px; color: \#6b7280;"\>Coordinate accommodations, activities, and expenses in one place\</div\>  
                        \<button class="button" style="padding: 12px 24px; font-size: 14px;"\>Sign In with Google\</button\>  
                        \<div style="margin-top: 15px;"\>  
                            \<button class="button secondary"\>Sign In with Email\</button\>  
                        \</div\>  
                    \</div\>  
                    \<div style="border-top: 1px solid \#ddd; padding-top: 15px; font-size: 12px; color: \#6b7280;"\>  
                        Invited to a trip? Enter your email above to join.  
                    \</div\>  
                \</div\>  
            \</div\>  
              
            \<div class="wireframe"\>  
                \<h3\>2. My Trips Dashboard\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>My Trips\</div\>  
                        \<div\>👤\</div\>  
                    \</div\>  
                    \<div class="flow-description"\>  
                        Landing page after sign-in showing user's upcoming trips  
                    \</div\>  
                    \<button class="button" style="width: 100%; margin-bottom: 15px;"\>+ Create New Trip\</button\>  
                      
                    \<div class="card"\>  
                        \<div style="display: flex; align-items: center; gap: 10px;"\>  
                            \<div class="avatar large"\>🏔️\</div\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold;"\>Tahoe Skiing\</div\>  
                                \<div style="font-size: 12px; color: \#6b7280;"\>Dec 15-18, 2024\</div\>  
                                \<div style="font-size: 11px;"\>6 participants\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 12px; color: \#15803d;"\>$285/person\</div\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div class="card"\>  
                        \<div style="display: flex; align-items: center; gap: 10px;"\>  
                            \<div class="avatar large"\>🏖️\</div\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold;"\>Cabo Beach Trip\</div\>  
                                \<div style="font-size: 12px; color: \#6b7280;"\>Jan 20-25, 2025\</div\>  
                                \<div style="font-size: 11px;"\>4 participants\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 12px; color: \#6b7280;"\>Planning...\</div\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                \</div\>  
            \</div\>  
              
            \<div class="wireframe"\>  
                \<h3\>3. Create New Trip\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>← Back\</div\>  
                        \<div\>Create Trip\</div\>  
                        \<div\>\</div\>  
                    \</div\>  
                    \<div class="flow-description"\>  
                        Modal or separate screen for trip creation  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>Trip Name\</label\>  
                        \<input class="input" placeholder="e.g. Tahoe Skiing Weekend"\>  
                    \</div\>  
                      
                    \<div style="display: flex; gap: 10px;"\>  
                        \<div class="form-group" style="flex: 1;"\>  
                            \<label\>Start Date\</label\>  
                            \<input class="input" type="date"\>  
                        \</div\>  
                        \<div class="form-group" style="flex: 1;"\>  
                            \<label\>End Date\</label\>  
                            \<input class="input" type="date"\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>Add Participants\</label\>  
                        \<input class="input" placeholder="Enter email addresses..."\>  
                        \<div style="margin-top: 8px;"\>  
                            \<span style="background: \#e5e7eb; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin-right: 5px;"\>jess@email.com ×\</span\>  
                            \<span style="background: \#e5e7eb; padding: 4px 8px; border-radius: 12px; font-size: 11px; margin-right: 5px;"\>alex@email.com ×\</span\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div style="text-align: center; margin-top: 20px;"\>  
                        \<div class="avatar large" style="margin: 0 auto 10px;"\>🎿\</div\>  
                        \<div style="font-size: 12px; color: \#6b7280;"\>AI-generated trip image\</div\>  
                        \<button class="button small"\>Change Image\</button\>  
                    \</div\>  
                      
                    \<button class="button" style="width: 100%; margin-top: 20px;"\>Create Trip\</button\>  
                \</div\>  
            \</div\>  
        \</div\>

        \<\!-- Trip Management Screens \--\>  
        \<div class="wireframe-grid"\>  
            \<div class="wireframe"\>  
                \<h3\>4. Trip Overview\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>← My Trips\</div\>  
                        \<div\>Tahoe Skiing\</div\>  
                        \<div\>⚙️\</div\>  
                    \</div\>  
                      
                    \<div class="participants-header"\>  
                        \<div class="avatar"\>JS\</div\>  
                        \<div class="avatar"\>AK\</div\>  
                        \<div class="avatar"\>PR\</div\>  
                        \<div class="avatar"\>TL\</div\>  
                        \<div class="avatar"\>MK\</div\>  
                        \<div class="avatar"\>+2\</div\>  
                    \</div\>  
                      
                    \<div style="text-align: center; margin-bottom: 15px;"\>  
                        \<div style="font-size: 14px; margin-bottom: 5px;"\>Dec 15-18, 2024\</div\>  
                        \<div class="cost-display"\>Your total: $285\</div\>  
                    \</div\>  
                      
                    \<div class="nav-tabs"\>  
                        \<div class="nav-tab active"\>Accommodations\</div\>  
                        \<div class="nav-tab"\>Activities\</div\>  
                        \<div class="nav-tab"\>Meals\</div\>  
                    \</div\>  
                      
                    \<button class="button small" style="margin-bottom: 10px;"\>+ Add Item\</button\>  
                      
                    \<div class="line-item"\>  
                        \<div style="display: flex; justify-content: space-between; align-items: start;"\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold; font-size: 12px;"\>Cabin Rental\</div\>  
                                \<div style="font-size: 10px; color: \#6b7280;"\>Dec 15-18 • Assigned to: Jess\</div\>  
                                \<div style="font-size: 10px;"\>Lake Tahoe, CA\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 11px; color: \#15803d;"\>$150/person\</div\>  
                                \<div style="font-size: 9px; color: \#6b7280;"\>6 people\</div\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div class="line-item"\>  
                        \<div style="display: flex; justify-content: space-between; align-items: start;"\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold; font-size: 12px;"\>Cleaning Fee\</div\>  
                                \<div style="font-size: 10px; color: \#6b7280;"\>Dec 18 • Assigned to: All\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 11px; color: \#15803d;"\>$25/person\</div\>  
                                \<div style="font-size: 9px; color: \#6b7280;"\>6 people\</div\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                \</div\>  
            \</div\>  
              
            \<div class="wireframe"\>  
                \<h3\>5. Add Line Item Modal\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>Add Item \- Activities\</div\>  
                    \</div\>  
                    \<div class="flow-description"\>  
                        Modal for adding new line items to any section  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>Description\</label\>  
                        \<textarea class="input" rows="3" placeholder="Describe the activity, meal, or accommodation..."\>\</textarea\>  
                    \</div\>  
                      
                    \<div style="display: flex; gap: 10px;"\>  
                        \<div class="form-group" style="flex: 1;"\>  
                            \<label\>Date\</label\>  
                            \<input class="input" type="date"\>  
                        \</div\>  
                        \<div class="form-group" style="flex: 1;"\>  
                            \<label\>Cost\</label\>  
                            \<input class="input" placeholder="$0.00"\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>Location\</label\>  
                        \<input class="input" placeholder="Enter location..."\>  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>Assigned to\</label\>  
                        \<select class="input"\>  
                            \<option\>Jess (Organizer)\</option\>  
                            \<option\>Alex\</option\>  
                            \<option\>Priya\</option\>  
                            \<option\>Taylor\</option\>  
                        \</select\>  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>Participants\</label\>  
                        \<div class="checkbox-group"\>  
                            \<div class="checkbox-item"\>  
                                \<input type="checkbox" checked\> \<span\>Jess\</span\>  
                            \</div\>  
                            \<div class="checkbox-item"\>  
                                \<input type="checkbox" checked\> \<span\>Alex\</span\>  
                            \</div\>  
                            \<div class="checkbox-item"\>  
                                \<input type="checkbox" checked\> \<span\>Priya\</span\>  
                            \</div\>  
                            \<div class="checkbox-item"\>  
                                \<input type="checkbox"\> \<span\>Taylor\</span\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div style="display: flex; gap: 10px; margin-top: 20px;"\>  
                        \<button class="button secondary" style="flex: 1;"\>Cancel\</button\>  
                        \<button class="button" style="flex: 1;"\>Add Item\</button\>  
                    \</div\>  
                \</div\>  
            \</div\>  
              
            \<div class="wireframe"\>  
                \<h3\>6. Participant Profile Edit\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>← Back\</div\>  
                        \<div\>Edit Profile\</div\>  
                        \<div\>\</div\>  
                    \</div\>  
                    \<div class="flow-description"\>  
                        Each participant can edit their dates and avatar  
                    \</div\>  
                      
                    \<div style="text-align: center; margin: 20px 0;"\>  
                        \<div class="avatar large" style="margin: 0 auto 10px; width: 80px; height: 80px; font-size: 24px;"\>JS\</div\>  
                        \<button class="button small"\>Change Avatar\</button\>  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>Display Name\</label\>  
                        \<input class="input" value="Jess"\>  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>My Trip Dates\</label\>  
                        \<div style="display: flex; gap: 10px;"\>  
                            \<input class="input" type="date" value="2024-12-15" style="flex: 1;"\>  
                            \<input class="input" type="date" value="2024-12-18" style="flex: 1;"\>  
                        \</div\>  
                        \<div style="font-size: 11px; color: \#6b7280; margin-top: 4px;"\>  
                            Trip dates: Dec 15-18, 2024  
                        \</div\>  
                    \</div\>  
                      
                    \<div class="form-group"\>  
                        \<label\>Email\</label\>  
                        \<input class="input" value="jess@email.com" disabled\>  
                    \</div\>  
                      
                    \<button class="button" style="width: 100%; margin-top: 20px;"\>Save Changes\</button\>  
                \</div\>  
            \</div\>  
        \</div\>

        \<\!-- Payment & Activities Screens \--\>  
        \<div class="wireframe-grid"\>  
            \<div class="wireframe"\>  
                \<h3\>7. Activities Tab View\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>← My Trips\</div\>  
                        \<div\>Tahoe Skiing\</div\>  
                        \<div\>⚙️\</div\>  
                    \</div\>  
                      
                    \<div class="participants-header"\>  
                        \<div class="avatar"\>JS\</div\>  
                        \<div class="avatar"\>AK\</div\>  
                        \<div class="avatar"\>PR\</div\>  
                        \<div class="avatar"\>TL\</div\>  
                        \<div class="avatar"\>MK\</div\>  
                        \<div class="avatar"\>+2\</div\>  
                    \</div\>  
                      
                    \<div class="nav-tabs"\>  
                        \<div class="nav-tab"\>Accommodations\</div\>  
                        \<div class="nav-tab active"\>Activities\</div\>  
                        \<div class="nav-tab"\>Meals\</div\>  
                    \</div\>  
                      
                    \<button class="button small" style="margin-bottom: 10px;"\>+ Add Activity\</button\>  
                      
                    \<div class="line-item"\>  
                        \<div style="display: flex; justify-content: space-between; align-items: start;"\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold; font-size: 12px;"\>Lift Tickets\</div\>  
                                \<div style="font-size: 10px; color: \#6b7280;"\>Dec 16-17 • Assigned to: Alex\</div\>  
                                \<div style="font-size: 10px;"\>Heavenly Mountain Resort\</div\>  
                                \<div style="font-size: 9px; margin-top: 3px;"\>2-day passes for skiing\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 11px; color: \#15803d;"\>$95/person\</div\>  
                                \<div style="font-size: 9px; color: \#6b7280;"\>5 people\</div\>  
                                \<button class="button small" style="margin-top: 2px;"\>Edit\</button\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div class="line-item"\>  
                        \<div style="display: flex; justify-content: space-between; align-items: start;"\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold; font-size: 12px;"\>Equipment Rental\</div\>  
                                \<div style="font-size: 10px; color: \#6b7280;"\>Dec 16-17 • Assigned to: Priya\</div\>  
                                \<div style="font-size: 10px;"\>Tahoe Sports Hub\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 11px; color: \#15803d;"\>$45/person\</div\>  
                                \<div style="font-size: 9px; color: \#6b7280;"\>4 people\</div\>  
                                \<button class="button small" style="margin-top: 2px;"\>Edit\</button\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: white; padding: 10px; border: 1px solid \#ddd; border-radius: 4px;"\>  
                        \<div style="display: flex; justify-content: space-between; align-items: center;"\>  
                            \<div\>  
                                \<div style="font-size: 12px;"\>Your total: \<strong\>$285\</strong\>\</div\>  
                                \<div style="font-size: 10px; color: \#6b7280;"\>3 items\</div\>  
                            \</div\>  
                            \<button class="button"\>Pay with Splitwise\</button\>  
                        \</div\>  
                    \</div\>  
                \</div\>  
            \</div\>  
              
            \<div class="wireframe"\>  
                \<h3\>8. Meals Tab View\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>← My Trips\</div\>  
                        \<div\>Tahoe Skiing\</div\>  
                        \<div\>⚙️\</div\>  
                    \</div\>  
                      
                    \<div class="participants-header"\>  
                        \<div class="avatar"\>JS\</div\>  
                        \<div class="avatar"\>AK\</div\>  
                        \<div class="avatar"\>PR\</div\>  
                        \<div class="avatar"\>TL\</div\>  
                        \<div class="avatar"\>MK\</div\>  
                        \<div class="avatar"\>+2\</div\>  
                    \</div\>  
                      
                    \<div class="nav-tabs"\>  
                        \<div class="nav-tab"\>Accommodations\</div\>  
                        \<div class="nav-tab"\>Activities\</div\>  
                        \<div class="nav-tab active"\>Meals\</div\>  
                    \</div\>  
                      
                    \<button class="button small" style="margin-bottom: 10px;"\>+ Add Meal\</button\>  
                      
                    \<div class="line-item"\>  
                        \<div style="display: flex; justify-content: space-between; align-items: start;"\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold; font-size: 12px;"\>Welcome Dinner\</div\>  
                                \<div style="font-size: 10px; color: \#6b7280;"\>Dec 15, 7:00 PM • Assigned to: Taylor\</div\>  
                                \<div style="font-size: 10px;"\>The Lodge Restaurant\</div\>  
                                \<div style="font-size: 9px; margin-top: 3px;"\>Group dinner to kick off the trip\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 11px; color: \#15803d;"\>$35/person\</div\>  
                                \<div style="font-size: 9px; color: \#6b7280;"\>6 people\</div\>  
                                \<button class="button small" style="margin-top: 2px;"\>Edit\</button\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div class="line-item"\>  
                        \<div style="display: flex; justify-content: space-between; align-items: start;"\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold; font-size: 12px;"\>Groceries\</div\>  
                                \<div style="font-size: 10px; color: \#6b7280;"\>Dec 15 • Assigned to: Jess\</div\>  
                                \<div style="font-size: 10px;"\>Safeway\</div\>  
                                \<div style="font-size: 9px; margin-top: 3px;"\>Breakfast and snacks for the cabin\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 11px; color: \#15803d;"\>$25/person\</div\>  
                                \<div style="font-size: 9px; color: \#6b7280;"\>6 people\</div\>  
                                \<button class="button small" style="margin-top: 2px;"\>Edit\</button\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                      
                    \<div class="line-item" style="border-left-color: \#6b7280; opacity: 0.7;"\>  
                        \<div style="display: flex; justify-content: space-between; align-items: start;"\>  
                            \<div style="flex: 1;"\>  
                                \<div style="font-weight: bold; font-size: 12px;"\>Farewell Brunch\</div\>  
                                \<div style="font-size: 10px; color: \#6b7280;"\>Dec 18, 11:00 AM • Assigned to: Alex\</div\>  
                                \<div style="font-size: 10px;"\>TBD\</div\>  
                                \<div style="font-size: 9px; margin-top: 3px; color: \#ef4444;"\>⚠️ You're not attending this meal\</div\>  
                            \</div\>  
                            \<div style="text-align: right;"\>  
                                \<div style="font-size: 11px; color: \#6b7280;"\>$30/person\</div\>  
                                \<div style="font-size: 9px; color: \#6b7280;"\>5 people\</div\>  
                                \<button class="button small" style="margin-top: 2px;"\>Edit\</button\>  
                            \</div\>  
                        \</div\>  
                    \</div\>  
                \</div\>  
            \</div\>  
              
            \<div class="wireframe"\>  
                \<h3\>9. Payment Integration\</h3\>  
                \<div class="screen"\>  
                    \<div class="header"\>  
                        \<div\>← Back\</div\>  
                        \<div\>Split Expenses\</div\>  
                        \<div\>\</div\>  
                    \</div\>  
                    \<div class="flow-description"\>  
                        Splitwise integration and payment summary  
                    \</div\>  
                      
                    \<div style="text-align: center; margin: 20px 0;"\>  
                        \<div style="font-size: 18px; margin-bottom: 10px;"\>Trip Total\</div\>  
                        \<div style="font-size: 24px; color: \#15803d; font-weight: bold;"\>$285.00\</div\>  
                        \<div style="font-size: 12px; color: \#6b7280;"\>Your share of $1,710 total\</div\>  
                    \</div\>  
                      
                    \<div style="background: \#f8f9fa; border-radius: 4px; padding: 15px; margin-bottom: 15px;"\>  
                        \<div style="font-weight: bold; margin-bottom: 10px; font-size: 14px;"\>Expense Breakdown\</div\>  
                        \<div style="display: flex; justify-content: space-between; margin-bottom: 5px;"\>  
                            \<span style="font-size: 12px;"\>Accommodations\</span\>  
                            \<span style="font-size: 12px;"\>$175.00\</span\>  
                        \</div\>  