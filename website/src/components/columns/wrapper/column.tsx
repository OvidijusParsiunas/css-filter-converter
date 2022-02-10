import { ComponentsAsProp } from '../../../shared/types/componentAsProp';
import './column.css';

type Props = {
  children: ComponentsAsProp;
  width: string;
  zIndex?: number;
};

// Current purpose for zIndex is to allow the color picker and switch button to be above the history items,
// yet allow them to still be hovered. This is why it is applied to column-contents and not column div.
export default function Column(props: Props) {
  const { children, width, zIndex } = props;
  return (
    <div style={{ width }} className="column">
      <div style={{ zIndex }} className="column-contents">
        {children}
      </div>
    </div>
  );
}

Column.defaultProps = {
  zIndex: 0,
};
