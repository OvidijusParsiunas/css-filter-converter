import { FadeAnimationClasses } from '../consts/animationClasses';

export class Animations {
  public static getFadeInClassIfConditionMet(condition: boolean, startClass?: string, finishClass?: string): string {
    const fadeStartClass = startClass || FadeAnimationClasses.FADE_OUT;
    const fadeFinishClass = finishClass || FadeAnimationClasses.FADE_IN;
    return condition ? fadeFinishClass : fadeStartClass;
  }

  public static fadeInAfterDelay(callback: (displayClass: FadeAnimationClasses) => unknown, delayMl: number): void {
    setTimeout(() => {
      callback(FadeAnimationClasses.FADE_IN);
    }, delayMl);
  }

  private static removeTransitionDuration(elements: HTMLElement[], animationDurationMl: number): void {
    elements.forEach((element) => {
      element.style.transition = `${animationDurationMl}ms`;
    });
  }

  private static removeFadeAnimationClasses(elements: HTMLElement[]): void {
    elements.forEach((element) => {
      element.classList.remove(FadeAnimationClasses.FADE_OUT);
      element.classList.remove(FadeAnimationClasses.FADE_IN);
    });
  }

  private static fadeIn(elements: HTMLElement[]): void {
    elements.forEach((element) => {
      element.classList.add(FadeAnimationClasses.FADE_IN);
    });
  }

  private static fadeOut(elements: HTMLElement[]): void {
    elements.forEach((element) => {
      element.classList.add(FadeAnimationClasses.FADE_OUT);
    });
  }

  private static applyTransitionDuration(elements: HTMLElement[], animationDurationMl: number): void {
    elements.forEach((element) => {
      element.style.transition = `${animationDurationMl}ms`;
    });
  }

  public static fadeOutAndFadeIn(
    animationDurationMl: number,
    intermediateCallback: () => void,
    ...elements: HTMLElement[]
  ): void {
    Animations.applyTransitionDuration(elements, animationDurationMl);
    Animations.fadeOut(elements);
    setTimeout(() => {
      intermediateCallback();
      Animations.fadeIn(elements);
      setTimeout(() => {
        Animations.removeFadeAnimationClasses(elements);
        Animations.removeTransitionDuration(elements, animationDurationMl);
      });
    }, animationDurationMl);
  }

  private static changeOpacityStyle(elements: HTMLElement[], opacity: string): void {
    // eslint-disable-next-line no-return-assign
    elements.forEach((element) => (element.style.opacity = opacity));
  }

  public static fadeOutandFadeInOnReactiveComponent(animationDurationMl: number, ...elements: HTMLElement[]): void {
    Animations.changeOpacityStyle(elements, '0');
    setTimeout(() => {
      Animations.applyTransitionDuration(elements, animationDurationMl);
      Animations.changeOpacityStyle(elements, '1');
      setTimeout(() => {
        Animations.removeTransitionDuration(elements, animationDurationMl);
      });
    });
  }
}
