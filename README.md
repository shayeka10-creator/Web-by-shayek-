# eFootball Tournament
A web application for managing a round-robin eFootball tournament between 6 friends.

Features
Standings Table: Real-time leaderboard showing wins, losses, goals, and points
Schedule & Results: View all matches organized by round with ability to enter match results
Round-Robin Format: Each player plays every other player once (15 total matches)
Responsive Design: Works seamlessly on desktop and mobile devices
Tournament Rules
Format: Round-Robin (6 players, 15 total matches)
Scoring:
Win = 3 points
Draw = 1 point
Loss = 0 points
Standings: Sorted by points, then by goal difference
Getting Started
Install dependencies

npm install
Start the development server

npm start
Build for production

npm run build
Usage
Click on "Schedule" to view matches
Click "Add Result" on any match card to enter the score
Watch the "Standings" update automatically as results are added
Filter matches by round using the filter buttons
Technologies Used
React 18
CSS3 with Flexbox and Grid
Local state management
Project Structure
tournament/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Schedule.js
│   │   ├── Schedule.css
│   │   ├── Standings.js
│   │   ├── Standings.css
│   │   ├── MatchCard.js
│   │   └── MatchCard.css
│   ├── utils/
│   │   └── tournamentUtils.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
