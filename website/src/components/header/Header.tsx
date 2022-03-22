import CssFilterLogoIcon from './icons/CssFilterLogoIcon';
import npmLogoBlack from './icons/npm-logo-black.png';
import npmLogoRed from './icons/npm-logo-red.png';
import githubLogo from './icons/github-logo.png';
import Settings from './settings/Settings';
import React from 'react';
import './header.css';

export default function Header() {
  const [npmLogoPath, setNpmLogoPath] = React.useState(npmLogoBlack);

  return (
    <div id="header" className="header-content">
      <div id="css-filter-converter-logo">
        <div id="css-filter-converter-logo-container">
          <div id="css-filter-converter-logo-text">
            <span style={{ color: '#476595' }}>CSS</span>
            <span style={{ marginLeft: 2, color: '#26416e' }}>Filter</span>
            <span style={{ marginLeft: 1, color: '#1d3051' }}>Con</span>
            <span>verter</span>
          </div>
          <div id="css-filter-converter-logo-icon">
            <CssFilterLogoIcon />
          </div>
        </div>
      </div>
      <a href="https://www.npmjs.com/package/css-filter-converter" target="_blank" rel="noreferrer">
        <img
          id="npm-logo"
          className="header-content"
          src={npmLogoPath}
          onMouseEnter={() => setNpmLogoPath(npmLogoRed)}
          onMouseLeave={() => setNpmLogoPath(npmLogoBlack)}
          alt=""
        />
      </a>
      {/* this is highlighted by native :hover css selector */}
      <a href="https://github.com/OvidijusParsiunas/css-filter-converter" target="_blank" rel="noreferrer">
        <img id="github-logo" className="header-content generic-header-logo" src={githubLogo} alt="" />
      </a>
      <Settings />
    </div>
  );
}

// shadow
// height: 45px;
// box-shadow: 0px 7px 20px 0px rgb(234 234 234);
// top: 0px;
// background-color: #f8f8f8;

// gentle border
// border-bottom: 1px solid #eeeeee;
// height: 38px;
