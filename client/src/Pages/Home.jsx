import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Home() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleCreateCharacter = () => {
    navigate('/create');
  };


  return(
    <div>
      <h1>TexVenture</h1>
      {user ? (
        <>
          <button>Play Game</button>
          <br></br>
          <button onClick={handleCreateCharacter}>Create Character</button>
        </>
      ): (
        <p>
          Please <Link to="/login">login</Link> to start your adventure!.
        </p>
      )}
    </div>
  );
}

export default Home;
