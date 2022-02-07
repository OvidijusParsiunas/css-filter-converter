import './resultHeaderText.css';

type Props = {
  classes?: string[];
  applyClasses?: boolean;
};

export default function ResultHeaderText(props: Props) {
  const { classes, applyClasses } = props;

  return <div className={applyClasses ? `result-header-text ${classes?.join(' ')}` : ''}>Result:</div>;
}

ResultHeaderText.defaultProps = {
  classes: [],
  applyClasses: true,
};
