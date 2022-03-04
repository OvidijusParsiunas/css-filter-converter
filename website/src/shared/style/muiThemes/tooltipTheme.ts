import { createTheme } from '@mui/material/styles';

export class TooltipTheme {
  public static create(backgroundColor: string) {
    return createTheme({
      components: {
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor,
              maxWidth: 'unset',
            },
          },
        },
      },
    });
  }
}
