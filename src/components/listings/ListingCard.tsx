import { Link } from 'react-router-dom';
import { Listing } from '../../types/listingTypes';
import { MapPin, Bed, Bath, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/Utils';

interface ListingCardProps {
  listing: Listing;
}

/**
 * Card component for displaying a property listing with modern design
 */
const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { Id, Title, Location, SalePrice, Bedrooms, Bathrooms, ThumbnailURL } = listing;

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full transform hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        {ThumbnailURL && ThumbnailURL.length > 0 ? (
          <img 
            src={ThumbnailURL} 
            alt={Title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-dark)]" />
        )}
        <div className="absolute top-3 right-3 bg-[var(--color-accent)] text-white py-1 px-3 rounded-full text-sm font-medium">
          {formatPrice(SalePrice)}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2 line-clamp-2 h-14 overflow-hidden">
          {Title}
        </h3>
        
        <div className="flex items-center mb-3 text-sm text-[var(--color-primary)]">
          <MapPin size={16} className="mr-1 text-[var(--color-accent)]" />
          <span className="truncate">{Location}</span>
        </div>
        
        <div className="flex items-center justify-start gap-4 mb-4 text-sm">
          <div className="flex items-center text-[var(--color-primary)]">
            <Bed size={16} className="mr-1 text-[var(--color-accent)]" />
            <span className="font-bold">{Bedrooms}&nbsp;</span>
            <span>{Bedrooms === 1 ? 'bed' : 'beds'}</span>
          </div>
          <div className="flex items-center text-[var(--color-primary)]">
            <Bath size={16} className="mr-1 text-[var(--color-accent)]" />
            <span className="font-bold">{Bathrooms}&nbsp;</span>
            <span>{Bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
        </div>
        
        <Link 
          to={`/listings/${Id}`}
          className="mt-auto flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-dark)] text-white py-2.5 px-4 rounded-md font-medium transition-colors duration-300"
        >
          View Details
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;