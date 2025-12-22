import { Star } from 'lucide-react';
import { useState } from 'react';

interface RatingStarsProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function RatingStars({
  rating,
  onRatingChange,
  readonly = false,
  size = 'md',
  showNumber = false,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          className={`
            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
            transition-transform duration-150
            ${readonly ? '' : 'active:scale-95'}
          `}
        >
          <Star
            className={`
              ${sizes[size]}
              ${value <= displayRating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-300'}
              transition-colors duration-150
            `}
          />
        </button>
      ))}
      {showNumber && (
        <span className="ml-2 text-sm font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
