import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { listingsService } from '../api/listingsService';
import { Listing } from '../types/listingTypes';
import { formatDate, formatPhoneNumber, formatPrice, isValidEmail, isValidPhoneNumber } from '../utils/Utils';
import { ContactFormData, FormErrors, SubmitMessage, ListingDetailsContextType } from '../types/listingDetailsTypes';
import { getFavorites, isInFavorites, toggleFavorite as toggleFavoriteUtil, removeFromFavorites } from '../utils/favoritesUtils';

// Initial form data
const defaultFormData: ContactFormData = {
  fullName: '',
  email: '',
  phone: '',
  comments: ''
};

// Create context with default values
const ListingDetailsContext = createContext<ListingDetailsContextType>({
  // Listing data
  listing: null,
  loading: false,
  error: null,
  
  // Form data
  formData: defaultFormData,
  errors: {},
  submitMessage: null,
  
  // Favorites data
  favorites: [],
  isFavorite: false,
  showFavoritesModal: false,
  
  // Methods
  handlePhoneChange: () => {},
  handleInputChange: () => {},
  handleSubmit: () => {},
  resetForm: () => {},
  fetchListingDetails: async () => {},
  formatPrice: () => '',
  formatDate: () => '',
  
  // Favorites methods
  toggleFavorite: () => {},
  openFavoritesModal: () => {},
  closeFavoritesModal: () => {},
  removeFavorite: () => {}
});

interface ListingDetailsProviderProps {
  children: ReactNode;
}

export const ListingDetailsProvider: React.FC<ListingDetailsProviderProps> = ({ children }) => {
  // Listing state
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<ContactFormData>(defaultFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage | null>(null);
  
  // Favorites state
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = getFavorites();
      setFavorites(storedFavorites);
    };

    loadFavorites();

    // Listen for favorite updates from other components
    const handleFavoritesUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.favorites) {
        setFavorites(customEvent.detail.favorites);
      } else {
        // Fallback to loading from localStorage
        loadFavorites();
      }
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  // Update isFavorite when listing or favorites change
  useEffect(() => {
    if (listing) {
      setIsFavorite(isInFavorites(listing.Id));
    }
  }, [listing, favorites]);

  // Fetch listing details - using useCallback to prevent dependency issues
  const fetchListingDetails = useCallback(async (id: string) => {
    if (!id) {
      setError('Invalid listing ID');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const foundListing = await listingsService.getListingById(id);
      
      if (foundListing) {
        setListing(foundListing);
      } else {
        setError('Listing not found');
      }
    } catch (err) {
      setError('Failed to load listing details');
      console.error('Error fetching listing details:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formattedPhone });
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear submit message when form changes
    if (submitMessage) {
      setSubmitMessage(null);
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }
    
    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    // Validate Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
      isValid = false;
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }
    
    // Validate Comments
    if (!formData.comments.trim()) {
      newErrors.comments = "Comments are required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, show success message
      setSubmitMessage({
        text: "Message sent successfully",
        isSuccess: true
      });
      
      // Reset form
      resetForm();
    } else {
      // Form is invalid
      setSubmitMessage({
        text: "Please correct the errors in the form",
        isSuccess: false
      });
    }
  };
  
  const resetForm = () => {
    setFormData(defaultFormData);
    setErrors({});
    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

  // Favorites methods
  const toggleFavorite = (listing: Listing) => {
    const newStatus = toggleFavoriteUtil(listing);
    setIsFavorite(newStatus);
    setFavorites(getFavorites());
  };

  const openFavoritesModal = () => {
    setShowFavoritesModal(true);
  };

  const closeFavoritesModal = () => {
    setShowFavoritesModal(false);
  };

  const removeFavorite = (id: string) => {
    removeFromFavorites(id);
    setFavorites(getFavorites());
    
    if (listing && listing.Id === id) {
      setIsFavorite(false);
    }
  };

  return (
    <ListingDetailsContext.Provider
      value={{
        listing,
        loading,
        error,
        formData,
        errors,
        submitMessage,
        favorites,
        isFavorite,
        showFavoritesModal,
        handlePhoneChange,
        handleInputChange,
        handleSubmit,
        resetForm,
        fetchListingDetails,
        formatPrice,
        formatDate,
        toggleFavorite,
        openFavoritesModal,
        closeFavoritesModal,
        removeFavorite
      }}
    >
      {children}
    </ListingDetailsContext.Provider>
  );
};

// Custom hook for using the listing details context
export const useListingDetails = () => useContext(ListingDetailsContext);