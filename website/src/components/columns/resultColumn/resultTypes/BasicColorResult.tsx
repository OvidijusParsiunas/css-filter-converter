import CustomColorPicker from '../../../../shared/components/customColorPicker/CustomColorPicker';
import { Animations } from '../../../../shared/functionality/animations/animations';
import { ComponentAsProp } from '../../../../shared/types/componentAsProp';
import { RESULT_FONT_SIZE } from '../../../../shared/consts/styling';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import CopyButtonWrapper from '../copyButton/CopyButtonWrapper';
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

  const resultColorStringState = useSelector<RootReducer, RootReducer['result']['basicColor']['inputColorString']>(
    (state) => state.result.basicColor.inputColorString,
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
        <CopyButtonWrapper
          text={resultColorStringState}
          customClasses={`${Animations.getFadeInClassIfConditionMet(!!resultColorStringState)}`}
          fontSize={RESULT_FONT_SIZE}
          marginLeftDelta={60}
        />
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
