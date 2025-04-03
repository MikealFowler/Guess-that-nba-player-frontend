import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient.ts';
import './App.css';

function App() {
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState(false);
  const [allPlayers, setAllPlayers] = useState(null);
  const [player, setPlayer] = useState(null); // ✅ This was missing!

  // ✅ Grab a new random player and set in state
  const grabNewPlayer = async () => {
    const randomId = Math.floor(Math.random() * 76) + 1;

    const { data, error } = await supabase
      .from('player')
      .select('*')
      .eq('id', randomId)
      .single();

    if (error) {
      console.error('Error fetching player:', error);
      return;
    }

    setPlayer(data); // ✅ Set the player in state
  };

  // ✅ Grab all players' names for the list at the top
  const grabAllPlayers = async () => {
    const { data, error } = await supabase
      .from('player')
      .select('player_name');

    if (error) {
      console.error('Error fetching all players:', error);
      return;
    }

    setAllPlayers(data);
  };

  // ✅ On initial load: get random player and all names
  useEffect(() => {
    grabNewPlayer();
    grabAllPlayers();
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (!player) return;

    const cleanedGuess = guess.trim().toLowerCase();
    const actualName = player.player_name.toLowerCase();

    if (cleanedGuess === actualName) {
      alert('Correct!');
      grabNewPlayer();
      setHint(false);
    } else {
      alert('Wrong guess. Try again!');
    }
    setGuess('');
  };

  const showHint = () => {
    setHint(!hint);
  };

  return (
    <div>
      <h2 className='title'>NBA 75th Anniversary Team</h2>

      {/* 🧠 All player names */}
      <section className='listOfPlayers'>
        {allPlayers ? (
          <div className='name-list'>
            {allPlayers.map((player, index) => (
              <span key={index} className='player-name'>
                {player.player_name +", "}  
              </span>
            ))}
          </div>
        ) : (
          <p>Loading player names...</p>
        )}
      </section>

      <h1>Guess That NBA Player</h1>

      {/* 🧠 Random player stats */}
      {player ? (
        <div className='player-stats'>
          <ul>
            {/* <p className='stat'><strong>Name:</strong> {player.player_name}</p> */}
            <p className='stat'><strong>Points Avg:</strong> {player.points_avg}</p>
            <p className='stat'><strong>Assists Avg:</strong> {player.assists_avg}</p>
            <p className='stat'><strong>Rebounds Avg:</strong> {player.rebounds_avg}</p>
            <p className='stat'><strong>Steals Avg:</strong> {player.steals_avg}</p>
            <p className='stat'><strong>Blocks Avg:</strong> {player.blocks_avg}</p>
            <p className='stat'><strong>Finals Appearances:</strong> {player.finals_played}</p>
            <p className='stat'><strong>Finals Won:</strong> {player.finals_won}</p>
          </ul>

          {hint && (
            <p className='hint-answer'>
              This player’s initials are:{' '}
              {player.player_name
                .split(' ')
                .map(name => name.charAt(0))
                .join('.')}
              .
            </p>
          )}
        </div>
      ) : (
        <p>Loading player...</p>
      )}

      {/* 🧠 Guess input */}
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

      <button onClick={showHint} className='button-hint'>Hint</button>

      <section>
        <h3>
          Quick tip: The NBA officially started recording steals and blocks
          in the 1973–1974 season. So if you see someone with no steals or
          blocks, they likely played before then.
        </h3>
      </section>
    </div>
  );
}

export default App;