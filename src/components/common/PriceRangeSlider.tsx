import { useState, useEffect } from 'react';
import { formatPrice } from '../../utils/Utils';

interface PriceRange {
  min: number;
  max: number;
}

interface PriceRangeSliderProps {
  label: string;
  minValue: number;
  maxValue: number;
  value: PriceRange;
  onChange: (value: PriceRange) => void;
  step?: number;
  className?: string;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  label,
  minValue,
  maxValue,
  value,
  onChange,
  step = 10000,
  className = '',
}) => {
  const [range, setRange] = useState(value);
  const [activeHandle, setActiveHandle] = useState<'min' | 'max' | null>(null);

  useEffect(() => {
    setRange(value);
  }, [value]);

  useEffect(() => {
    if (range.min === value.min && range.max === value.max) return;
    
    const timer = setTimeout(() => {
      onChange(range);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [range, value, onChange]);

  useEffect(() => {
    if (!activeHandle) return;

    const handleMouseMove = (e: MouseEvent) => {
      const slider = document.querySelector('.slider-container');
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const percentage = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const newValue = Math.round((percentage * (maxValue - minValue) + minValue) / step) * step;

      setRange(prev => {
        if (activeHandle === 'min') {
          return { ...prev, min: Math.min(newValue, prev.max - step) };
        }
        return { ...prev, max: Math.max(newValue, prev.min + step) };
      });
    };

    const handleMouseUp = () => setActiveHandle(null);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeHandle, minValue, maxValue, step]);

  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveHandle(handle);
  };

  const minPercentage = ((range.min - minValue) / (maxValue - minValue)) * 100;
  const maxPercentage = ((range.max - minValue) / (maxValue - minValue)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block font-medium text-sm mb-2 text-[var(--color-dark)]">
          {label}
        </label>
      )}
      
      <div className="flex flex-col space-y-5">
        <div className="relative h-8 slider-container">
          <div className="absolute top-3 w-full h-2">
            <div className="absolute w-full h-full rounded-full bg-[var(--color-light)]" />
            
            <div
              className="absolute h-full rounded-full bg-[var(--color-accent)]"
              style={{
                left: `${minPercentage}%`,
                width: `${maxPercentage - minPercentage}%`,
              }}
            />
          </div>

          <div
            className="absolute top-1.5 w-6 h-6 -ml-3 rounded-full bg-white border-2 border-[var(--color-accent)] cursor-pointer hover:shadow-lg transition-shadow"
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('min')}
          />
          <div
            className="absolute top-1.5 w-6 h-6 -ml-3 rounded-full bg-white border-2 border-[var(--color-accent)] cursor-pointer hover:shadow-lg transition-shadow"
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown('max')}
          />
        </div>

        <div className="flex justify-between items-center text-sm text-[var(--color-primary)]">
          <div className="font-medium">{formatPrice(range.min)}</div>
          <div className="font-medium">{formatPrice(range.max)}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;