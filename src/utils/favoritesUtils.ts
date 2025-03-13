import { Listing } from '../types/listingTypes';

/**
 * Utility functions for handling favorite listings
 */

// Local storage key for favorites
const FAVORITES_STORAGE_KEY = 'favorites';

/**
 * Get all favorite listings from local storage
 */
export const getFavorites = (): Listing[] => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error retrieving favorites from localStorage:', error);
    return [];
  }
};

/**
 * Check if a listing is in favorites
 */
export const isInFavorites = (listingId: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(favorite => favorite.Id === listingId);
};

/**
 * Add a listing to favorites
 */
export const addToFavorites = (listing: Listing): void => {
  try {
    const favorites = getFavorites();
    
    // Don't add if already exists
    if (isInFavorites(listing.Id)) {
      return;
    }
    
    const updatedFavorites = [...favorites, listing];
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    
    // Dispatch custom event for any listeners
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
      detail: { favorites: updatedFavorites }
    }));
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

/**
 * Remove a listing from favorites
 */
export const removeFromFavorites = (listingId: string): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(favorite => favorite.Id !== listingId);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    
    // Dispatch custom event for any listeners
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
      detail: { favorites: updatedFavorites }
    }));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

/**
 * Toggle a listing's favorite status
 */
export const toggleFavorite = (listing: Listing): boolean => {
  const isFavorite = isInFavorites(listing.Id);
  
  if (isFavorite) {
    removeFromFavorites(listing.Id);
    return false;
  } else {
    addToFavorites(listing);
    return true;
  }
};