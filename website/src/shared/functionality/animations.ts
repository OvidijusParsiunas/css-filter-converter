export class Animations {
  public static readonly FADE_IN_START_CLASS = 'fade-in-start';

  public static readonly FADE_IN_FINISH_CLASS = 'fade-in-finish';

  public static getFadeInClassIfConditionMet(condition: boolean): string {
    return condition ? Animations.FADE_IN_FINISH_CLASS : Animations.FADE_IN_START_CLASS;
  }

  public static fadeInAfterDelay(callback: (displayClass: string) => unknown, delayMl: number): void {
    setTimeout(() => {
      callback(Animations.FADE_IN_FINISH_CLASS);
    }, delayMl);
  }

  private static removeTransitionDuration(elements: HTMLElement[], animationDurationMl: number): void {
    elements.forEach((element) => {
      element.style.transition = `${animationDurationMl}ms`;
    });
  }

  private static removeFadeAnimationClasses(elements: HTMLElement[]): void {
    elements.forEach((element) => {
      element.classList.remove(Animations.FADE_IN_START_CLASS);
      element.classList.remove(Animations.FADE_IN_FINISH_CLASS);
    });
  }

  private static fadeIn(elements: HTMLElement[]): void {
    elements.forEach((element) => {
      element.classList.add(Animations.FADE_IN_FINISH_CLASS);
    });
  }

  private static fadeOut(elements: HTMLElement[]): void {
    elements.forEach((element) => {
      element.classList.add(Animations.FADE_IN_START_CLASS);
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
}
