import { Bed, Bath, Car } from 'lucide-react';
import PriceRangeSlider from '../common/PriceRangeSlider';
import FilterDropdown from '../common/FilterDropdown';
import { useListings } from '../../contexts/ListingsContext';

/**
 * Filter section component for filtering listings by various criteria
 * with modern design matching the listing cards
 */
const FilterSection: React.FC = () => {
  const { filters, updateFilters } = useListings();

  const handleBedroomsChange = (value: number | null) => {
    updateFilters({ bedrooms: value });
  };

  const handleBathroomsChange = (value: number | null) => {
    updateFilters({ bathrooms: value });
  };

  const handleParkingChange = (value: number | null) => {
    updateFilters({ parking: value });
  };

  const handlePriceRangeChange = (priceRange: { min: number; max: number }) => {
    updateFilters({ priceRange });
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 p-5 border border-[var(--color-light)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2 text-[var(--color-dark)]">
            <Bed size={18} className="mr-2 text-[var(--color-accent)]" />
            <span className="font-medium">Bedrooms</span>
          </div>
          <FilterDropdown
            label=""
            value={filters.bedrooms}
            onChange={handleBedroomsChange}
            options={[1, 2, 3, 4, 5]}
            className="w-full bg-[var(--color-light)] border-0 rounded-md p-2.5 text-[var(--color-dark)]"
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-2 text-[var(--color-dark)]">
            <Bath size={18} className="mr-2 text-[var(--color-accent)]" />
            <span className="font-medium">Bathrooms</span>
          </div>
          <FilterDropdown
            label=""
            value={filters.bathrooms}
            onChange={handleBathroomsChange}
            options={[1, 2, 3, 4]}
            className="w-full bg-[var(--color-light)] border-0 rounded-md p-2.5 text-[var(--color-dark)]"
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-2 text-[var(--color-dark)]">
            <Car size={18} className="mr-2 text-[var(--color-accent)]" />
            <span className="font-medium">Parking</span>
          </div>
          <FilterDropdown
            label=""
            value={filters.parking}
            onChange={handleParkingChange}
            options={[1, 2, 3]}
            className="w-full bg-[var(--color-light)] border-0 rounded-md p-2.5 text-[var(--color-dark)]"
          />
        </div>
        
        <div className="lg:col-span-2">
          <div className="flex items-center mb-2 text-[var(--color-dark)]">
            <span className="font-medium">Price Range</span>
          </div>
          <PriceRangeSlider
            label=""
            minValue={0}
            maxValue={1000000}
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            step={25000}
            className="w-full"
          />
        </div>
      </div>
      
      {/* <div className="mt-5 flex justify-end">
        <button className="flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-dark)] text-white py-2.5 px-6 rounded-md font-medium transition-colors duration-300 shadow-sm">
          <Search size={18} />
          Search Properties
        </button>
      </div> */}
    </div>
  );
};

export default FilterSection;