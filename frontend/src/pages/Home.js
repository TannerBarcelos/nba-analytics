import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../redux/features/teamSlice';

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
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teamsReducer);
  console.log(teams);
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);
  return (
    <div>
      <h1>Current NBA Teams</h1>
      {teams && renderTeams(teams)}
    </div>
  );
};

export default Home;
