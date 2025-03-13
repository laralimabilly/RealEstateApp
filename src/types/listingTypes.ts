/**
 * Represents a real estate property listing
 */
export interface Listing {
    Id: string;
    Title: string;
    Location: string;
    SalePrice: number;
    Bedrooms: number;
    Bathrooms: number;
    Parking: number;
    Sqft: number;
    Description?: string;
    ThumbnailURL: string;
    PictureURL: string;
    YearBuilt: number;
    DateListed: string;
  }
 
  /**
   * Represents the filter criteria for listings
   */
  export interface ListingFilters {
    bedrooms: number | null;
    bathrooms: number | null;
    parking: number | null;
    priceRange: {
      min: number;
      max: number;
    };
  }