const express = require('express');
const app = express();
const PORT = 3131;
const data = require('../scraper/teamSeasonDump.json'); // using until DB seed

app.use(express.json());

// GET all team stats
app.get('/api/all', (request, response) => {
  response.json({ data });
});

//GET single team stats
app.get('/api/teams/:teamName', (request, response) => {
  const team_name = request.params.teamName.toLowerCase();
  const formattedTeamName = team_name.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter) => letter.toUpperCase(),
  );
  if (formattedTeamName in data) {
    return response.json({
      data: {
        teamName: formattedTeamName,
        stats: data[formattedTeamName],
      },
    });
  } else {
    return response.json({ message: 'Team not found' });
  }
});

app.listen(PORT || 5000, console.log(`Server listening on port ${PORT}`));
