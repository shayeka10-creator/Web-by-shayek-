import React from 'react';
import './Standings.css';

const Standings = ({ standings }) => {
  return (
    <div className="standings-container">
      <h2>Tournament Standings</h2>
      <div className="standings-table-wrapper">
        <table className="standings-table">
          <thead>
            <tr>
              <th className="rank-col">#</th>
              <th className="player-col">Player</th>
              <th>Matches</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Losses</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th className="points-col">Points</th>
            </tr>
          </thead>
          <tbody>
            {standings && standings.length > 0 ? (
              standings.map((player, index) => {
                const matches = player.wins + player.losses + (player.draws || 0);
                return (
                  <tr key={player.playerId} className={index === 0 ? 'leader' : ''}>
                    <td className="rank-col">
                      <span className="rank-badge">{index + 1}</span>
                    </td>
                    <td className="player-col">{player.name}</td>
                    <td>{matches}</td>
                    <td className="wins">{player.wins}</td>
                    <td>{player.draws || 0}</td>
                    <td className="losses">{player.losses}</td>
                    <td>{player.goalsFor}</td>
                    <td>{player.goalsAgainst}</td>
                    <td className={player.goalDifference >= 0 ? 'positive' : 'negative'}>
                      {player.goalDifference >= 0 ? '+' : ''}{player.goalDifference}
                    </td>
                    <td className="points-col">
                      <span className="points-badge">{player.points}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="no-data">No matches played yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;
