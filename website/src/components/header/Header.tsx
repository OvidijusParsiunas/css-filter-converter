import { HEADER_FADE_IN_ANIMATION_DELAY_ML } from '../../shared/consts/appAppearanceDelays';
import { Animations } from '../../shared/functionality/animations/animations';
import { FadeAnimationClasses } from '../../shared/consts/animationClasses';
import npmLogoBlack from './npm-logo-black.png';
import npmLogoRed from './npm-logo-red.png';
import githubLogo from './github-logo.png';
import Settings from './settings/Settings';
import Icon2 from './Icon2';
import React from 'react';
import './header.css';

export default function Header() {
  const [npmLogoPath, setNpmLogoPath] = React.useState(npmLogoBlack);
  const [fadeInClass, setFadeInClass] = React.useState(FadeAnimationClasses.FADE_OUT);

  Animations.fadeInAfterDelay(setFadeInClass, HEADER_FADE_IN_ANIMATION_DELAY_ML);

  return (
    <div id="header" className={`header-content ${fadeInClass}`}>
      {/* <div style={{ marginLeft: 20, float: 'left', fontSize: 19, color: '#313131' }}>Filter Converter</div>
      <div style={{ float: 'left', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 6, fontSize: 21 }}>{'>'}</div>
        <div style={{ position: 'absolute', color: 'blue', fontSize: 20 }}>{'<'}</div>
      </div> */}
      <div style={{ marginLeft: 5, width: 170, height: 100, float: 'left' }}>
        <Icon2 />
      </div>
      <img
        id="npm-logo"
        className="header-content"
        src={npmLogoPath}
        onMouseEnter={() => setNpmLogoPath(npmLogoRed)}
        onMouseLeave={() => setNpmLogoPath(npmLogoBlack)}
        alt=""
      />
      {/* this is highlighted by native :hover css selector */}
      <img className="header-content generic-header-logo" src={githubLogo} alt="" />
      <Settings />
    </div>
  );
}
