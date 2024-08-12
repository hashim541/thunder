import React from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import Rating from './Rating';

interface RatingSummaryProps {
  totalUsers: number;
  averageRating: number;
  eachRating: Record<string, number>;
}

const RatingSummary = ({ totalUsers, averageRating, eachRating }: RatingSummaryProps) => {
    const calculatePercentage = (count: number) => (count / totalUsers) * 100;
  
    return (
      <div className="p-4 border-2 border-borderColor rounded-lg">
        <h2 className="text-xl font-bold mb-2">Rating Summary</h2>
        <p className="font-semibold text-xl flex items-center gap-2 mb-5">
            Total Users<FaUser className='rounded-full' /> {totalUsers}
        </p>
        <div className="mb-4">
            
          <p className="font-semibold text-4xl flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            {averageRating.toFixed(1)}
          </p>
        </div>
        <div className="ml-8">
          {Object.keys(eachRating).reverse().map((rating) => (
            <div key={rating} className="flex items-center mb-4 gap-2">
              <div className='flex items-center gap-1'>
                <p>{rating}</p>
                <FaStar className="text-yellow-500" />
              </div>
              <div className="flex-1">
                <div className="relative w-full h-3 bg-gray-200 rounded-[100px]">
                  <div
                    className="absolute top-0 left-0 h-full bg-yellow-500 rounded-[100px]"
                    style={{ width: `${calculatePercentage(eachRating[rating])}%` }}
                  ></div>
                </div>
              </div>
                <span className="text-sm flex items-center gap-1 ml-3">{eachRating[rating]} <FaUser /></span>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default RatingSummary;
