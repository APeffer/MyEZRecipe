import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className='container'>
                <nav>
                    <div className='nav-left'>
                        <Link to='/' className='nav-title'>My EZ Recipe</Link>
                        <Link to='/browse' className='nav-link'>Browse</Link>
                        <Link to='/mystuff' className='nav-link'>My Stuff</Link>
                        <Link to='/create' className='nav-link'>Create</Link>
                        <Link to='/about' className='nav-link'>About</Link>
                    </div>

                    <div className='nav-right'>
                        {!user && (
                            <div>
                                <Link to="/login" className='nav-link'>Login</Link>
                                <Link to="/signup" className='nav-link'>Sign Up</Link>
                            </div>
                        )}
                        {user && (
                            <div>
                                <button onClick={handleClick} className='nav-link'>Log out</button>
                            </div>
                        )}
                    </div>
                </nav>
                

            </div>
        </header>
    )
}

export default Navbar