import { ElementRef } from '../../../../shared/types/elementRef';
import clipboardIcon from './clipboard-icon.svg';
import React, { useEffect } from 'react';
import tickIcon from './tick-icon.svg';
import CopyButton from './CopyButton';
import './copyButtonWrapper.css';
import CSS from 'csstype';

type Props = {
  text: string;
  fontSize?: number;
  customClasses?: string;
  marginLeftDelta?: number;
  textToHighlight?: ElementRef | null;
};

export default function CopyButtonWrapper(props: Props) {
  const { textToHighlight, text, customClasses, marginLeftDelta, fontSize } = props;

  const [isCopyIconDisplayed, setIsCopyIconDisplayed] = React.useState(false);
  const [iconMarginLeft, setIconMarginLeft] = React.useState(0);
  // the reason why these two states are managed here instead of the CopyButton component is because when
  // the mouse leaves the tick icon onto the text, we still want to retain it and the tooltip,
  // only when the mouse has left the full wrapper should those two be truly unset
  const [iconPath, setIconPath] = React.useState(clipboardIcon);
  const [isTooltipDisplayed, setIsTooltipDisplayed] = React.useState(false);

  const textContainerRef = React.useRef<HTMLDivElement>(null);

  const changeTextColor = (color: CSS.Property.Color): void => {
    if (textToHighlight?.element) textToHighlight.element.style.color = color;
  };

  const onMouseLeaveText = (): void => {
    changeTextColor('grey');
    setIsCopyIconDisplayed(false);
  };

  const onMouseEnterText = (): void => {
    changeTextColor('black');
    if (text) setIsCopyIconDisplayed(true);
    if (textContainerRef.current) {
      let newIconMarginLeft = textContainerRef.current.offsetWidth / 2 + 10;
      if (marginLeftDelta) newIconMarginLeft += marginLeftDelta;
      setIconMarginLeft(newIconMarginLeft);
    }
  };

  const handleCopy = (): void => {
    setIconPath(tickIcon);
    setIsTooltipDisplayed(true);
    setTimeout(() => setIsTooltipDisplayed(false), 600);
  };

  const unsetTickIcon = (): void => {
    setIconPath(clipboardIcon);
    setIsTooltipDisplayed(false);
  };

  const unsetCopyIconWhenMouseLeftWrapper = (): void => {
    // when the user moves mouse from icon to text - mouse leave is triggered, however mouse enter is immediately tiggered
    // after that, in order to prevent the unsetting of copy until the user has left the button wrapper we use a settimeout
    // to make sure that the mouse has actually left it for good
    setTimeout(() => {
      if (!isCopyIconDisplayed && iconPath === tickIcon) unsetTickIcon();
    });
  };

  useEffect(() => {
    unsetCopyIconWhenMouseLeftWrapper();
  }, [isCopyIconDisplayed]);

  return (
    <div>
      <div
        className="copy-button-wrapper-contents"
        onMouseEnter={() => onMouseEnterText()}
        onMouseLeave={() => onMouseLeaveText()}
      >
        {/* used strictly for retrieving the wrapped text box width */}
        <span ref={textContainerRef} style={{ fontSize: `${fontSize}px` }} className="text-no-whitespace">
          {text}
        </span>
        {/* the reason why this is in a different div is because this overlays mouse events - stopping the user from
            being able to highlight text */}
        <div className="text-with-whitespace">
          {/* it is important that the CopyButton component has z-index set to 1 or higher as the next div would
              overlay all of the mouse events to it */}
          <CopyButton
            textContainerRef={textContainerRef}
            isDisplayed={isCopyIconDisplayed}
            marginLeft={iconMarginLeft}
            text={text}
            iconPath={iconPath}
            handleCopy={handleCopy}
            isTooltipDisplayed={isTooltipDisplayed}
            iconImageSpecificClass={iconPath === clipboardIcon ? 'clipboard-copy-icon' : ''}
          />
        </div>
        {/* this is the actual text that the user can highlight with their mouse */}
        <div style={{ fontSize: `${fontSize}px` }} className={`text-with-whitespace ${customClasses}`}>
          {text}
        </div>
      </div>
      {/* used to trigger the display of the copy icon when hovered over the place where
          it is meant to be before it has marginLeft set */}
      <div className="copy-button-wrapper-contents">
        <div
          style={{ width: 20 + (marginLeftDelta || 0) }}
          className="icon-placeholder"
          onMouseEnter={() => onMouseEnterText()}
          onMouseLeave={() => onMouseLeaveText()}
        />
      </div>
    </div>
  );
}

CopyButtonWrapper.defaultProps = {
  fontSize: 16,
  customClasses: '',
  marginLeftDelta: 0,
  textToHighlight: null,
};
