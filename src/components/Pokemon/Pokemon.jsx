import './pokemon.css'
import { Link } from 'react-router-dom';


function Pokemon({ name , image,  id}){

     // ✅ Speak function
  const speakName = () => {
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = 'en-IN';
    speechSynthesis.speak(utterance);
  };
    

    return(
         <div className='pokemon' onClick={speakName}>
            <Link to = {`/pokemon/${id}`} className='pokemon-link'>
             <div className='pokemon-name'>{name}</div>
                <div>
                 <img className='pokemon-image' src={image} alt={name} />
                </div>
            </Link>
          </div>
       
    )

}

export default Pokemon