import { ComponentAsProp } from '../../../shared/types/componentAsProp';
import './customColorPicker.css';
import React from 'react';
import CSS from 'csstype';

interface Props {
  children: ComponentAsProp;
  callback: () => void;
  callbackActivationCondition: boolean;
  display?: CSS.Property.Display;
}

export default function ClickOutsideListener(props: Props) {
  const { children, callback, callbackActivationCondition, display } = props;
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) {
        callback();
      }
    }

    function handleMouseButton({ key }: KeyboardEvent) {
      if (key === 'Escape' || key === 'Enter') {
        callback();
      }
    }

    // only add listeners when need to activate the callback
    if (callbackActivationCondition) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleMouseButton);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleMouseButton);
      };
    }
    return () => {};
    // adding any property from the parent component allows the callback to get access to the component context
  }, [wrapperRef, callback]);

  return (
    <div style={{ display }} ref={wrapperRef}>
      {children}
    </div>
  );
}

ClickOutsideListener.defaultProps = {
  display: 'inline-block',
};
