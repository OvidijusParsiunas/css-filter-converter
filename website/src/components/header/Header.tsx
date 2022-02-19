import { FadeAnimationClasses } from '../../shared/consts/animationClasses';
import { Animations } from '../../shared/functionality/animations';
import npmLogoBlack from './1920px-Npm-logo-grey.png';
import githubLogo from './GitHub-Mark-32px.png';
import React from 'react';
import './header.css';

export default function Header() {
  const [fadeInClass, setFadeInClass] = React.useState(FadeAnimationClasses.FADE_OUT);
  const fadeInAnimationDelayMl = 1200;
  Animations.fadeInAfterDelay(setFadeInClass, fadeInAnimationDelayMl);

  return (
    <div
      id="header"
      style={{ width: '100%', height: 50, position: 'absolute', top: 5, zIndex: 1 }}
      className={fadeInClass}
    >
      <div style={{ marginLeft: 20, float: 'left', fontSize: 19, color: '#313131' }}>Filter Converter</div>
      <div style={{ float: 'left', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 6, fontSize: 21 }}>{'>'}</div>
        <div style={{ position: 'absolute', color: 'blue', fontSize: 20 }}>{'<'}</div>
      </div>
      <img
        src={npmLogoBlack}
        style={{ width: 50, height: 20, float: 'right', marginRight: 15, marginTop: 4, cursor: 'pointer' }}
        alt=""
      />
      <img
        src={githubLogo}
        style={{
          width: 25,
          height: 25,
          float: 'right',
          marginRight: 10,
          cursor: 'pointer',
          filter:
            // eslint-disable-next-line max-len
            'brightness(0) saturate(100%) invert(49%) sepia(0%) saturate(191%) hue-rotate(347deg) brightness(96%) contrast(93%)',
        }}
        alt=""
      />
    </div>
  );
}
