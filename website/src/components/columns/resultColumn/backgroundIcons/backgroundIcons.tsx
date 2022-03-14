import BackgroundIcon from '../../../../BackgroundIcon';
import './backgroundIcons.css';

export default function BackgroundIcons() {
  return (
    <div className="background-icon-container">
      <div className="background-icon">
        <BackgroundIcon />
      </div>
      <div className="background-icon">
        <BackgroundIcon />
      </div>
    </div>
  );
}
