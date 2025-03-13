import { Heart } from 'lucide-react';
import { Listing } from '../../types/listingTypes';
import { useState, useEffect } from 'react';
import FavoritesModal from '../common/FavoritesModal';
import { isInFavorites, toggleFavorite, getFavorites } from '../../utils/favoritesUtils';

interface ListingImageProps {
  listing: Listing;
}

const ListingImage: React.FC<ListingImageProps> = ({ listing }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  // Check if this listing is already in favorites
  useEffect(() => {
    setIsFavorite(isInFavorites(listing.Id));
    
    // Listen for favorite updates from other components
    const handleFavoritesUpdate = () => {
      setIsFavorite(isInFavorites(listing.Id));
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, [listing.Id]);

  // Handle toggling favorite status
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newStatus = toggleFavorite(listing);
    setIsFavorite(newStatus);
  };

  // Open favorites modal
  const openFavoritesModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowFavoritesModal(true);
  };

  // Close favorites modal
  const closeFavoritesModal = () => {
    setShowFavoritesModal(false);
  };

  return (
    <>
      <div className="w-full h-96 bg-[var(--color-primary)] rounded-lg overflow-hidden mb-6 relative">
        {listing.ThumbnailURL ? (
          <img 
            src={listing.ThumbnailURL} 
            alt={listing.Title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-dark)]" />
        )}
        
        {/* Save property button */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            className="bg-white p-2.5 rounded-full shadow-md hover:bg-[var(--color-light)] transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Save property"}
            onClick={handleToggleFavorite}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={20} 
              className={isFavorite ? "text-red-500 fill-red-500" : "text-[var(--color-accent)]"}
            />
          </button>
          
          {/* View favorites button */}
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-[var(--color-light)] transition-colors text-xs font-medium"
            onClick={openFavoritesModal}
            title="View favorites"
          >
            My Favorites
          </button>
        </div>
      </div>

      {/* Favorites Modal */}
      {showFavoritesModal && (
        <FavoritesModal 
          favorites={getFavorites()} 
          onClose={closeFavoritesModal} 
          onRemove={() => {}}
        />
      )}
    </>
  );
};

export default ListingImage;