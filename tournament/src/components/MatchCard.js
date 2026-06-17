import React, { useState } from 'react';
import './MatchCard.css';

const MatchCard = ({ match, onUpdateResult }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [score1, setScore1] = useState(match.team1Score || '');
  const [score2, setScore2] = useState(match.team2Score || '');

  const handleSave = () => {
    if (score1 !== '' && score2 !== '') {
      onUpdateResult(match.id, parseInt(score1), parseInt(score2));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setScore1(match.team1Score || '');
    setScore2(match.team2Score || '');
    setIsEditing(false);
  };

  return (
    <div className={`match-card ${match.completed ? 'completed' : ''}`}>
      <div className="match-header">
        <span className="round-badge">Round {match.round}</span>
        {match.completed && <span className="status-badge">✓ Completed</span>}
        {!match.completed && <span className="status-badge pending">Pending</span>}
      </div>

      <div className="match-content">
        {!isEditing ? (
          <>
            <div className="team">
              <span className="team-name">{match.team1Name}</span>
              <span className="score">
                {match.team1Score !== null ? match.team1Score : '—'}
              </span>
            </div>

            <div className="vs-text">vs</div>

            <div className="team">
              <span className="score">
                {match.team2Score !== null ? match.team2Score : '—'}
              </span>
              <span className="team-name">{match.team2Name}</span>
            </div>
          </>
        ) : (
          <>
            <div className="team">
              <span className="team-name">{match.team1Name}</span>
              <input
                type="number"
                min="0"
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
                className="score-input"
              />
            </div>

            <div className="vs-text">vs</div>

            <div className="team">
              <input
                type="number"
                min="0"
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
                className="score-input"
              />
              <span className="team-name">{match.team2Name}</span>
            </div>
          </>
        )}
      </div>

      <div className="match-footer">
        {!isEditing ? (
          <button
            className="action-btn edit-btn"
            onClick={() => setIsEditing(true)}
          >
            {match.completed ? 'Edit Result' : 'Add Result'}
          </button>
        ) : (
          <div className="edit-actions">
            <button
              className="action-btn save-btn"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="action-btn cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
