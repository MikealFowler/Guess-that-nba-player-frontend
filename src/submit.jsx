import { useState } from 'react';
import { supabase } from './supabaseClient';

function SubmitPlayer() {
  const [playerId, setPlayerId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    // Basic validation
    if (!playerId || !teamId) {
      setStatus('Both Player ID and Team ID are required.');
      return;
    }

    const { data, error } = await supabase
      .from('player_team')
      .insert([
        {
          player_id: playerId,
          team_id: teamId,
        },
      ]);

    if (error) {
      console.error('Insert error:', error);
      setStatus('Failed to insert player-team relationship.');
    } else {
      setStatus('Successfully added player-team relationship!');
      setTeamId('');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Add Player-Team Link</h2>

      <input
        type="text"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        placeholder="Player ID"
        style={{ marginRight: '10px' }}
      />

      <input
        type="text"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        placeholder="Team ID"
        style={{ marginRight: '10px' }}
      />

      <button onClick={handleSubmit}>Submit</button>

      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </div>
  );
}

export default SubmitPlayer;