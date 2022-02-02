import { ConversionResult, PossibleReturnColors } from '../../../../shared/types/basicColorFactory';
import { ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ErrorHandling } from 'css-filter-converter/lib/shared/errorHandling/errorHandling';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';

export abstract class BasicColor {
  public abstract colorType: BasicColorTypes;

  constructor(protected readonly colorString: string, protected readonly newColor: BasicColor) {}

  protected abstract parse(): ParseResult<PossibleReturnColors>;

  protected abstract convert(parseResult: PossibleReturnColors): ConversionResult;

  protected abstract formatResult(result: PossibleReturnColors): string;

  public convertString(): string {
    const parseResult = this.parse();
    if (ErrorHandling.hasError(parseResult)) return 'error';
    const result = this.convert(parseResult.color);
    if (result) return this.newColor.formatResult(result);
    return 'error';
  }
}
