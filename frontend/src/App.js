import { useEffect, useState } from 'react';
import { instance } from './lib/axiosInstance';
import './App.css';

const App = () => {
  const [teams, setTeams] = useState(null);
  useEffect(() => {
    const getTeams = async () => {
      const {
        data: { data },
      } = await instance.get('/all');
      setTeams(data);
    };
    getTeams();
  }, []);
  return (
    <div className='App'>
      {teams &&
        Object.keys(teams).map((team, i) => {
          return <h3 key={i}>{team}</h3>;
        })}
    </div>
  );
};

export default App;
