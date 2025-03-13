# Real Estate Listings App

A modern React TypeScript application for browsing and managing real estate listings. This project demonstrates a clean, component-based architecture using React, TypeScript, and the Context API for state management.

## 🏠 Features

- Browse property listings with filtering
- View detailed property information
- Save favorite properties
- Contact property agents
- Responsive design for all device sizes

## 🛠️ Technology Stack

- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and development server
- **React Router**: Navigation
- **Context API**: State management
- **Axios**: HTTP client for API requests
- **TailwindCSS**: Styling
- **Lucide React**: Icons

## 📁 Project Structure

```
public/
├── img/
│   └── no-image.png
├── listings.json
src/
├── api/                  # API service layer
│   └── listingsService.ts
├── components/           # Reusable UI components
│   ├── common/           # Shared components (buttons, inputs, etc.)
│   │   ├── ContactForm.tsx
│   │   ├── FavoritesModal.tsx
│   │   ├── FilterDropdown.tsx
│   │   └── PriceRangeSlider.tsx
│   └── layout/           # Layout-specific components
│   │   ├── ErrorState.tsx
│   │   └── LoadingState.tsx
│   └── listingDetails/   # Listing Details-specific components
│   │   ├── ListingDescription.tsx
│   │   ├── ListingFeatures.tsx
│   │   ├── ListingHeader.tsx
│   │   └── FilterImage.tsx
│   └── listings/         # Listing-specific components
│       ├── FilterSection.tsx
│       ├── ListingGrid.tsx
│       └── ListingCard.tsx
├── contexts/             # React Context API
│   ├── ListingsContext.tsx
│   └── ListingDetailsContext.tsx
├── pages/                # Page components
│   ├── ListingsPage/
│   │   └── ListingsPage.tsx
│   └── ListingDetailsPage/
│       └── ListingDetailsPage.tsx
├── types/                # TypeScript type definitions
│   ├── listingTypes.ts
│   └── listingDetailsTypes.ts
├── utils/                # Utility functions
│   ├── Utils.ts
│   └── favoritesUtils.ts
├── AppProviders.tsx      # Context providers
└── App.tsx               # Main app component
```

## 🏗️ Architecture Overview

### Component Hierarchy

The application follows a modular component structure with clear separation of concerns:

- **Pages**: Top-level components that represent routes
- **Components**: Reusable UI elements
- **Contexts**: State management for different domains
- **Services**: API communication layer
- **Utils**: Helper functions and tools

### State Management

The application uses React's Context API for state management, divided into two main contexts:

1. **ListingsContext**
   - Manages the list of all property listings
   - Handles filtering and sorting
   - Tracks loading and error states for listings

2. **ListingDetailsContext**
   - Manages the detailed view of a single property
   - Handles the contact form state and validation
   - Manages favorites functionality
   - Tracks loading and error states for the details view

### Data Flow

1. Data is fetched from the API via service layer
2. Context providers manage and distribute state
3. Components consume state via context hooks
4. User interactions trigger context methods
5. Context updates trigger component re-renders

## 🔄 Key Patterns Used

### Context + Hooks Pattern

The application uses custom hooks (e.g., `useListings`, `useListingDetails`) to provide clean access to context data and methods.

```typescript
// Example usage of context
const { listing, loading, error } = useListingDetails();
```

### Component Composition

UI elements are composed of smaller, focused components:

```tsx
<ListingDetailsPage>
  <ListingHeader />
  <ListingImage />
  <ListingFeatures />
  <ListingDescription />
  <ContactForm />
</ListingDetailsPage>
```

### Centralized Type Definitions

TypeScript interfaces are defined in dedicated type files:

```typescript
// Example from listingTypes.ts
export interface Listing {
  Id: string;
  Title: string;
  Location: string;
  SalePrice: number;
  // ...other properties
}
```

### Utility Functions

Common operations are extracted into utility functions:

```typescript
// Example from Utils.ts
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};
```

## 📱 Responsive Design

The application is fully responsive with different layouts for:
- Mobile devices
- Tablets
- Desktops

## 🔒 Local Storage

Favorites are persisted using the browser's localStorage API, allowing users to return to their saved properties across sessions.

## 🎨 Styling Approach

The project uses TailwindCSS for styling with:
- CSS variables for theme colors and consistent design
- Responsive utility classes
- Component-scoped styling

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm run dev` or `yarn run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser (Vite default)

## 📊 Future Improvements

- Add user authentication
- Implement property search functionality
- Add map view for property locations
- Create saved search functionality
- Add property comparison features