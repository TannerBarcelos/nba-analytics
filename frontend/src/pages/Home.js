import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const generateDropdownSeasonSelector = (teams) => {
  const allCurrentTeams = Object.keys(teams);
  const teamsCollection = ['All Teams', ...allCurrentTeams];
  return (
    <select>
      {teamsCollection.map((team, idx) => {
        return (
          <option key={idx} value={team}>
            {team}
          </option>
        );
      })}
    </select>
  );
};

const renderTeams = (teams) => {
  return (
    <>
      {Object.keys(teams).map((team) => {
        return <div key={team}>{team}</div>;
      })}
    </>
  );
};

const Home = () => {
  const { currentSeason, teams } = useSelector((state) => state.teamsReducer);
  return (
    <div>
      <h1>Current NBA Teams</h1>
      <div>
        {<h3>Team Statistics for {currentSeason} season</h3>}
        {generateDropdownSeasonSelector(teams)}
      </div>
      {renderTeams(teams)}
    </div>
  );
};

export default Home;
