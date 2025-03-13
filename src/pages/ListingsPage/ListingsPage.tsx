import FilterSection from '../../components/listings/FilterSection';
import ListingsGrid from '../../components/listings/ListingsGrid';

/**
 * Main page component for the listings search and results
 */
const ListingsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-4xl text-center font-bold mb-24">Real Estate Listings</h1>
      <FilterSection />
      <ListingsGrid />
    </div>
  );
};

export default ListingsPage;