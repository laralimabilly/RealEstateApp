import { NavigateFunction } from 'react-router-dom';

interface ErrorStateProps {
  error: string | null;
  navigate: NavigateFunction;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, navigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error || 'Listing not found'}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded-md"
        >
          Return to Listings
        </button>
      </div>
    </div>
  );
};

export default ErrorState;