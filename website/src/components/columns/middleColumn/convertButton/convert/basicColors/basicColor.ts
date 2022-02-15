import { ConversionResult, ColorConversionTypes } from '../../../../../../shared/types/basicColorFactory';
import { UNEXPECTED_ERROR_MESSAGE_PREFIX } from 'css-filter-converter/lib/shared/consts/errors';
import { ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ErrorHandling } from 'css-filter-converter/lib/shared/errorHandling/errorHandling';
import { UnexpectedError } from 'css-filter-converter/lib/shared/types/unexpectedError';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { Error } from 'css-filter-converter/lib/shared/types/error';

export abstract class BasicColor {
  protected abstract _colorType: BasicColorTypes;

  protected abstract _defaultColorString: string;

  protected abstract _colorString: string;

  protected abstract _parseResult: ColorConversionTypes | null;

  protected abstract parse(): ParseResult<ColorConversionTypes>;

  protected abstract convert(newColorType: BasicColorTypes): ConversionResult;

  protected abstract formatResult(conversionResult: ColorConversionTypes): string;

  get colorType(): BasicColorTypes {
    return this._colorType;
  }

  get defaultColorString(): string {
    return this._defaultColorString;
  }

  get colorString(): string {
    return this._colorString;
  }

  get parseResult(): ColorConversionTypes | null {
    return this._parseResult;
  }

  public setAndParseColorString(colorString: string): void {
    this._colorString = colorString;
    const parseResult = this.parse();
    this._parseResult = ErrorHandling.hasError(parseResult) ? null : parseResult.color;
  }

  private static generateUnexpectedError(error: UnexpectedError): Error {
    const errorMessage = `${UNEXPECTED_ERROR_MESSAGE_PREFIX}: \n${error.message}`;
    console.log(errorMessage);
    return { errorMessage };
  }

  private setPostConversionResult(conversionResult: ColorConversionTypes): void {
    const formattedString = this.formatResult(conversionResult);
    this.setAndParseColorString(formattedString);
  }

  public convertAndSetColorStringOnNewBasicColor(newColor: BasicColor): void {
    try {
      let wasColorStringSet = false;
      if (this._parseResult) {
        const conversionResult = this.convert(newColor.colorType);
        if (conversionResult) {
          newColor.setPostConversionResult(conversionResult);
          wasColorStringSet = true;
        }
      }
      if (!wasColorStringSet) newColor.setAndParseColorString(newColor._defaultColorString);
    } catch (error) {
      // should throw here and error should be caught in the ui
      BasicColor.generateUnexpectedError(error as UnexpectedError);
    }
  }
}
