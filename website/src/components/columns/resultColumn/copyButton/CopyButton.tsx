import copyIcon from './copy-svgrepo-com.svg';

// WORK - refactor
interface HistoryItem {
  element: HTMLElement | null;
}

type Props = {
  isDisplayed: boolean;
  textContainerRef: HistoryItem | undefined;
};

export default function CopyButton(props: Props) {
  const { isDisplayed, textContainerRef } = props;

  const onMouseEnterButton = () => {
    if (textContainerRef?.element) textContainerRef.element.style.color = 'black';
  };

  const onMouseLeaveButton = () => {
    if (textContainerRef?.element) textContainerRef.element.style.color = '';
  };

  return (
    <div
      style={{
        position: 'relative',
        transition: '0.2s',
        opacity: isDisplayed ? '1' : '0',
        height: 'auto',
      }}
    >
      <img
        src={copyIcon}
        style={{
          paddingLeft: 5,
          width: 20,
          height: '100%',
          position: 'absolute',
          cursor: isDisplayed ? 'pointer' : '',
          top: '-10%',
          filter:
            // eslint-disable-next-line max-len
            'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(9%) hue-rotate(234deg) brightness(96%) contrast(89%)',
        }}
        alt=""
        onMouseEnter={() => onMouseEnterButton()}
        onMouseLeave={() => onMouseLeaveButton()}
      />
    </div>
  );
}
