export const generateTournamentData = () => {
  const players = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' },
    { id: 5, name: 'Player 5' },
    { id: 6, name: 'Player 6' }
  ];

  const matches = generateRoundRobinMatches(players);

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

  return {
    players,
    matches,
    standings
  };
};

const generateRoundRobinMatches = (players) => {
  const matches = [];
  let matchId = 1;

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      matches.push({
        id: matchId,
        round: Math.ceil(matchId / 3),
        team1: players[i].id,
        team1Name: players[i].name,
        team2: players[j].id,
        team2Name: players[j].name,
        team1Score: null,
        team2Score: null,
        completed: false,
        date: null
      });
      matchId++;
    }
  }

  return matches;
};
