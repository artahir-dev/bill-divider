# Bill Divider

Bill Divider is a simple React web application for splitting bills among multiple users. Users can be created with custom names and emojis, and then assigned to different bill rows. The app calculates how much each user owes based on their participation in each bill row.

## Features

- **Create Users:** Add users with names and emojis.
- **Drag & Drop Assignment:** Assign users to bill rows using drag-and-drop.
- **Bill Splitting:** Automatically divides each row’s total among assigned users.
- **Result Calculation:** Shows the total amount each user owes.
- **Copy Results:** Easily copy the calculated results to the clipboard.
- **Persistent Storage:** All data is stored in localStorage for session persistence.

## Tech Stack

- React
- Vite
- SCSS for styling

## Getting Started

1. Install dependencies:
	```
	npm install
	```
2. Start the development server:
	```
	npm run dev
	```
3. Open your browser at `http://localhost:5173` (or the port shown in the terminal).

## Folder Structure

- `src/components`: UI components (Rows, Row, Users, UserCard, CreateModal, Modal)
- `src/services`: LocalStorage-based user management
- `src/utils`: Utility functions (e.g., amount formatting)
- `public`: Static assets

## Usage

1. Add users with the "+" button.
2. Create bill rows and assign users by dragging their cards.
3. Enter the total for each row; the app splits the amount among assigned users.
4. View each user’s total owed and copy results as needed.