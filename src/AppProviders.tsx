import { ReactNode } from 'react';
import { ListingsProvider } from './contexts/ListingsContext';
import { ListingDetailsProvider } from './contexts/ListingDetailsContext';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ListingsProvider>
      <ListingDetailsProvider>
        {children}
      </ListingDetailsProvider>
    </ListingsProvider>
  );
};

export default AppProviders;