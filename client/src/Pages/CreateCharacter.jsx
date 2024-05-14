import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateCharacter = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        classID: '',
        class: '',
        raceID: '',
        race: '',
        level_info: { 
            leve: 1,
            points: 0
        },
        race: '',
        attributes: {
            str: {
                value: 0,
                strModifer: 0
            },
            dex: {
                value: 0,
                dexModifier: 0
            },
            con: {
                value: 0,
                conModifier: 0
            },
            int: {
                value: 0,
                intModifier: 0
            },
            wis: {
                value: 0,
                wisModifier: 0
            },
            cha: {
                value: 0,
                chaModifier: 0
            }
        },
        armorClass: 10,
        initiative: 0,
        health: {
            hitDice: 0,
            max_hit_points: 0,
            current_hit_points: 0,
            temporary_hit_points: 0
        },
        spell_slots: {
            lvlOne: 0,
            lvlTwo: 0,
            lvlThree: 0,
            lvlFour: 0,
            lvlFive: 0,
            lvlSix: 0,
            lvlSeven: 0,
            lvlEight: 0,
            lvlNine: 0,
        },
        spellbook: {
            lvlOneSpells: '',
            lvlTwoSpells: '',
            lvlThreeSpells: '',
            lvlFourSpells: '',
            lvlFiveSpells: '',
            lvlSixSpells: '',
            lvlSevenSpells: '',
            lvlEightSpells: '',
            lvlNineSpells: '',
        },
        additional_features: {
            race: '',
            background: '',
            alignment: '',
            personality: '',
            ideals: '',
            bonds: '',
            flaws: '',
            features_traits: '',
            age: 0,
            height: 0,
            weight: 0,
            eyes: '',
            hair: '',
        }
    });

    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);

  useEffect(() => {
    // Fetch classes and races from the server
    const fetchData = async () => {
      try {
        const classResponse = await axios.get('/classes');
        const raceResponse = await axios.get('/races');
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

  const handleNestedChange = (e, category, subcategory) => {
    const { name, value } = e.target;
    if (subcategory) {
      setData({
        ...data,
        [category]: { ...data[category], [subcategory]: { ...data[category][subcategory], [name]: value } },
      });
    } else {
      setData({
        ...data,
        [category]: { ...data[category], [name]: value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create', data, { withCredentials: true });
      console.log('Character created:', response.data);
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setData({ ...data, classId });

    try {
      const selectedClass = classes.find(c => c._id === classId);
      if (selectedClass) {
        setData({
          ...data,
          classId,
          armorClass: selectedClass.armorClass,
          health: {
            ...data.health,
            hitDice: parseInt(selectedClass.hit_die.slice(1)),
            max_hit_points: parseInt(selectedClass.hit_die.slice(1)),
            current_hit_points: parseInt(selectedClass.hit_die.slice(1)),
          },
        });
      }
    } catch (error) {
      console.error('Error setting class attributes:', error);
    }
  };

  const handleRaceChange = (e) => {
    const raceId = e.target.value;
    setData({ ...data, raceId });

    try {
      const selectedRace = races.find(r => r._id === raceId);
      if (selectedRace) {
        setData({
          ...data,
          raceId,
          attributes: {
            str: selectedRace.attributes.str,
            dex: selectedRace.attributes.dex,
            con: selectedRace.attributes.con,
            int: selectedRace.attributes.int,
            wis: selectedRace.attributes.wis,
            cha: selectedRace.attributes.cha,
          },
        });
      }
    } catch (error) {
      console.error('Error setting race attributes:', error);
    }
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
          <select name="classId" value={data.classId} onChange={handleClassChange}>
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Race:</label>
          <select name="raceId" value={data.raceId} onChange={handleRaceChange}>
            <option value="">Select Race</option>
            {races.map(r => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default CreateCharacter;