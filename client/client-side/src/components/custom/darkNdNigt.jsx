import React from 'react';

const CustomIcon = ({ colorMode = 'dark', size = 256 ,className ='',onClick }) => {
  // Set colors based on the color mode
  const fillColor = colorMode === 'light' ? '#000000' : '#fefefe';

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      version="1.1" 
      width={size} 
      height={size} 
      viewBox="0 0 256 256" 
      xmlSpace="preserve"
      className={className}
      onClick={onClick}
    >
      <g 
        style={{
          stroke: 'none', 
          strokeWidth: 0, 
          fill: fillColor, 
          opacity: 1 
        }} 
        transform="translate(1.4 1.4) scale(2.81 2.81)"
      >
        <path 
          d="M87.823 60.7c-0.463-0.423-1.142-0.506-1.695-0.214c-15.834 8.398-35.266 2.812-44.232-12.718
             c-8.966-15.53-4.09-35.149 11.101-44.665c0.531-0.332 0.796-0.963 0.661-1.574c-0.134-0.612-0.638-1.074-1.259-1.153
             c-9.843-1.265-19.59 0.692-28.193 5.66C13.8 12.041 6.356 21.743 3.246 33.35S1.732 57.08 7.741 67.487
             c6.008 10.407 15.709 17.851 27.316 20.961C38.933 89.486 42.866 90 46.774 90c7.795 0 15.489-2.044 22.42-6.046
             c8.601-4.966 15.171-12.43 18.997-21.586C88.433 61.79 88.285 61.123 87.823 60.7z" 
          style={{
            stroke: 'none', 
            strokeWidth: 1, 
            fillRule: 'nonzero',
          }} 
          strokeLinecap="round" 
        />
      </g>
    </svg>
  );
};

export default CustomIcon;
