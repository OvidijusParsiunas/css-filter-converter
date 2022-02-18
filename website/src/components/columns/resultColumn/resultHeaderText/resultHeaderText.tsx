import './resultHeaderText.css';

type Props = {
  prefixClasses?: string[];
  applyPrefixClasses?: boolean;
  resultHeaderTextRef?: React.RefObject<HTMLDivElement>;
};

export default function ResultHeaderText(props: Props) {
  const { prefixClasses, applyPrefixClasses, resultHeaderTextRef } = props;

  function getClasses(): string {
    return applyPrefixClasses ? `prefix-result-header-text ${prefixClasses?.join(' ')}` : '';
  }

  return (
    <div ref={resultHeaderTextRef} className={`result-header-text ${getClasses()}`}>
      Result:
    </div>
  );
}

ResultHeaderText.defaultProps = {
  prefixClasses: [],
  applyPrefixClasses: true,
  resultHeaderTextRef: null,
};
