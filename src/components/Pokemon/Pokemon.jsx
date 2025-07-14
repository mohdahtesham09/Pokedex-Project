import './pokemon.css'

function Pokemon({ name , image}){

     // ✅ Speak function
  const speakName = () => {
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = 'en-IN';
    speechSynthesis.speak(utterance);
  };
    

    return(
         <div className='pokemon' onClick={speakName}>
      <div className='pokemon-name'>{name}</div>
      <div>
        <img className='pokemon-image' src={image} alt={name} />
      </div>
    </div>
        
        // <div className='pokemon'>
        //     <div className='pokemon-name'>{name}</div>
        //     <div><img className='pokemon-image' src={image}/></div>
        // </div>
    )

}

export default Pokemon