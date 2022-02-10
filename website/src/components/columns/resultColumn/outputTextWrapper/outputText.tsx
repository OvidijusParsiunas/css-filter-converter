import { ComponentsAsProp } from '../../../../shared/types/componentAsProp';
import CSS from 'csstype';
import './outputText.css';

type Props = {
  children: ComponentsAsProp;
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
