
import Pokedex from './components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  
  return (
   <div className='outer-pokedex'>
  <h1 className="pokedex-heading">
    <Link to="/">Pokedex</Link>
  </h1>
  <CustomRoutes />
</div>
  )
}

export default App
