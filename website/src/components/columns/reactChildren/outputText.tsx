import { ReactChild } from 'react';
import CSS from 'csstype';
import './outputText.css';

// WORK 1 - refactor
type Props = {
  children: (ReactChild | null) | (ReactChild | null)[];
  float?: CSS.Property.Float;
  width?: CSS.Property.Width;
};

export default function OutputText(props: Props) {
  const { children, float, width } = props;
  return (
    <div style={{ float, width }} className="output-text-item-content-centering">
      <div className="output-text-item output-text-item-content-centering">{children}</div>
    </div>
  );
}

OutputText.defaultProps = {
  float: 'none',
  width: 'unset',
};
