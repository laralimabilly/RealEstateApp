import { useListingDetails } from '../../contexts/ListingDetailsContext';

const ContactForm: React.FC = () => {
  const {
    formData,
    errors,
    submitMessage,
    handlePhoneChange,
    handleInputChange,
    handleSubmit
  } = useListingDetails();

  return (
    <div className="bg-[var(--color-light)] rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-xl font-bold mb-6 text-center text-[var(--color-dark)]">Contact Agent</h2>
      
      {submitMessage && (
        <div className={`p-3 mb-4 rounded-md ${
          submitMessage.isSuccess 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {submitMessage.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name *"
            className={`w-full p-3 bg-white rounded-md border ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
          />
          {errors.fullName && (
            <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>
        
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email *"
            className={`w-full p-3 bg-white rounded-md border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Phone Number *"
            className={`w-full p-3 bg-white rounded-md border ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
          />
          {errors.phone && (
            <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        
        <div className="mb-6">
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            placeholder="Comments *"
            rows={4}
            className={`w-full p-3 bg-white rounded-md border ${
              errors.comments ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
          />
          {errors.comments && (
            <p className="mt-1 text-red-500 text-sm">{errors.comments}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-white py-3 px-4 rounded-md font-medium transition-colors duration-300 shadow-sm"
        >
          Contact Now
        </button>
      </form>
    </div>
  );
};

export default ContactForm;