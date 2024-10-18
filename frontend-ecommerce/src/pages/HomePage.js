import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const { categories, products, loading, prodsLoading, setProducts, setProdsLoading } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    setProdsLoading(true)
    axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => {
        setProducts(response.data);
        setProdsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProdsLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className='home-products'>
        {prodsLoading ? <div>Loading Products... </div> :
          <>
           {products && products?.length > 0 && <h3>All Products by Filter</h3>} 
            <div className="products-grid">
              {products.map(product => (
                <div className="product-card" key={product?.id} onClick={() => navigate(`/product/${product?.id}`)}>
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </div>

              ))}
            </div>
          </>
        }

      </div>
      <div className='home-categories'>
        <div className='home-categories--lists'>
          <h3>All Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
