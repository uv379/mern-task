import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { setProducts, setProdsLoading } = useContext(ProductContext);
  const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);
  useEffect(() => {
    if (location.pathname.includes('/product/')) {
      navigate('/')
    }
    // Clear previous timeout if it exists
    setProdsLoading(true);
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }
    const timeoutId = setTimeout(() => {
      if (searchTerm && searchTerm.length > 0) {
        axios.get(`https://fakestoreapi.com/products`)
          .then(response => {
            const filteredProducts = response.data.filter(product =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setProducts(filteredProducts);
            setProdsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching search results:', error);
            setProdsLoading(false);
          });
      } else {
        setProdsLoading(false);
        setProducts([])
      }
    }, 500);

    setDebounceTimeoutId(timeoutId);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm])


  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products..."
      />
    </div>
  );
}

export default Search;
