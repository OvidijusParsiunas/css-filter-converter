export enum ColorFormats {
  HEX = '#ffffff or #fff',

  RGB = 'rgb([0-255], [0-255], [0-255]) ' +
    'or rgb([0-255], [0-255], [0-255], [0-1]) ' +
    'or rgb([0-100%], [0-100%], [0-100%]) ' +
    'or rgb([0-100%], [0-100%], [0-100%], [0-100%]) ' +
    'or [0-255], [0-255], [0-255] ' +
    'or [0-255] [0-255] [0-255]',

  HSL = 'hsl([0-360], [0-100], [0-100]) ' +
    'or hsl([0-360], [0-100%], [0-100%]) ' +
    'or [0-360], [0-100], [0-100] ' +
    'or [0-360] [0-100] [0-100]',

  FILTER = 'blur(), brightness(), contrast(), ' +
    'drop-shadow(), grayscale(), hue-rotate(), ' +
    'invert(), saturate(), sepia() ' +
    'with each parameter populated with ' +
    '%, px or deg where approriate e.g. contrast(101%)',
}
