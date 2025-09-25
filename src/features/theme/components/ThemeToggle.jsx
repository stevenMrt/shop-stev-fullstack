import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle} title="Cambiar tema">
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;