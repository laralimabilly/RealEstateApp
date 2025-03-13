import { Listing } from '../../types/listingTypes';
import { useListingDetails } from '../../contexts/ListingDetailsContext';

interface ListingHeaderProps {
  listing: Listing;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ listing }) => {
  const { formatPrice, formatDate } = useListingDetails();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)]">{listing.Title}</h1>
        <p className="text-[var(--color-primary)] mb-2">{listing.Location}</p>
      </div>
      <div className="mt-2 md:mt-0 text-left md:text-right shrink-0">
        <div className="text-3xl font-bold text-[var(--color-dark)]">{formatPrice(listing.SalePrice)}</div>
        <div className="text-sm text-[var(--color-primary)]">
          Date Listed: {formatDate(listing.DateListed)}
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;