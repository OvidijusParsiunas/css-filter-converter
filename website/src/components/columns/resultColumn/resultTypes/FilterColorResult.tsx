import { ComponentAsProp } from '../../../../shared/types/componentAsProp';
import { Animations } from '../../../../shared/functionality/animations';
import { RESULT_FONT_SIZE } from '../../../../shared/consts/styling';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import CopyButtonWrapper from '../copyButton/CopyButtonWrapper';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import React from 'react';

type Props = {
  children: ComponentAsProp;
  resultHeaderTextRef: React.RefObject<HTMLDivElement>;
};

export default function FilterColorResult(props: Props) {
  const { children, resultHeaderTextRef } = props;

  const resultTextState = useSelector<RootReducer, RootReducer['result']['filter']>((state) => state.result.filter);

  return (
    <div>
      <OutputText>
        <ResultHeaderText applyPrefixClasses={!!resultTextState} resultHeaderTextRef={resultHeaderTextRef} />
        <CopyButtonWrapper
          text={resultTextState}
          customClasses={`${Animations.getFadeInClassIfConditionMet(!!resultTextState)}`}
          fontSize={RESULT_FONT_SIZE}
        />
      </OutputText>
      {children}
    </div>
  );
}
