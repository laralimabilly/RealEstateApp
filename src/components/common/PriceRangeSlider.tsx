import { useState, useEffect } from 'react';
import { formatPrice } from '../../utils/Utils';

interface PriceRangeSliderProps {
  label: string;
  minValue: number;
  maxValue: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  step?: number;
  className?: string;
}

/**
 * A dual-handle slider for selecting a price range with modern styling
 */
const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  label,
  minValue,
  maxValue,
  value,
  onChange,
  step = 10000,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Update local state when props change
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce the change to avoid too many rerenders
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue.min !== value.min || localValue.max !== value.max) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value, 10);
    setLocalValue({
      min: newMin,
      max: Math.max(newMin, localValue.max),
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10);
    setLocalValue({
      min: Math.min(localValue.min, newMax),
      max: newMax,
    });
  };

  // Calculate percentage for custom range track
  const minPercentage = ((localValue.min - minValue) / (maxValue - minValue)) * 100;
  const maxPercentage = ((localValue.max - minValue) / (maxValue - minValue)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block font-medium text-sm mb-2 text-[var(--color-dark)]">
          {label}
        </label>
      )}
      
      <div className="flex flex-col">
        <div className="relative h-2 mb-6 mt-4">
          <div className="absolute h-2 w-full rounded-full bg-[var(--color-light)]"></div>
          <div 
            className="absolute h-2 rounded-full bg-[var(--color-accent)]"
            style={{ 
              left: `${minPercentage}%`, 
              width: `${maxPercentage - minPercentage}%` 
            }}
          ></div>
          <input
            type="range"
            className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
            min={minValue}
            max={maxValue}
            step={step}
            value={localValue.min}
            onChange={handleMinChange}
            style={{ pointerEvents: 'auto' }}
          />
          <input
            type="range"
            className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-20"
            min={minValue}
            max={maxValue}
            step={step}
            value={localValue.max}
            onChange={handleMaxChange}
            style={{ pointerEvents: 'auto' }}
          />
        </div>
        <div className="flex justify-between items-center text-sm text-[var(--color-primary)]">
          <div className="font-medium">
            {formatPrice(localValue.min)}
          </div>
          <div className="font-medium">
            {formatPrice(localValue.max)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;