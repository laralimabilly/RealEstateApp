import { Listing } from '../../types/listingTypes';

interface ListingDescriptionProps {
  listing: Listing;
}

const ListingDescription: React.FC<ListingDescriptionProps> = ({ listing }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-[var(--color-dark)]">Description</h2>
      <p className="text-[var(--color-primary)] leading-relaxed">
        {listing.Description}
      </p>
    </div>
  );
};

export default ListingDescription;