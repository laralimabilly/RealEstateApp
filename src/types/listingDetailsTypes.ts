import { Listing } from './listingTypes';

// Contact form interface
export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  comments: string;
}

// Form errors interface
export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  comments?: string;
}

// Submit message interface
export interface SubmitMessage {
  text: string;
  isSuccess: boolean;
}

// Context type definition
export interface ListingDetailsContextType {
  // Listing data
  listing: Listing | null;
  loading: boolean;
  error: string | null;
  
  // Form data
  formData: ContactFormData;
  errors: FormErrors;
  submitMessage: SubmitMessage | null;
  
  // Favorites data
  favorites: Listing[];
  isFavorite: boolean;
  showFavoritesModal: boolean;
  
  // Methods
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
  fetchListingDetails: (id: string) => Promise<void>;
  formatPrice: (price: number) => string;
  formatDate: (dateStr: string) => string;
  
  // Favorites methods
  toggleFavorite: (listing: Listing) => void;
  openFavoritesModal: () => void;
  closeFavoritesModal: () => void;
  removeFavorite: (id: string) => void;
}