import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Home() {
  return(
    <div>
      <h1>TexVenture</h1>
      <button>Play Game</button>
      <br></br>
      <button>Create Character</button>
    </div>
  );
}

export default Home;
