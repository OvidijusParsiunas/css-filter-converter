import { APP_FADE_IN_ANIMATION_DELAY_ML } from '../../shared/consts/appAppearanceDelays';
import { Animations } from '../../shared/functionality/animations/animations';
import { FadeAnimationClasses } from '../../shared/consts/animationClasses';
// WORK - rename
import CssFilterLogoIcon3 from './cssFilterLogoIcon3';
import npmLogoBlack from './npm-logo-black.png';
import npmLogoRed from './npm-logo-red.png';
import githubLogo from './github-logo.png';
import Settings from './settings/Settings';
import React from 'react';
import './header.css';

export default function Header() {
  const [npmLogoPath, setNpmLogoPath] = React.useState(npmLogoBlack);
  const [fadeInClass, setFadeInClass] = React.useState(FadeAnimationClasses.FADE_OUT);

  Animations.fadeInAfterDelay(setFadeInClass, APP_FADE_IN_ANIMATION_DELAY_ML);

  return (
    <div id="header" className={`header-content ${fadeInClass}`}>
      <div id="css-filter-converter-logo">
        <div id="css-filter-converter-logo-icon">
          <CssFilterLogoIcon3 />
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
