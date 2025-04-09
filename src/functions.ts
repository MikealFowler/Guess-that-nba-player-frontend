import { supabase } from './supabaseClient.ts';

const NewPlayer = async () => {

    const { data, error } = await supabase
    .from('player_team')
    .insert([
      { player_id: '1', team_id: '6' },
      { player_id: '1', team_id: '14' },
      { player_id: '1', team_id: '16' }
    ])
    .select()
  

    if (error) {
      console.error('Error fetching player:', error);
      return;
    }

    return console.log(data); // ✅ Set the player in state
  };
