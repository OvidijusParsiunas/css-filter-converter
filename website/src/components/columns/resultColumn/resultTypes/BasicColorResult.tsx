import CustomColorPicker from '../../inputColumn/customColorPicker/CustomColorPicker';
import { ComponentAsProp } from '../../../../shared/types/componentAsProp';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import './BasicColorResult.css';

type Props = {
  children: ComponentAsProp;
};

export default function BasicColorResult(props: Props) {
  const { children } = props;

  const resultColorState = useSelector<RootReducer, RootReducer['result']['basicColor']>(
    (state) => state.result.basicColor,
  );

  // prettier-ignore
  const getColorPicker = () => (resultColorState.colorString ? (
    <CustomColorPicker state={{ basicColor: resultColorState, isValid: true }} isSelectable={false} />
  ) : null);

  const getResultText = () => (
    <div id="basic-color-result-text-container">
      <div className="basic-color-result-text">
        <ResultHeaderText applyPrefixClasses={!!resultColorState.colorString} />
      </div>
      <div className="basic-color-result-text">
        <div className="result-string-text">{resultColorState.colorString}</div>
      </div>
    </div>
  );

  return (
    <div>
      <OutputText>
        {getResultText()}
        {getColorPicker()}
      </OutputText>
      {children}
    </div>
  );
}

/*
Right side basic color type dropdown
const getBasicColorTypeSelector = () => (
    <ColorTypeSelector
      updateColorCallback={updateResultBasicColor}
      basicColorState={resultColorState}
      customContainerStyling={{ marginRight: 20 }}
      innerValues={[BasicColorTypes.HEX, BasicColorTypes.RGB, BasicColorTypes.HSL]}
    />
  );
*/
