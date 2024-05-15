import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateCharacter = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        classId: '',
        raceId: '',
    });

    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);

  useEffect(() => {
    // Fetch classes and races from the server
    const fetchData = async () => {
      try {
        const classResponse = await axios.get('/classes'); //getting all the classes in the database
        const raceResponse = await axios.get('/races'); //getting all the races in the database 
        //setting the requested data into our classes and races variables
        setClasses(classResponse.data); 
        setRaces(raceResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(data.classId + ' ' + data.raceId);
    e.preventDefault();
    try {
      const response = await axios.post('/create', data, { withCredentials: true });
      toast.success('Character created successfully');
      console.log('Character created:', response.data);
    } catch (error) {
      console.error('Error creating character:', error);
      toast.error('Error creating character');
    }
  };

  const handlePlayGame = () => {
    navigate('/characters');
  };

  const handleHomeButton = () => {
    navigate('/');
  };


  return (
    <div>
      <h2>Create Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} />
        </div>
        <div>
          <label>Class:</label>
          <select name="classId" value={data.classId} onChange={handleChange}>
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Race:</label>
          <select name="raceId" value={data.raceId} onChange={handleChange}>
            <option value="">Select Race</option>
            {races.map(r => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create Character</button>
      </form>
      <button onClick={handlePlayGame}>Play Game</button>
      <button onClick={handleHomeButton}>Home</button>
    </div>
  );
};

export default CreateCharacter;