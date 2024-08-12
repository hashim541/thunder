'use client';
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const themes = ['light', 'dark'];

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handelClick = () => {
    let currentIndex = themes.indexOf(theme)
    let index;
    if(currentIndex == themes.length - 1){
        index = 0
    }else {
        index = currentIndex+1
    }
    setTheme(themes[index])
  }

  const getIcon = (theme: string) => {
    switch (theme) {
      case 'light':
        return <FaSun width={30} height={30} />;
      case 'dark':
        return <FaMoon width={30} height={30} />;
      default:
        return <FaSun width={30} height={30} />;
    }
  };

  return (
      <button className='text-text p-1 text-xl'
          onClick={() => handelClick()}
      >
        {getIcon(theme)}
      </button>
  );
};

export default ThemeToggle;
