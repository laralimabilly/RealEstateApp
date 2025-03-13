import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useListingDetails } from '../../contexts/ListingDetailsContext';

import ListingHeader from '../../components/listingDetails/ListingHeader';
import ListingImage from '../../components/listingDetails/ListingImage';
import ListingFeatures from '../../components/listingDetails/ListingFeatures';
import ListingDescription from '../../components/listingDetails/ListingDescription';
import ContactForm from '../../components/common/ContactForm';
import LoadingState from '../../components/layout/LoadingState';
import ErrorState from '../../components/layout/ErrorState';
const ListingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    listing,
    loading,
    error,
    resetForm,
    fetchListingDetails
  } = useListingDetails();

  // Fetch listing data when component mounts
  useEffect(() => {
    if (id) {
      resetForm();
      fetchListingDetails(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !listing) {
    return <ErrorState error={error} navigate={navigate} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ListingHeader listing={listing} />
          <ListingImage listing={listing} />
          <ListingFeatures listing={listing} />
          <ListingDescription listing={listing} />
        </div>
        <div className="lg:col-span-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;