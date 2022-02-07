import { ReactChild } from 'react';
import './column.css';

export default function Column(props: { children: ReactChild; width: string }) {
  const { children, width } = props;
  return (
    <div className="column" style={{ width }}>
      <div className="column-contents">{children}</div>
    </div>
  );
}