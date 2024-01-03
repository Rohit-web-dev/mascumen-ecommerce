"use client"
import { useState, useEffect } from 'react'

const PriceRangeFilter = ({ onPriceRangeChange, minPrice, maxPrice }) => {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || '');

  useEffect(() => {
    setLocalMinPrice(minPrice || '');
    setLocalMaxPrice(maxPrice || '');
  }, [minPrice, maxPrice]);

  const handleFilterChange = () => {
    if (localMinPrice !== '' && localMaxPrice !== '' && !isNaN(localMinPrice) && !isNaN(localMaxPrice)) {
      onPriceRangeChange({
        min: parseFloat(localMinPrice),
        max: parseFloat(localMaxPrice),
      });
    }
  };

  const handleResetFilter = () => {
    setLocalMinPrice('');
    setLocalMaxPrice('');
    onPriceRangeChange(null);
  };

  return (
    <div className='price-filter'>
      <label htmlFor="minPrice">Min Price:</label>
      <input
        type="number"
        id="minPrice"
        value={localMinPrice}
        onChange={(e) => setLocalMinPrice(e.target.value)}
      />

      <label htmlFor="maxPrice">Max Price:</label>
      <input
        type="number"
        id="maxPrice"
        value={localMaxPrice}
        onChange={(e) => setLocalMaxPrice(e.target.value)}
      />

      <div className='price-filter-btn'>
        <button onClick={handleResetFilter}>Reset</button>
        <button onClick={handleFilterChange}>Apply</button>
      </div>
    </div>
  )
}

export default PriceRangeFilter