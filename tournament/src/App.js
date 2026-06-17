import React, { useState } from 'react';
import './App.css';
import Schedule from './components/Schedule';
import Standings from './components/Standings';
import { generateTournamentData } from './utils/tournamentUtils';

function App() {
  const [activeTab, setActiveTab] = useState('standings');
  const [tournamentData, setTournamentData] = useState(() => generateTournamentData());

  const updateMatchResult = (matchId, team1Score, team2Score) => {
    setTournamentData(prev => {
      const updatedMatches = prev.matches.map(match =>
        match.id === matchId
          ? { ...match, team1Score, team2Score, completed: true }
          : match
      );
      const standings = calculateStandings(prev.players, updatedMatches.filter(m => m.completed));
      return {
        ...prev,
        matches: updatedMatches,
        standings
      };
    });
  };

  const calculateStandings = (players, completedMatches) => {
    const standings = players.map(player => ({
      name: player.name,
      playerId: player.id,
      wins: 0,
      losses: 0,
      draws: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    }));

    completedMatches.forEach(match => {
      const team1Standing = standings.find(s => s.playerId === match.team1);
      const team2Standing = standings.find(s => s.playerId === match.team2);

      if (team1Standing && team2Standing) {
        team1Standing.goalsFor += match.team1Score;
        team1Standing.goalsAgainst += match.team2Score;
        team2Standing.goalsFor += match.team2Score;
        team2Standing.goalsAgainst += match.team1Score;

        if (match.team1Score > match.team2Score) {
          team1Standing.wins++;
          team1Standing.points += 3;
          team2Standing.losses++;
        } else if (match.team2Score > match.team1Score) {
          team2Standing.wins++;
          team2Standing.points += 3;
          team1Standing.losses++;
        } else {
          team1Standing.draws++;
          team2Standing.draws++;
          team1Standing.points += 1;
          team2Standing.points += 1;
        }

        team1Standing.goalDifference = team1Standing.goalsFor - team1Standing.goalsAgainst;
        team2Standing.goalDifference = team2Standing.goalsFor - team2Standing.goalsAgainst;
      }
    });

    return standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.goalDifference - a.goalDifference;
    });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>⚽ eFootball Tournament</h1>
        <p>6 Friends, 1 Champion</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'standings' ? 'active' : ''}`}
          onClick={() => setActiveTab('standings')}
        >
          Standings
        </button>
        <button
          className={`nav-tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'standings' && <Standings standings={tournamentData.standings} />}
        {activeTab === 'schedule' && (
          <Schedule
            matches={tournamentData.matches}
            players={tournamentData.players}
            onUpdateResult={updateMatchResult}
          />
        )}
      </main>
    </div>
  );
}

export default App;
