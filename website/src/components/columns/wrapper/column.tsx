import { ComponentsAsProp } from '../../../shared/types/componentAsProp';
import React from 'react';
import './column.css';

type Props = {
  children: ComponentsAsProp;
  zIndex?: number;
};

// Current purpose for zIndex is to allow the color picker and switch button to be above the history items,
// yet allow them to still be hovered. This is why it is applied to column-contents and not column div.
const Column = React.forwardRef<HTMLDivElement, Props>(({ children, zIndex }, ref) => (
  <div ref={ref} className="column">
    <div style={{ zIndex }} className="column-contents">
      {children}
    </div>
  </div>
));

Column.defaultProps = {
  zIndex: 0,
};

export default Column;
