import { ErrorHandling } from 'css-filter-converter/lib/shared/functionality/errorHandling/errorHandling';
import { ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ColorConversionTypes } from '../../../../../../shared/types/basicColorFactory';
import { UnexpectedError } from 'css-filter-converter/lib/shared/types/unexpectedError';
import { ErrorHandlerI } from '../../../../../../shared/types/errorHandlerI';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';

export abstract class BasicColor {
  protected abstract _colorType: BasicColorTypes;

  protected abstract _defaultColorString: string;

  protected abstract _inputColorString: string;

  protected abstract _validCssColorString: string;

  protected abstract _parseResult: ColorConversionTypes | null;

  protected abstract parse(processedString: string): ParseResult<ColorConversionTypes>;

  protected abstract setValicCssColorStringUsingParsedResult(): void;

  protected abstract convert(newColorType: BasicColorTypes): ColorConversionTypes;

  protected abstract formatResult(conversionResult: ColorConversionTypes): string;

  get colorType(): BasicColorTypes {
    return this._colorType;
  }

  get defaultColorString(): string {
    return this._defaultColorString;
  }

  get inputColorString(): string {
    return this._inputColorString;
  }

  get parseResult(): ColorConversionTypes | null {
    return this._parseResult;
  }

  get validCssColorString(): string {
    return this._validCssColorString;
  }

  public setAndParseColorString(inputColorString: string, errorHandler: ErrorHandlerI, displayError = true): void {
    this._inputColorString = inputColorString;
    const parseResult = this.parse(inputColorString.trim().toLocaleLowerCase());
    if (ErrorHandling.hasError(parseResult)) {
      if (displayError) errorHandler.displayError(parseResult.errorMessage);
      this._parseResult = null;
    } else {
      this._parseResult = parseResult.color;
      this.setValicCssColorStringUsingParsedResult();
    }
  }

  private setPostConversionResult(conversionResult: ColorConversionTypes, errorHandler: ErrorHandlerI): void {
    const formattedString = this.formatResult(conversionResult);
    this.setAndParseColorString(formattedString, errorHandler);
  }

  public convertAndSetColorStringOnNewBasicColor(newColor: BasicColor, errorHandler: ErrorHandlerI): void {
    try {
      let wasColorStringSet = false;
      if (this._parseResult) {
        const conversionResult = this.convert(newColor.colorType);
        if (conversionResult) {
          newColor.setPostConversionResult(conversionResult, errorHandler);
          wasColorStringSet = true;
        }
      }
      if (!wasColorStringSet) newColor.setAndParseColorString(newColor._defaultColorString, errorHandler);
    } catch (error) {
      errorHandler.displayError((error as UnexpectedError).message);
    }
  }
}
