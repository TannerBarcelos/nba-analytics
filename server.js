const express = require('express');
const app = express();
const data = require('./scraper/teamSeasonDump.json'); // using until DB seed
const path = require('path');
const res = require('express/lib/response');
const { PythonShell } = require('python-shell');
const schedule = require('node-schedule');

app.use(express.json());

// Run scrape every midnight
const rule = new schedule.RecurrenceRule();
rule.hour = 2;
rule.minute = 45;
rule.tz = 'America/Los_Angeles';

schedule.scheduleJob(rule, () => {
  PythonShell.run('./scraper/scraper.py', null, (err) => {
    if (err) {
      throw err;
    }
    console.log('Latest Team NBA Stats Scraped');
  });
});

// GET all team stats
app.get('/api/all', (request, response) => {
  response.json({ data });
});

//GET single team stats
app.get('/api/teams/:teamName', (request, response) => {
  const team_name = request.params?.teamName?.toLowerCase();
  const formattedTeamName = team_name.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter) => letter.toUpperCase(),
  );
  if (formattedTeamName in data) {
    return response.json({
      teamName: formattedTeamName,
      stats: data[formattedTeamName],
    });
  } else {
    return response.json({ message: 'Team not found' });
  }
});

// Server statis assets in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (request, response) => {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
  });
}
const PORT = process.env.PORT || 3131;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));
