import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Import club images
import chess from '../../assets/club-photos/chess.jpg';
import art from '../../assets/club/art.jpg';
import book from '../../assets/club/book.jpg';
import debate from '../../assets/club/debate.jpg';
import drama from '../../assets/club/drama.jpg';
import food from '../../assets/club/food.jpg';
import music from '../../assets/club/music.jpg';
import photo from '../../assets/club/photography.jpg';
import robot from '../../assets/club/robot.jpg';
import science from '../../assets/club/science.jpg';

// Image mapping object
const images = {
  chess: chess,
  art: art,
  book: book,
  debate: debate,
  drama: drama,
  food: food,
  music: music,
  photo: photo,
  robot: robot,
  science: science,
};

const ClubDetails = () => {
  const [clubData, setClubData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        setIsLoading(true);
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/api/club/${id}/detail`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          setClubData(response.data.club);
        } else {
          setError('Failed to load club data');
        }
      } catch (err) {
        console.error('Error fetching club details:', err);
        setError('Error loading club details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchClubDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  if (error || !clubData) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827] flex items-center justify-center">
        <div className="text-red-500 dark:text-red-400 text-center p-4">
          {error || 'Club not found'}
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#111827] mt-4">
      {/* Banner Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <div className="absolute roud inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" />
        <img 
          src={images[clubData.coverImage] || chess} 
          alt={`${clubData.name} banner`}
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{clubData.name}</h1>
          <p className="text-white/90 max-w-2xl">{clubData.description}</p>
        </div>
      </div>

      {/* Club Details Section */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">About the Club</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {clubData.description}
              </p>
            </motion.div>

            {clubData.activities?.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Activities</h2>
                <ul className="space-y-2">
                  {clubData.activities.map((activity, index) => (
                    <li key={`activity-${index}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 bg-black dark:bg-white rounded-full" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {clubData.achievements?.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Achievements</h2>
                <ul className="space-y-2">
                  {clubData.achievements.map((achievement, index) => (
                    <li key={`achievement-${index}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 bg-black dark:bg-white rounded-full" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Club Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Members</p>
                  <p className="text-lg font-medium text-black dark:text-white">{clubData.memberCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Founded</p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    {new Date(clubData.foundedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Meeting Schedule</p>
                  <p className="text-lg font-medium text-black dark:text-white">{clubData.meetingSchedule}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-lg font-medium text-black dark:text-white">{clubData.location}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm"
            >
              <button 
                className="w-full py-2 px-4 bg-black dark:bg-[#0D9488] text-white rounded-md hover:bg-black/90 dark:hover:bg-[#0D9488]/90 transition-colors"
                onClick={() => console.log('Join club clicked')}
                aria-label="Join club"
              >
                Join Club
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;