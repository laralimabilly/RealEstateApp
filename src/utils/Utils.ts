/**
 * Formats a number as a price with currency symbol
 */
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(price);
};

/**
 * Formats a date as: Mar 3, 2023
 */
export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Formats the phone input
 */
export const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, ""); 
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

/**
 * Validates the format of an email address
 */
export const isValidEmail = (email: string): boolean => { 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
};

/**
 * Validates the format of a phone number removing the mask
 */
export const isValidPhoneNumber = (phone: string): boolean => {
    phone = phone.replace(/\D/g, "");
    return /^\d+$/.test(phone); 
};