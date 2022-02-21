import { ComponentsAsProp } from '../../../shared/types/componentAsProp';
import React from 'react';
import './column.css';

type Props = {
  children: ComponentsAsProp;
  zIndex?: number;
  columnRef?: React.RefObject<HTMLDivElement> | null;
};

const defaultProps = {
  zIndex: 0,
  columnRef: null,
};

// Current purpose for zIndex is to allow the color picker and switch button to be above the history items,
// yet allow them to still be hovered. This is why it is applied to column-contents and not column div.
export default function Column(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ColumnComponent = React.forwardRef<HTMLDivElement, Props>(({ children, zIndex, columnRef }, ref) => (
    <div ref={columnRef} className="column">
      <div style={{ zIndex }} className="column-contents">
        {children}
      </div>
    </div>
  ));
  ColumnComponent.defaultProps = defaultProps;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ColumnComponent {...props} />;
}

Column.defaultProps = defaultProps;
