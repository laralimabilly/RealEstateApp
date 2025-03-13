import React from 'react';

interface FilterDropdownProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  options: number[];
  minValue?: number;
  className?: string; 
}

/**
 * Dropdown component for filter selections with modern styling
 */
const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value === "" ? null : parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="font-medium text-sm mb-1.5 text-[var(--color-dark)]">
          {label}
        </label>
      )}
      <select 
        className={`p-2.5 rounded-md text-sm bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition-all duration-200 cursor-pointer appearance-none bg-no-repeat bg-right pr-8 ${className}`}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23414F59' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center'
        }}
        value={value === null ? "" : value} 
        onChange={handleChange}
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}+
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;