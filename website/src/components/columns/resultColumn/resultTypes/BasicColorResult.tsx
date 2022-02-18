import CustomColorPicker from '../../inputColumn/customColorPicker/CustomColorPicker';
import { ComponentAsProp } from '../../../../shared/types/componentAsProp';
import { Animations } from '../../../../shared/functionality/animations';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import './BasicColorResult.css';
import React from 'react';

type Props = {
  children: ComponentAsProp;
  resultHeaderTextRef: React.RefObject<HTMLDivElement>;
};

export default function BasicColorResult(props: Props) {
  const { children, resultHeaderTextRef } = props;

  const resultColorState = useSelector<RootReducer, RootReducer['result']['basicColor']>(
    (state) => state.result.basicColor,
  );

  const resultColorStringState = useSelector<RootReducer, RootReducer['result']['basicColor']['colorString']>(
    (state) => state.result.basicColor.colorString,
  );

  // prettier-ignore
  const getColorPicker = () => (resultColorStringState ? (
    <CustomColorPicker state={{ basicColor: resultColorState, isValid: true }} isSelectable={false} />
  ) : null);

  const getResultText = () => (
    <div id="basic-color-result-text-container">
      <div className="basic-color-result-text">
        <ResultHeaderText applyPrefixClasses={!!resultColorStringState} resultHeaderTextRef={resultHeaderTextRef} />
      </div>
      <div className="basic-color-result-text">
        <div className={`result-string-text ${Animations.getFadeInClassIfConditionMet(!!resultColorStringState)}`}>
          {resultColorStringState}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <OutputText>
        {getResultText()}
        <div className={Animations.getFadeInClassIfConditionMet(!!resultColorStringState)}>{getColorPicker()}</div>
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
