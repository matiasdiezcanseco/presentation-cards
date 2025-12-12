# Project Overview: Presentation Cards Generator

## Core Concept
This application is a web-based tool for creating, designing, and managing digital and printable **Presentation Cards** (Business Cards). Users can create custom cards with their professional information, design them interactively, and export them.

## Key Features

### 1. User Management
- **Authentication:** Users must sign in to create and save cards.
- **Accounts:** Support for profile management.
- **Technologies:** Better Auth (Email/Pass, GitHub).

### 2. Card Creation & Editing
- **Information Fields:**
  - Name, Last Name
  - Email, Phone Number
  - Company Name, Job Title
  - Social Links, Website
- **Media:**
  - Image Uploads (Logo, Profile Picture, Backgrounds).
- **Design Editor:**
  - **Drag and Drop:** Move elements freely on the canvas.
  - **Customization:** Fonts, colors, sizes, layout.
  - **Browser-based:** Real-time editing in the web app.

### 3. Output & Export
- **Export:** Download cards (likely as PDF, PNG, or SVG).
- **Sharing:** (Potential future feature) Digital sharing links.

## User Flow
1.  **Login/Register.**
2.  **Dashboard:** View existing cards or create a new one.
3.  **Editor:**
    - Input personal/business details.
    - Upload logo.
    - Arrange elements on the card canvas.
    - Customize styles.
4.  **Save/Export:** Save to account or download file.

## Technical Implications
- **Image Storage:** Need a solution for storing user uploads (e.g., S3, UploadThing, or base64 if small).
- **Canvas Logic:** Frontend logic for positioning and rendering elements (HTML5 Canvas or DOM-based manipulation).
- **Database:** Schema needs to store card layouts, element positions, and user data.

