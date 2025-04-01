import { useEffect, useState } from 'react';
import api from './api';
import './App.css'

function App() {
  const [player, setPlayer] = useState(null);
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState(false);
  

  const grabNewPlayer = () => {
    api.get('/randomplayer')
      .then((res) => {
        setPlayer(res.data);
      })
      .catch((err) => {
        console.error('API error:', err);
      });
  }

  useEffect(() => {
    grabNewPlayer();
  }, []);


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
  const showhint = () => {
    setHint(!hint)
  }

  return (
    <div>
      <h2 className='title'>NBA 75th Anniversary Team </h2>
      <section className='centered-box'>
        <p className='listOfPlayers'>LeBron James, Magic Johnson, Reggie Miller, David Robinson, Damian Lillard, Chris Paul, Robert Parish, James Harden,
          Bob Pettit, Rick Barry, Jerry Lucas, Elgin Baylor, Ray Allen, Russell Westbrook, Bill Walton, Bill Russell, John Havlicek, Clyde Drexler, Earl Monroe,
          Isiah Thomas, Larry Bird, Karl Malone, Dominique Wilkins, George Mikan, Patrick Ewing, Allen Iverson, Moses Malone, Julius Erving, John Stockton,
          Nate Archibald, Steve Nash, Kevin Garnett, Kevin McHale, Bob Cousy, Gary Payton, Bob McAdoo, Anthony Davis, Pete Maravich, James Worthy,
          Shaquille O’Neal, Tim Duncan, Lenny Wilkens, Scottie Pippen, Kevin Durant, Dwyane Wade, Jerry West, Hal Greer, Kawhi Leonard, Kareem Abdul-Jabbar, Carmelo Anthony,
          Paul Pierce, Rick Barry, George Gervin, Dennis Rodman, Giannis Antetokounmpo, Dave Bing, Billy Cunningham, Wilt Chamberlain, Wes Unseld, Dave Cowens, Michael Jordan,
          Dolph Schayes, Nate Thurmond, Dave DeBusschere, Bill Sharman, Dirk Nowitzki, Bill Russell, Sam Jones, Paul Arizin, Elvin Hayes, Oscar Robertson, Walt Frazier,
          Charles Barkley, Larry Bird, Bob Pettit, Stephen Curry, Kobe Bryant, John Stockton, Karl Malone, Jerry Lucas, Magic Johnson</p>
      </section>

      <h1>Guess That NBA Player</h1>
      {player ? (
        <div className='player-stats'>
          <ul>
            {/* <p className='stat'><strong>Name:</strong> {player.player_name}</p> */}
            <p className='stat'><strong>Points Avg:</strong> {player.points_avg}</p>
            <p className='stat'><strong>Assists Avg:</strong> {player.assists_avg}</p>
            <p className='stat'><strong>Rebounds Avg:</strong> {player.rebounds_avg}</p>
            <p className='stat'><strong>Steals Avg:</strong> {player.steals_avg}</p>
            <p className='stat'><strong>Blocks Avg:</strong> {player.blocks_avg}</p>
            <p className='stat'><strong>Finals Appearence:</strong> {player.finals_played}</p>
            <p className='stat'><strong>Finals Won:</strong> {player.finals_won}</p>
          </ul>
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