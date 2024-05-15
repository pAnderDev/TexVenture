import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate()

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

  return (
    <div>
      <h2>Your Characters</h2>
      <ul>
        {characters.map(character => (
          <li key={character._id}>
            <strong>Name:</strong> {character.name} <br />
            <strong>Class:</strong> {character.class} <br />
            <strong>Race:</strong> {character.race}
          </li>
        ))}
      </ul>
      <button onClick={handleHomeButton}>Home</button>
      <button onClick={handleCreateCharacter}>Create Character</button>
    </div>
  );
};

export default UserCharacters;
