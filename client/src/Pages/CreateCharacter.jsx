import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateCharacter = () => {
    const navigate = useNavigate();
    const defaultStats = [15, 14, 13, 12, 10, 8];
    const pointBuyCost = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
    const [data, setData] = useState({
        name: '',
        classId: '',
        raceId: '',
        backgroundId: '',
        level: 1,
        stats: {
          strength: 8,
          dexterity: 8,
          constitution: 8,
          intelligence: 8,
          wisdom: 8,
          charisma: 8
        },
        hitPoints: 10,
        experience: 0,
        spellslots: ''
    });

    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);
    const [backgrounds, setBackgrounds] = useState([]);
    const [pointBuy, setPointBuy] = useState(true);
    const [points, setPoints] = useState(27);

  useEffect(() => {
    // Fetch classes and races from the server
    const fetchData = async () => {
      try {
        const classResponse = await axios.get('/classes'); //getting all the classes in the database
        const raceResponse = await axios.get('/races'); //getting all the races in the database 
        const backgroundResponse = await axios.get('/backgrounds');
        //setting the requested data into our classes and races variables
        setClasses(classResponse.data); 
        setRaces(raceResponse.data);
        setBackgrounds(backgroundResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name in data.stats) {
      const newStatValue = parseInt(value);
      const oldStatValue = data.stats[name];
      const pointDifference = pointBuyCost[newStatValue] - pointBuyCost[oldStatValue];

      if(points - pointDifference >= 0) {
        setData({
          ...data, stats: {...data.stats, [name]: newStatValue }
        });
        setPoints(points - pointDifference);
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleMethodChange = (e) => {
    setPointBuy(e.target.value === 'pointBuy');
    setPoints(27); // Reset points when switching methods
    setData({
      ...data,
      stats: e.target.value == 'pointBuy' ? {
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
      } : {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      }
    });
  };

  const handleDefaultStatChange = (stat, value) => {
    const updatedStats = { ...data.stats };
    for (let key in updatedStats) {
      if (updatedStats[key] === value) {
        updatedStats[key] = 0;
      }
    }
    updatedStats[stat] = value;
    setData({ ...data, stats: updatedStats });
  };

  const handleSubmit = async (e) => {
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
          <label>Level: {data.level}</label>
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
        <div>
          <label>Background:</label>
          <select name="backgroundId" value={data.backgroundId} onChange={handleChange}>
            <option value="">Select Background</option>
            {backgrounds.map(b => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Method:</label>
          <div>
            <label>Point Buy</label>
            <input type="radio" name='method' value="pointBuy" checked={pointBuy} onChange={handleMethodChange} />
            <label>Default Stats</label>
            <input type="radio" name='method' value="default" checked={!pointBuy} onChange={handleMethodChange} />
          </div>
        </div>
        {pointBuy ? (
          <div>
            <h3>Stats (Points Left: {points})</h3>
            {Object.keys(data.stats).map(stat => (
              <div key={stat}>
                <label>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</label>
                <select name={stat} value={data.stats[stat]} onChange={handleChange}>
                  {Object.keys(pointBuyCost).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3>Assign Default Stats:</h3>
            {Object.keys(data.stats).map(stat => (
              <div key={stat}>
                <label>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</label>
                <select
                  value={data.stats[stat]}
                  onChange={(e) => handleDefaultStatChange(stat, parseInt(e.target.value))}
                >
                  <option value={0}>Select</option>
                  {defaultStats.map(value => (
                    <option key={value} value={value}> {value} </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        <button type="submit">Create Character</button>
      </form>
      <button onClick={handlePlayGame}>Play Game</button>
      <button onClick={handleHomeButton}>Home</button>
    </div>
  );
};

export default CreateCharacter;
