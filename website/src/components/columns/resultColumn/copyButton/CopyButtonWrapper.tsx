import { ElementRef } from '../../../../shared/types/elementRef';
import CopyButton from './CopyButton';
import './copyButtonWrapper.css';
import CSS from 'csstype';
import React from 'react';

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
    setIsCopyIconDisplayed(true);
    if (textContainerRef.current) {
      let newIconMarginLeft = textContainerRef.current.offsetWidth / 2 + 10;
      if (marginLeftDelta) newIconMarginLeft += marginLeftDelta;
      setIconMarginLeft(newIconMarginLeft);
    }
  };

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
