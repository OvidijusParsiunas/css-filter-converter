# css-filter-converter - Title image

## Description

CSS Filter Converter is a very simple tool used for converting basic css color formats to css filter and vice versa. Its capabilities can be accessed through both: a dedicated [website](https://cssfilterconverter.com) or directly intergrated into your project via an [NPM library](https://npmjs.com/package/css-filter-converter).

## Features

Supported formats:

|             | Hex | RGB | HSL | Keyword |
| ----------- | --- | --- | --- | ------- |
| To filter   | ✓   | ✓   | ✓   | ✓       |
| From filter | ✓   | ✓   | ✓   | ✗       |

### Sheen

In practice, filter css property will edit the color properties of an element's contents, but will not override their already existing color tone. This behaviour can sometimes make it difficult for filter style to apply a new consistent color on an element, leaving undesiderd partial color change results - especially in SVG images. Therefore, the Sheen option is used to reinforce the application of the new color onto an element by prepending the following function properties 'brightness(0) saturate(100%)' to filter which result in a saturated single hue color.

GIF here

### Icon

One of the biggest use cases of the filter css property is its ability to change the color of SVG format images. To prevent you from having to switch to other domains in order to test the filter property there, the Icon Mode panel allows you to upload your own SVG images directly to this tool which will automatically apply the current result filter to them. (Css Filter Converter operates locally on your browser and no data leaves the privacy of your computer):

GIF here

## More information

- [Website](website/README.md)
- [NPM](npm/README.md)

## Contributions

Open source is built by the community for the community. All contributions to this project are very welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create an issue and we will look into it as soon as possible!
