"use client"
import {useState} from 'react'

const PriceRangeFilter = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterChange = () => {
    if (minPrice !== '' && maxPrice !== '' && !isNaN(minPrice) && !isNaN(maxPrice)) {
      onFilterChange({
        min: parseFloat(minPrice),
        max: parseFloat(maxPrice),
      });
    }
  };

  return (
    <div className='price-filter'>
      <label htmlFor="minPrice">Min Price:</label>
      <input
        type="number"
        id="minPrice"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <label htmlFor="maxPrice">Max Price:</label>
      <input
        type="number"
        id="maxPrice"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  )
}

export default PriceRangeFilter