import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { listingsService } from '../api/listingsService';
import { Listing, ListingFilters } from '../types/listingTypes';

interface ListingsContextType {
  listings: Listing[];
  filteredListings: Listing[];
  filters: ListingFilters;
  loading: boolean;
  error: string | null;
  updateFilters: (newFilters: Partial<ListingFilters>) => void;
  resetFilters: () => void;
}

// Initial filter state
const defaultFilters: ListingFilters = {
  bedrooms: null,
  bathrooms: null,
  parking: null,
  priceRange: {
    min: 0,
    max: 1000000,
  },
};

// Create context with default values
const ListingsContext = createContext<ListingsContextType>({
  listings: [],
  filteredListings: [],
  filters: defaultFilters,
  loading: false,
  error: null,
  updateFilters: () => {},
  resetFilters: () => {},
});

interface ListingsProviderProps {
  children: ReactNode;
}

export const ListingsProvider: React.FC<ListingsProviderProps> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState<ListingFilters>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch listings on component mount
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const data = await listingsService.getListings();
        setListings(data);
        setFilteredListings(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    const applyFilters = () => {
      const filtered = listings.filter((listing) => {
        // Apply bedroom filter if set
        if (filters.bedrooms !== null && listing.Bedrooms < filters.bedrooms) {
          return false;
        }

        // Apply bathroom filter if set
        if (filters.bathrooms !== null && listing.Bathrooms < filters.bathrooms) {
          return false;
        }

        // Apply parking filter if set
        if (filters.parking !== null && listing.Parking < filters.parking) {
          return false;
        }

        // Apply price range filter
        if (
          listing.SalePrice < filters.priceRange.min ||
          listing.SalePrice > filters.priceRange.max
        ) {
          return false;
        }

        return true;
      });

      setFilteredListings(filtered);
    };

    applyFilters();
  }, [filters, listings]);

  // Update filters with partial data
  const updateFilters = (newFilters: Partial<ListingFilters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      // Handle nested price range object
      priceRange: {
        ...prevFilters.priceRange,
        ...(newFilters.priceRange || {}),
      },
    }));
  };

  // Reset filters to default values
  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <ListingsContext.Provider
      value={{
        listings,
        filteredListings,
        filters,
        loading,
        error,
        updateFilters,
        resetFilters,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

// Custom hook for using the listings context
export const useListings = () => useContext(ListingsContext);