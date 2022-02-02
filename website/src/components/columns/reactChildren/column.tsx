import { ReactChild } from 'react';
import './column.css';

function Column(props: { children: ReactChild; transformXValue: string }) {
  const { children, transformXValue } = props;
  return (
    <div className="column">
      <div className="column-contents" style={{ transform: `translate(${transformXValue}, -50%)` }}>
        {children}
      </div>
    </div>
  );
}

export default Column;
