import React, { useState, useEffect } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiCalendar,
  FiMail,
  FiPhone,
  FiClock,
  FiSun,
  FiMoon
} from 'react-icons/fi';



function UserCard() {

  const [userData, setUserData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  // Fetch user data from API 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('');
        const data = await response.json();
        setUserData(data.results[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  // Display a loading message until user data is available
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }


  // format date strings in a readable format
  const formatDate = (date) => new Date(date).toLocaleDateString();



  //color based on dark mode state
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';

  const cardShadow = darkMode
    ? 'shadow-lg'
    : 'shadow-[7px_7px_15px_#d1d9e6,-7px_-7px_15px_#ffffff]';

  const toggleIconColor = darkMode ? 'text-white' : 'text-black';

  return (
    <div className={`relative flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>



      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="p-2 focus:outline-none"
        >
          {darkMode ? (
            <FiSun size={24} className={toggleIconColor} />
          ) : (
            <FiMoon size={24} className={toggleIconColor} />
          )}
        </button>
      </div>




      {/* Main Card Container */}
      <div className={`group relative ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} rounded-xl p-6
                       w-full max-w-xs sm:max-w-md md:max-w-lg
                       ${cardShadow}
                       transition-transform duration-700 transform hover:scale-105`}>


        {/* Red Dot */}
        <div className="absolute top-4 left-4 w-5 h-5 bg-[#ff512f] rounded-full
                        transition-all duration-300 group-hover:scale-125"></div>


        <div className="flex flex-col items-center">
          {/* Profile Picture Section*/}
          <img 
            src={userData.picture.large} 
            alt={`${userData.name.first} ${userData.name.last}`} 
            className="w-32 h-32 rounded-full mb-4 object-cover border border-[#ff512f]
                       transition-transform duration-700 transform group-hover:scale-110"
          />


          {/* User Name */}
          <h2 className="text-2xl font-bold text-center">
            {userData.name.title} {userData.name.first} {userData.name.last}
          </h2>


          {/* Location */}
          <p className={`mt-2 text-sm ${textSecondary} font-light`}>
            {userData.location.city}, {userData.location.country}
          </p>
          

          {/* Collapsed State*/}
          {!expanded && (
            <div className={`mt-4 w-full text-sm ${textSecondary} font-light pl-10`}>

              {/* First Row: Gender and Date of Birth */}
              <div className="grid grid-cols-2 gap-x-4">
                <div className="flex items-center gap-1 text-left">
                  <FiUser className="text-current" />
                  <span className="whitespace-nowrap">Gender: {userData.gender}</span>
                </div>
                <div className="flex items-center gap-1 text-left">
                  <FiCalendar className="text-current" />
                  <span className="whitespace-nowrap">DOB: {formatDate(userData.dob.date)}</span>
                </div>
              </div>

              {/* Second Row: Email and Phone */}
              <div className="grid grid-cols-2 gap-x-4 mt-2">
                <div className="flex items-center gap-1 text-left">
                  <FiMail className="text-current" />
                  <span className="truncate whitespace-nowrap" title={userData.email}>
                    Email: {userData.email}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-left">
                  <FiPhone className="text-current" />
                  <span className="truncate whitespace-nowrap" title={userData.phone}>
                    Phone: {userData.phone}
                  </span>
                </div>
              </div>
            </div>
          )}




          {/* Expanded State */}
          {expanded && (
            <div className={`mt-6 w-full text-sm ${textSecondary}`}>

              {/* Divider*/}
              <div className="border-t border-red-500"></div>
              <div className="mt-4 space-y-2">
                
                {/* Username */}
                <div className="flex items-center gap-2 font-light">
                  <FiUser className="text-current" />
                  <span>Username: {userData.login.username}</span>
                </div>

                {/* Address Information */}
                <div className="flex items-center gap-2 font-light">
                  <FiMail className="text-current" />
                  <span>
                    Address: {userData.location.street.number} {userData.location.street.name}, {userData.location.city}, {userData.location.state}, {userData.location.country}, {userData.location.postcode}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="mt-4 border-t border-red-500"></div>
              <div className="mt-4">

                {/* Registration Details */}
                <div className="flex items-center gap-2 font-light">
                  <FiClock className="text-current" />
                  <span>
                    Registration: {formatDate(userData.registered.date)} - {userData.registered.age} years
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>


        {/* Toggle Button */}
        <div className="w-full flex justify-end mt-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-[#ff512f] focus:outline-none"
            aria-label="Toggle Additional Details"
          >
            {expanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;