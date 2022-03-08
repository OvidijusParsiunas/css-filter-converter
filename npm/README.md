# css-filter-converter - Title image

## Description

CSS Filter Converter is a simple tool used for converting basic css color formats to and from the css filter property.

## Install

```
npm install css-filter-converter
```

If you want the capability to convert from filter to a basic color, please additionally install puppeteer by running the following command:

```
npm install puppeteer
```

## Usage

```js
import CssFilterConverter from 'css-filter-converter';

// converting from basic color to filter
const result = CssFilterConverter.hexToFilter('#69A1DE');


// converting from filter to basic color
CssFilterConverter.filterToHex('brightness(0) saturate(100%) invert(58%) sepia(55%) saturate(365%) hue-rotate(171deg) brightness(93%) contrast(98%)').then((result) => result);

const result = await CssFilterConverter.filterToHex('brightness(0) saturate(100%) invert(58%) sepia(55%) saturate(365%) hue-rotate(171deg) brightness(93%) contrast(98%)');
```

## API

### Color to filter

Functions:
```js
// hex
hexToFilter('#69A1DE');
hexToFilter('#69A');

// rgb
rgbToFilter('rgb(106, 161, 225)');
rgbToFilter('106 161 225');

// hsl
hslToFilter('hsl(212deg, 66%, 65%)');
hslToFilter('212 66 65');

// keyword
keywordToFilter('blue');
// Full list of valid keyword values can be viewed in the following link: https://github.com/colorjs/color-name/blob/master/index.js 
```

Options:
| Name | Values | Default value | Description |
| ----------- | :-: | :-: | - |
| sheen  |  true/false | true  | Reinforces the strength of resultant filter color by prepending the following properties 'brightness(0) saturate(100%)'. Recommended to leave enabled for SVG images. |

```js
// example
hexToFilter('#69A1DE', { sheen: false });
```
Result:
| Property Name | Nested Property | Type | Description |
| ----------- | :-:  | :-:  | - |
| color | - |  string  | Css filter value.  |
| loss | - | number  | Every re-run of color to filter converion will result in a slightly different value due to the randomization used for filter value generation, hence some results will have a higher loss than others meaning that their color is more different to the input inserted.    |
| error | message | string  | The above properties will be set to null and this will contain a message that describes the reason for the resultant error.   |

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
