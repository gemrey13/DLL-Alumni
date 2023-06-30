import React, { useState, useEffect } from 'react';

const Sample = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Add event listener to detect system-level dark mode preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    const handleChange = (event) => {
      setDarkMode(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Clean up the event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex">
        <h1 className="dark:text-gray-100 dark:bg-slate-900 duration-100 underline">Hello</h1>
        <h1 className="dark:text-gray-100 dark:bg-slate-900 duration-100">World</h1>
      </div>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
};

export default Sample;
