import { useEffect, useState } from 'react';
import api from './api';
import './App.css'

function App() {
  const [player, setPlayer] = useState(null);
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState(false);
  const [allPlayers, setAllPlayers] = useState(null);

  // This function is for grabbing a new random player from the database
  const grabNewPlayer = () => {
    api.get('/randomplayer')
      .then((res) => {
        setPlayer(res.data);
      })
      .catch((err) => {
        console.error('API error:', err);
      });
  }

  // This function is for grabbing all players from the database
  const grabAllPlayers = () => {
    api.get('/allplayers')
      .then((res) => {
        setAllPlayers(res.data);
      })
      .catch((err) => {
        console.error('API error:', err);
      });
  }

  // this useEffect is to grab a new random player, and all players upon loading the website
  useEffect(() => {
    grabNewPlayer();
    grabAllPlayers();
  }, []);

  // this component is for handling the guess box to see if its the correct player or not
  const handleGuess = (e) => {
    e.preventDefault();
    if (!player) return;

    const cleanedGuess = guess.trim().toLowerCase();
    const actualName = player.player_name.toLowerCase();

    if (cleanedGuess === actualName) {
      alert('Correct!');
      grabNewPlayer();
      setHint(false)
    } else {
      alert('Wrong guess. Try again!');
    }
    setGuess('');
  };
  // This is to toggle the hint box on or off
  const showhint = () => {
    setHint(!hint)
  }

  return (
    <div>
      <h2 className='title'>NBA 75th Anniversary Team </h2>
      <section className='listOfPlayers'>
        {allPlayers ? (
          <p>
            {allPlayers.map((player) => {
              const name = player.player_name;
              return `${name + ", "}`;
            })}
          </p>
        ) : (
          <p>Loading player names...</p>
        )}
      </section>
      <h1>Guess That NBA Player</h1>
      {player ? (
        <div className='player-stats'>
          <ul>
            {/* This is line of code below reveals the players name with rest of stats was  used for developemnt 
            <p className='stat'><strong>Name:</strong> {player.player_name}</p> */}
            <p className='stat'><strong>Points Avg:</strong> {player.points_avg}</p>
            <p className='stat'><strong>Assists Avg:</strong> {player.assists_avg}</p>
            <p className='stat'><strong>Rebounds Avg:</strong> {player.rebounds_avg}</p>
            <p className='stat'><strong>Steals Avg:</strong> {player.steals_avg}</p>
            <p className='stat'><strong>Blocks Avg:</strong> {player.blocks_avg}</p>
            <p className='stat'><strong>Finals Appearence:</strong> {player.finals_played}</p>
            <p className='stat'><strong>Finals Won:</strong> {player.finals_won}</p>
          </ul>
          {/* This is my hint logic to give just the initials back of the Basketball player */}
          {hint && (
            <p className='hint-answer'>
              This player’s initials are:{' '}
              {player.player_name
                .split(' ')
                .map(name => name.charAt(0))
                .join('.')}
            </p>
          )}
        </div>
      ) : (
        <p>Loading player...</p>
      )}
      {/* This is where the code handles clicking the button to submit guess */}
      <form onSubmit={handleGuess}>
        <input
          type="text"
          className='guess'
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Guess the player's name"
          autoComplete="off"
        />
        <button type="submit" className='button-guess'>Submit</button>
      </form>
      <button onClick={showhint} className='button-hint'>Hint</button>
      <section>
        <h3>Quick tip: The NBA offically started recording steals and blocks
          1973-1974 season. So if you see somoene with no steals or blocks they
          played before then.
        </h3>
      </section>
    </div>
  );
}

export default App;