import { Link } from 'react-router-dom';
import Icon from '../UI/Icons.js';
import './Header.css';

export default function Header() {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <header className="Header">
      <Link to='/'><Icon.Group /></Link>
      <Link to={'/'}><h1>My Learning</h1></Link>
      <div className="welcome"><p>Welcome Graeme!</p></div>
    </header>
  )
}
