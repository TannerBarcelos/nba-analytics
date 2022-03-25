import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../redux/features/teamSlice';

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
  const data = useSelector((state) => state.teamsReducer);
  console.log(data);
  return (
    <div>
      <h1>Current NBA Teams</h1>
      {/* {teams && (
        <div>
          {<h3>Team Statistics for {season} season</h3>}
          {generateDropdownSeasonSelector(teams)}
        </div>
      )}
      {teams && renderTeams(teams)} */}
    </div>
  );
};

export default Home;
