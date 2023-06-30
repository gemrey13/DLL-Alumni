import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DarkModeToggle from '../components/DarkModeToggle';

function Tracer() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Rest of your application */}
      <h1 className="text-black dark:text-white">sakdjas</h1>
    </div>
  );
}

export default Tracer;
