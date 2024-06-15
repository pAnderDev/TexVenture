import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('/characters', { withCredentials: true });
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
        toast.error('Error fetching characters');
      }
    };

    fetchCharacters();
  }, []);

  const handleCreateCharacter = () => {
    navigate('/create');
  };

  const handleHomeButton = () => {
    navigate('/');
  };

  const handleSelectCharacter = async (characterId) => {
    try {
      const response = await axios.post('/select-character', { characterId }, { withCredentials: true });
      if (response.status === 200) {
        toast.success('Character selected successfully');
      } else {
        toast.error('Failed to select character');
      }
    } catch (error) {
      console.error('Error selecting character:', error);
      toast.error('Error selecting character');
    }
  };

  return (
    <div>
      <h2>Your Characters</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginRight: '75vw' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {characters.map(character => (
            <li key={character._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <strong>Name:</strong> {character.name} <br />
              <strong>Class:</strong> {character.class} <br />
              <strong>Level:</strong> {character.level} <br />
              <strong>Race:</strong> {character.race} <br />
              <button onClick={() => handleSelectCharacter(character._id)}>Select</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleHomeButton}>Home</button>
      <button onClick={handleCreateCharacter}>Create Character</button>
    </div>
  );
};

export default UserCharacters;
  