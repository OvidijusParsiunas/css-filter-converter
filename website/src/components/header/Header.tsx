import { FadeAnimationClasses } from '../../shared/consts/animationClasses';
import { Animations } from '../../shared/functionality/animations';
import npmLogoBlack from './1920px-Npm-logo-grey.png';
import npmLogoRed from './1920px-Npm-logo.svg.png';
import githubLogo from './GitHub-Mark-32px.png';
import React from 'react';
import './header.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Icon3 from './Icon3';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Icon2 from './Icon2';

// WORK - refactor
export default function Header() {
  const [fadeInClass, setFadeInClass] = React.useState(FadeAnimationClasses.FADE_OUT);
  const fadeInAnimationDelayMl = 1200;
  Animations.fadeInAfterDelay(setFadeInClass, fadeInAnimationDelayMl);

  const [npmLogoPath, setNpmLogoPath] = React.useState(npmLogoBlack);

  return (
    <div id="header" className={fadeInClass}>
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
        src={npmLogoPath}
        alt=""
        onMouseEnter={() => setNpmLogoPath(npmLogoRed)}
        onMouseLeave={() => setNpmLogoPath(npmLogoBlack)}
      />
      <img id="github-logo" src={githubLogo} alt="" />
    </div>
  );
}
