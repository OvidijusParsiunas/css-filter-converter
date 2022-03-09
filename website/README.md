# css-filter-converter - Title image

## Description

CSS Filter Converter is a simple tool used for converting basic css color formats to and from css filter.

## Features

### Supported formats

|             | Hex | RGB | HSL | Keyword |
| ----------- | :-: | :-: | :-: | :-----: |
| To filter   |  ✓  |  ✓  |  ✓  |    ✓    |
| From filter |  ✓  |  ✓  |  ✓  |    ✗    |

### Icon Mode

One of the biggest uses of the filter css property is its ability to change the color of SVG images. The Icon Mode panel allows you to upload your SVG images directly into this tool which will automatically apply the result filter value to them and allow you to immediately observe its effects (This tool operates locally on your browser and no data leaves the privacy of your computer):

GIF here

### Sheen

In practice; filter css property is used to edit the color properties of the element that it is applied to, but will not completely override its existing color palette. This behaviour can sometimes make it difficult to achieve a consistent mono color scheme of the underlying contents, leaving an undesiderd partial color change that is especially evident in SVG images. The Sheen option is used to reinforce the application of the new color by prepending the following properties <b>'brightness(0) saturate(100%)'</b> to filter that result in a well saturated single hue color:

GIF here

## Local setup

```
# Requirements: Node version 8+ and NPM version 6+

# Install node dependencies:
$ npm install

# Run the project in watch mode:
$ npm run start
```

## Contributions

Open source is built by the community for the community. All contributions to this project are welcome!
<br> Additionally, if you have any suggestions for enhancements, ideas on how to take the project further or have discovered a bug, do not hesitate to create a new issue ticket and we will look into it as soon as possible!
