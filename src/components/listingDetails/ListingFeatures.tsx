import { Bed, Bath, Car, Home, Calendar } from 'lucide-react';
import { Listing } from '../../types/listingTypes';

interface ListingFeaturesProps {
  listing: Listing;
}

const ListingFeatures: React.FC<ListingFeaturesProps> = ({ listing }) => {
  return (
    <div className="flex flex-wrap justify-between bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center p-3">
        <Bed size={20} className="mr-2 text-[var(--color-accent)]" />
        <div>
          <div className="text-xl font-semibold">{listing.Bedrooms}</div>
          <div className="text-sm text-[var(--color-primary)]">BED</div>
        </div>
      </div>
      
      <div className="flex items-center p-3">
        <Bath size={20} className="mr-2 text-[var(--color-accent)]" />
        <div>
          <div className="text-xl font-semibold">{listing.Bathrooms}</div>
          <div className="text-sm text-[var(--color-primary)]">BATH</div>
        </div>
      </div>
      
      <div className="flex items-center p-3">
        <Car size={20} className="mr-2 text-[var(--color-accent)]" />
        <div>
          <div className="text-xl font-semibold">{listing.Parking}</div>
          <div className="text-sm text-[var(--color-primary)]">PARKING</div>
        </div>
      </div>
      
      <div className="flex items-center p-3">
        <Home size={20} className="mr-2 text-[var(--color-accent)]" />
        <div>
          <div className="text-xl font-semibold">{listing.Sqft || listing.Sqft}</div>
          <div className="text-sm text-[var(--color-primary)]">SQFT</div>
        </div>
      </div>
      
      <div className="flex items-center p-3">
        <Calendar size={20} className="mr-2 text-[var(--color-accent)]" />
        <div>
          <div className="text-xl font-semibold">{listing.YearBuilt}</div>
          <div className="text-sm text-[var(--color-primary)]">YEAR BUILT</div>
        </div>
      </div>
    </div>
  );
};

export default ListingFeatures;