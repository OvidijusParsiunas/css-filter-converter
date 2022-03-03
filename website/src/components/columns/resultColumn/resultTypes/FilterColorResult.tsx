import { SheenUtil as CssFilterConverterSheenUtil } from 'css-filter-converter/lib/shared/functionality/sheen/sheenUtil';
import { Animations } from '../../../../shared/functionality/animations/animations';
import { ComponentAsProp } from '../../../../shared/types/componentAsProp';
import { RESULT_FONT_SIZE } from '../../../../shared/consts/styling';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import CopyButtonWrapper from '../copyButton/CopyButtonWrapper';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import { SheenUtil } from './sheenUtil';
import React from 'react';

type Props = {
  children: ComponentAsProp;
  resultHeaderTextRef: React.RefObject<HTMLDivElement>;
};

export default function FilterColorResult(props: Props) {
  const { children, resultHeaderTextRef } = props;

  const resultTextState = useSelector<RootReducer, RootReducer['result']['filter']>((state) => state.result.filter);
  const settingsState = useSelector<RootReducer, RootReducer['settings']>((state) => state.settings);

  const getText = () => (resultTextState ? SheenUtil.removeSheen(resultTextState) : '');

  // eslint-disable-next-line arrow-body-style
  const getSheenPrefix = () => {
    return resultTextState && settingsState.isSheenAdded ? `${CssFilterConverterSheenUtil.SHEEN_FILTER_PREFIX} ` : null;
  };

  const isSheenHighlighted = () => settingsState.isSheenHovered && settingsState.isSheenAdded;

  return (
    <div>
      <OutputText>
        <ResultHeaderText applyPrefixClasses={!!resultTextState} resultHeaderTextRef={resultHeaderTextRef} />
        <CopyButtonWrapper
          text={getText()}
          customClasses={`${Animations.getFadeInClassIfConditionMet(!!resultTextState)}`}
          fontSize={RESULT_FONT_SIZE}
          prefix={getSheenPrefix()}
          isPrefixHighlighted={isSheenHighlighted()}
        />
      </OutputText>
      {children}
    </div>
  );
}
