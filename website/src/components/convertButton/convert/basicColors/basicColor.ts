import { ConversionResult, PossibleReturnColors } from '../../../../shared/types/basicColorFactory';
import { ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ErrorHandling } from 'css-filter-converter/lib/shared/errorHandling/errorHandling';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { KEYWORD } from 'color-convert/conversions';

export abstract class BasicColor {
  public abstract colorType: BasicColorTypes;

  // newType should be a BasicColor
  constructor(protected readonly colorString: string | KEYWORD, protected readonly newType: BasicColorTypes) {}

  protected abstract parse(): ParseResult<PossibleReturnColors>;

  protected abstract convert(parseResult: PossibleReturnColors): ConversionResult;

  protected abstract formatTargetString(result: PossibleReturnColors): string;

  public convertString(): string {
    const parseResult = this.parse();
    if (ErrorHandling.hasError(parseResult)) return 'error';
    const result = this.convert(parseResult.color);
    if (result) return this.formatTargetString(result);
    return 'error';
  }
}
