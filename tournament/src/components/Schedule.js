import React, { useState } from 'react';
import './Schedule.css';
import MatchCard from './MatchCard';

const Schedule = ({ matches, players, onUpdateResult }) => {
  const [filterRound, setFilterRound] = useState('all');

  const rounds = [...new Set(matches.map(m => m.round))].sort((a, b) => a - b);

  const filteredMatches = filterRound === 'all'
    ? matches
    : matches.filter(m => m.round === parseInt(filterRound));

  const completedMatches = filteredMatches.filter(m => m.completed).length;
  const totalMatches = filteredMatches.length;

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>Tournament Schedule</h2>
        <div className="schedule-info">
          <span className="match-counter">
            {completedMatches}/{totalMatches} matches completed
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: totalMatches > 0 ? `${(completedMatches / totalMatches) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="round-filter">
        <button
          className={`filter-btn ${filterRound === 'all' ? 'active' : ''}`}
          onClick={() => setFilterRound('all')}
        >
          All Rounds
        </button>
        {rounds.map(round => (
          <button
            key={round}
            className={`filter-btn ${filterRound === round ? 'active' : ''}`}
            onClick={() => setFilterRound(round)}
          >
            Round {round}
          </button>
        ))}
      </div>

      <div className="matches-grid">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => (
            <MatchCard
              key={match.id}
              match={match}
              onUpdateResult={onUpdateResult}
            />
          ))
        ) : (
          <div className="no-matches">No matches in this round</div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
