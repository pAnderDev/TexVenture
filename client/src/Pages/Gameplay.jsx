import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Gameplay = () => {
  const [input, setInput] = useState('');
  const [story, setStory] = useState('');
  const [gameState, setGameState] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/gameplay', { input }, { withCredentials: true });
      setStory(response.data.output);
      setGameState(response.data.gameState);
    } catch (error) {
      console.error('Error during gameplay:', error);
      toast.error('Failed to interact with the game');
    }
  };

  return (
    <div>
      <div>
        <h3>Story</h3>
        <p>{story}</p>
      </div>
      <div>
        <h3>Game State</h3>
        {gameState && (
          <pre>{JSON.stringify(gameState, null, 2)}</pre>
        )}
      </div>
      <div>
        <h3>Prompt Output</h3>
        {/* Display the prompt output here */}
        {story && (
          <p>{story}</p>
        )}
      </div>
      <textarea value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Gameplay;
