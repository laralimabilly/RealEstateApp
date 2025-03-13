import ListingCard from './ListingCard';
import { useListings } from '../../contexts/ListingsContext';

/**
 * Grid component for displaying multiple property listings
 */
const ListingsGrid: React.FC = () => {
  const { filteredListings, loading, error } = useListings();

  if (loading) {
    return (
      <div className="text-center py-10 text-base text-gray-600">
        Loading listings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-base text-red-700 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  if (filteredListings.length === 0) {
    return (
      <div className="text-center py-10 text-base text-gray-600 bg-gray-50 rounded-md">
        No listings match your search criteria. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {filteredListings.map((listing) => (
        <ListingCard key={listing.Id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingsGrid;