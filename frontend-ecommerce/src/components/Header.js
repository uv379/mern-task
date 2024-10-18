import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Search from './Search';

function Header() {
  const { cartItems } = useContext(ProductContext);

  return (
    <header className='header--container'>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>

        </ul>
      </nav>
      <div style={{ marginTop: '10px' }}>
        <Search />
      </div>
      <div className='header--rigth-side'>
        <Link to="/cart">
          <div>
            <span>🛒</span>
            <span>({cartItems.length})</span>
          </div>
        </Link>
        <div className='heder-right-itmes'>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
