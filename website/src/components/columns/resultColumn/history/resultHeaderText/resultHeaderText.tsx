import './resultHeaderText.css';

type Props = {
  prefixClasses?: string[];
  applyPrefixClasses?: boolean;
};

export default function ResultHeaderText(props: Props) {
  const { prefixClasses, applyPrefixClasses } = props;

  function getClasses(): string {
    return applyPrefixClasses ? `prefix-result-header-text ${prefixClasses?.join(' ')}` : '';
  }

  return <div className={`result-header-text ${getClasses()}`}>Result:</div>;
}

ResultHeaderText.defaultProps = {
  prefixClasses: [],
  applyPrefixClasses: true,
};
