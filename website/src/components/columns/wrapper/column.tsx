import { ComponentAsProp } from '../../../shared/types/componentAsProp';
import './column.css';

export default function Column(props: { children: ComponentAsProp; width: string }) {
  const { children, width } = props;
  return (
    <div className="column" style={{ width }}>
      <div className="column-contents">{children}</div>
    </div>
  );
}
