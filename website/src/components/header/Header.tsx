import { FadeAnimationClasses } from '../../shared/consts/animationClasses';
import { Animations } from '../../shared/functionality/animations';
import npmLogoBlack from './1920px-Npm-logo-grey.png';
import githubLogo from './GitHub-Mark-32px.png';
import React from 'react';

export default function Header() {
  const [fadeInClass, setFadeInClass] = React.useState(FadeAnimationClasses.FADE_OUT);
  const fadeInAnimationDelayMl = 1000;
  Animations.fadeInAfterDelay(setFadeInClass, fadeInAnimationDelayMl);

  return (
    <div style={{ width: '100%', height: 50, position: 'absolute', top: 5, zIndex: 1 }} className={fadeInClass}>
      <div style={{ marginLeft: 20, float: 'left', fontSize: 19, color: '#313131' }}>Filter Converter</div>
      <div style={{ float: 'left', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 6, fontSize: 21 }}>{'>'}</div>
        <div style={{ position: 'absolute', color: 'blue', fontSize: 20 }}>{'<'}</div>
      </div>
      <img src={npmLogoBlack} style={{ width: 56, height: 24, float: 'right', marginRight: 10, marginTop: 3 }} alt="" />
      <img
        src={githubLogo}
        style={{
          width: 28,
          height: 28,
          float: 'right',
          marginRight: 10,
          filter:
            // eslint-disable-next-line operator-linebreak
            'brightness(0) saturate(100%) invert(67%) sepia(0%)' +
            'saturate(221%) hue-rotate(56deg) brightness(98%) contrast(93%)',
        }}
        alt=""
      />
    </div>
  );
}
