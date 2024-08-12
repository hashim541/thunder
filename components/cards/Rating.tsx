// components/Rating.tsx
import { FaStar as FaStarSolid, FaRegStar as FaStarRegular } from 'react-icons/fa';

interface RatingProps {
  rating: number; 
}

const Rating  = ({ rating }: RatingProps) => {
  const maxRating = 5; 

  return (
    <div className="flex items-center text-xl">
      {Array.from({ length: maxRating }, (_, index) => (
        index < rating ? (
          <FaStarSolid key={index} className="text-yellow-500" />
        ) : (
          <FaStarSolid key={index} className="text-gray-200 " />
        )
      ))}
    </div>
  );
};

export default Rating;
