# css-filter-converter - Title image

## Description

CSS Filter Converter is a simple tool used for converting basic css color formats to and from the css filter property. It can be accessed through a dedicated [website](https://cssfilterconverter.com) or directly injected into your project via [NPM](https://npmjs.com/package/css-filter-converter).

## Features

### Supported formats

|             | Hex | RGB | HSL | Keyword |
| ----------- | :-: | :-: | :-: | :-----: |
| To filter   |  ✓  |  ✓  |  ✓  |    ✓    |
| From filter |  ✓  |  ✓  |  ✓  |    ✗    |

### Sheen

In practice; filter css property is used to edit the color properties of the element that it is applied to, but will not completely override its existing color palette. This behaviour can sometimes make it difficult to achieve a consistent mono color scheme of the underlying contents, leaving an undesiderd partial color change that is especially evident in SVG images. The Sheen option is used to reinforce the application of the new color by prepending the following properties 'brightness(0) saturate(100%)' to filter that result in a well saturated single hue color:

GIF here

### Icon Mode

One of the biggest uses of the filter css property is its ability to change the color of SVG images. The Icon Mode panel allows you to upload your SVG images directly into this tool which will automatically apply the result filter value to them and allow you to immediately observe its effects (This tool operates locally on your browser and no data leaves the privacy of your computer):

GIF here

## More information

- [Website](https://github.com/OvidijusParsiunas/css-filter-converter/tree/main/website)
- [NPM](https://github.com/OvidijusParsiunas/css-filter-converter/tree/main/npm)

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new issue ticket and we will look into it as soon as possible!
