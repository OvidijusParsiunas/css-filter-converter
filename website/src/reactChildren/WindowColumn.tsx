import { ReactChild, ReactFragment, ReactPortal } from 'react';
import './windowColumn.css';

type ReactChildren = boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;

function WindowColumn(props: { children: ReactChildren; transformXValue: string }) {
  const { children, transformXValue } = props;
  return (
    <div className="window-column">
      <div className="window-column-contents" style={{ transform: `translate(${transformXValue}, -50%)` }}>
        {children}
      </div>
    </div>
  );
}

export default WindowColumn;
