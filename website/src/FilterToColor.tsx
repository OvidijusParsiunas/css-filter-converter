import domtoimage from 'dom-to-image';

const FilterToColor = () => {
  function rgbToHex(r: number, g: number, b: number) {
    if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  function getData(canvas: HTMLCanvasElement) {
    return (canvas.getContext('2d') as CanvasRenderingContext2D).getImageData(
      canvas.width / 2,
      canvas.width / 2,
      canvas.width / 2 + 2,
      canvas.width / 2 + 2,
    ).data;
  }

  async function getCanvasDetails(canvas: HTMLCanvasElement) {
    const data = getData(canvas);
    return '#' + ('000000' + rgbToHex(data[0], data[1], data[2])).slice(-6);
  }

  function createCanvasElementFromImage(imageElement: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    (canvas.getContext('2d') as CanvasRenderingContext2D).drawImage(
      imageElement,
      0,
      0,
      imageElement.width,
      imageElement.height,
    );
    return canvas;
  }

  async function createImageElement() {
    const svgElement = document.getElementById('capture') as HTMLElement;
    const dataUrl = await domtoimage.toPng(svgElement);
    var img = new Image();
    img.src = dataUrl;
    return img;
  }

  async function createCanvas() {
    const imageElement = await createImageElement();
    return createCanvasElementFromImage(imageElement);
  }

  function prepareCanvas() {
    const textInputElement = document.getElementById('textInput') as HTMLInputElement;
    const input = textInputElement.value;
    const iconFilterPrefix = 'brightness(0) saturate(100%)';
    const svgElement = document.getElementById('hidden-svg') as HTMLElement;
    svgElement.style.filter = `${iconFilterPrefix} ${input}`;
  }

  async function generate() {
    prepareCanvas();
    const canvas = await createCanvas();
    const result = await getCanvasDetails(canvas);
    console.log(result);
  }

  return <button onClick={generate}>Click me!</button>;
};

export default FilterToColor;
