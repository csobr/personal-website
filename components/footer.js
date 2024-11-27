import React from 'react';

const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return <footer> © {getYear()} Siham Hadi</footer>;
};
export default Footer;
