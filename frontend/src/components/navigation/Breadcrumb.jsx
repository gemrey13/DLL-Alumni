import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
  const pageName = props.url;
  return (
    <nav className="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center text-blue-500">
          <Link to="/Home" className="text-gray-600 dark:text-gray-300 transition-transform duration-200 hover:scale-105">
            Home
          </Link>
          <svg className={`${pageName == 'Home'? 'hidden': ''} fill-current w-3 h-3 mx-3`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          </svg>
        </li>
        <li className={`${pageName == 'Home'? 'hidden': ''} flex items-center`}>
          <Link to={`/${pageName}`} className="text-gray-500 dark:text-gray-400 transition-transform duration-200 hover:scale-105">
            {pageName}
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
