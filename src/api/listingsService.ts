import axios from 'axios';
import { Listing } from '../types/listingTypes';

// const API_URL = 'https://s3.us-west-2.amazonaws.com/cdn.number8.com/LA/listings.json';
const API_URL = '/listings.json';

/**
 * Service for fetching data
 */
export const listingsService = {
  /**
   * Fetch all listings from the API
   * @returns Promise containing array of listings
   */
  async getListings(): Promise<Listing[]> {
    try {
      const response = await axios.get<Listing[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw new Error('Failed to fetch listings data');
    }
  },

  /**
   * Fetch a single listing by ID
   * @param id The ID of the listing to fetch
   * @returns Promise containing the listing or null if not found
   */
  async getListingById(id: string): Promise<Listing | null> {
    try {
      // Since we're using a static JSON file, we need to fetch all listings
      // and then filter for the one we want
      const response = await axios.get<Listing[]>(API_URL);
      const listing = response.data.find(listing => listing.Id == id);
      return listing || null;
    } catch (error) {
      console.error(`Error fetching listing with ID ${id}:`, error);
      throw new Error('Failed to fetch listing details');
    }
  }
};