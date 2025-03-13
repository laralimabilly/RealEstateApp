import { useEffect, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Listing } from '../../types/listingTypes';
import { Link } from 'react-router-dom';
import { useListingDetails } from '../../contexts/ListingDetailsContext';
import { removeFromFavorites } from '../../utils/favoritesUtils';

interface FavoritesModalProps {
  favorites: Listing[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ favorites, onClose, onRemove }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useListingDetails();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Prevent scrolling of the body when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle key press (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Handle removing a favorite
  const handleRemove = (id: string) => {
    removeFromFavorites(id);
    onRemove(id);
  };

  return (
    <div className="fixed inset-0 bg-[#000000cc] z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-b-gray-300 flex justify-between items-center bg-[var(--color-light)]">
          <h2 className="text-xl font-bold text-[var(--color-dark)]">
            My Favorite Properties
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-full"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 overflow-y-auto flex-grow">
          {favorites.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>You haven't saved any properties yet.</p>
              <p className="mt-2">Click the heart icon on properties you like to save them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {favorites.map(favorite => (
                <div 
                  key={favorite.Id} 
                  className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Property Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    {favorite.ThumbnailURL ? (
                      <img 
                        src={favorite.ThumbnailURL} 
                        alt={favorite.Title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-dark)]" />
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-[var(--color-dark)]">{favorite.Title}</h3>
                      <p className="text-sm text-[var(--color-primary)] mb-1">{favorite.Location}</p>
                      <p className="text-sm">
                        <span className="font-medium">{formatPrice(favorite.SalePrice)}</span> • {favorite.Bedrooms} bed • {favorite.Bathrooms} bath
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <Link 
                        to={`/listings/${favorite.Id}`}
                        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                        onClick={onClose}
                      >
                        View Details
                      </Link>
                      
                      <button 
                        onClick={() => handleRemove(favorite.Id)}
                        className="text-red-500 p-1.5 hover:bg-red-50 rounded-full"
                        aria-label="Remove from favorites"
                        title="Remove from favorites"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-t-gray-300 bg-[var(--color-light)] text-center">
          <button
            onClick={onClose}
            className=" bg-[var(--color-accent)] hover:bg-[var(--color-dark)] text-white py-2 px-4 rounded-md font-medium transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;