import React from 'react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
