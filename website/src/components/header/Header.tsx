import { FadeAnimationClasses } from '../../shared/consts/animationClasses';
import { Animations } from '../../shared/functionality/animations';
import npmLogoBlack from './1920px-Npm-logo-grey.png';
import npmLogoRed from './1920px-Npm-logo.svg.png';
import githubLogo from './GitHub-Mark-32px.png';
import cogIcon from './cogwheel-outline-svgrepo-com.svg';
import React from 'react';
import './header.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Icon3 from './Icon3';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Icon2 from './Icon2';

// WORK remove "@mui/icons-material": "^5.4.2",
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../state/rootReducer';
import { toggleContrast, toggleIconMode } from '../../state/settings/actions';
import { IconModePanelUtils } from '../columns/middleColumn/iconModePanel/iconModePanelUtils';

// WORK - do not display icon mode panel when converting from filter to color
// Disable dropdown button - tooltip why disabled
export default function Header() {
  const settingsState = useSelector<RootReducer, RootReducer['settings']>((state) => state.settings);
  const activeInputTypeState = useSelector<RootReducer, RootReducer['input']['activeType']>(
    (state) => state.input.activeType,
  );

  const dispatch = useDispatch();

  const [fadeInClass, setFadeInClass] = React.useState(FadeAnimationClasses.FADE_OUT);
  const anchorRef = React.useRef<HTMLImageElement>(null);
  const fadeInAnimationDelayMl = 1200;
  Animations.fadeInAfterDelay(setFadeInClass, fadeInAnimationDelayMl);

  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClick = (value: string) => {
    if (value === 'Contrast') {
      dispatch(toggleContrast());
    } else if (value === 'Icon Mode') {
      dispatch(toggleIconMode());
    }
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [npmLogoPath, setNpmLogoPath] = React.useState(npmLogoBlack);

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
        alt=""
        onMouseEnter={() => setNpmLogoPath(npmLogoRed)}
        onMouseLeave={() => setNpmLogoPath(npmLogoBlack)}
      />
      <img className="header-content generic-header-logo" src={githubLogo} alt="" />
      <img
        className="header-content generic-header-logo"
        src={cogIcon}
        alt=""
        ref={anchorRef}
        onClick={handleToggle}
        aria-hidden="true"
      />
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom" transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'top' : 'top',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={(e) => handleListKeyDown(e)}
                >
                  <MenuItem onClick={() => handleClick('Contrast')}>
                    <Checkbox checked={settingsState.isContrastOn} />
                    <ListItemText primary="Contrast" />
                  </MenuItem>
                  <MenuItem
                    id="icon-mode-dropdown-item"
                    onClick={() => handleClick('Icon Mode')}
                    disabled={!IconModePanelUtils.isIsDisplayed(activeInputTypeState)}
                  >
                    <Checkbox checked={settingsState.isIconModeOn} />
                    <ListItemText primary="Icon Mode" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

// import { FadeAnimationClasses } from '../../shared/consts/animationClasses';
// import { Animations } from '../../shared/functionality/animations';
// import npmLogoBlack from './1920px-Npm-logo-grey.png';
// import npmLogoRed from './1920px-Npm-logo.svg.png';
// import githubLogo from './GitHub-Mark-32px.png';
// import cogIcon from './cogwheel-outline-svgrepo-com.svg';
// import React from 'react';
// import './header.css';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Icon3 from './Icon3';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Icon2 from './Icon2';

// // WORK remove "@mui/icons-material": "^5.4.2",
// import Grow from '@mui/material/Grow';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Checkbox from '@mui/material/Checkbox';
// import ListItemText from '@mui/material/ListItemText';

// // WORK - refactor
// export default function Header() {
//   const [fadeInClass, setFadeInClass] = React.useState(FadeAnimationClasses.FADE_OUT);
//   const anchorRef = React.useRef<HTMLImageElement>(null);
//   const fadeInAnimationDelayMl = 1200;
//   Animations.fadeInAfterDelay(setFadeInClass, fadeInAnimationDelayMl);

//   const [open, setOpen] = React.useState(false);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event: Event | React.SyntheticEvent) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
//       return;
//     }

//     setOpen(false);
//   };

//   function handleListKeyDown(event: React.KeyboardEvent) {
//     if (event.key === 'Tab') {
//       event.preventDefault();
//       setOpen(false);
//     } else if (event.key === 'Escape') {
//       setOpen(false);
//     }
//   }
//   const prevOpen = React.useRef(open);

//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current!.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   const [npmLogoPath, setNpmLogoPath] = React.useState(npmLogoBlack);

//   return (
//     <div id="header" className={fadeInClass}>
//       {/* <div style={{ marginLeft: 20, float: 'left', fontSize: 19, color: '#313131' }}>Filter Converter</div>
//       <div style={{ float: 'left', position: 'relative' }}>
//         <div style={{ position: 'absolute', top: 6, fontSize: 21 }}>{'>'}</div>
//         <div style={{ position: 'absolute', color: 'blue', fontSize: 20 }}>{'<'}</div>
//       </div> */}
//       <div style={{ marginLeft: 5, width: 170, height: 100, float: 'left' }}>
//         <Icon2 />
//       </div>
//       <img
//         id="npm-logo"
//         src={npmLogoPath}
//         alt=""
//         onMouseEnter={() => setNpmLogoPath(npmLogoRed)}
//         onMouseLeave={() => setNpmLogoPath(npmLogoBlack)}
//       />
//       <img id="generic-header-logo" src={githubLogo} alt="" />
//       <img id="generic-header-logo" src={cogIcon} alt="" ref={anchorRef} onClick={handleToggle} aria-hidden="true" />
//       <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom" transition disablePortal>
//         {({ TransitionProps, placement }) => (
//           <Grow
//             // eslint-disable-next-line react/jsx-props-no-spreading
//             {...TransitionProps}
//             style={{
//               transformOrigin: placement === 'bottom-start' ? 'top' : 'top',
//             }}
//           >
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MenuList
//                   id="composition-menu"
//                   aria-labelledby="composition-button"
//                   onKeyDown={(e) => handleListKeyDown(e)}
//                 >
//                   <MenuItem>
//                     <Checkbox checked />
//                     Contrast
//                   </MenuItem>
//                   <MenuItem>
//                     <Checkbox checked={false} />
//                     <ListItemText primary="Icon Mode" />
//                   </MenuItem>
//                 </MenuList>
//               </ClickAwayListener>
//             </Paper>
//           </Grow>
//         )}
//       </Popper>
//     </div>
//   );
// }
