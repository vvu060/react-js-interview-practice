import React from 'react';
import './utility.css';

const TailwindTest: React.FC = () => {
  return (
    <div>
      {/* This is styled with inline styles */}
      <div
        style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: 'blue',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '24px',
        }}
      >
        This box is styled with inline styles
      </div>

      {/* This should be styled with Tailwind */}
      <div className='p-5 m-5 bg-red-500 text-white rounded-lg font-bold text-2xl'>
        This box should be styled with Tailwind
      </div>

      {/* This is styled with a utility class */}
      <div className='test-box'>This box is styled with a utility class</div>
    </div>
  );
};

export default TailwindTest;
