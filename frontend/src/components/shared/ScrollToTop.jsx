// ScrollToTop.js
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsVisible(scrollTop > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 animate-bounce delay-1000 right-8 p-3 bg-black z-999999 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600 transition-all duration-300">
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
