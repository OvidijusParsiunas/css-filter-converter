import React from 'react';

// WORK - remove
export default class UploadSVG {
  private static onFileLoad(svgContainerElement: SVGSVGElement, event: ProgressEvent<FileReader>): void {
    if (event.target?.result) {
      const svgBase64 = event.target.result as string;
      const svgImageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      svgImageElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', svgBase64);
      svgImageElement.style.width = '20px';
      svgImageElement.style.height = '20px';
      svgContainerElement.appendChild(svgImageElement);
    }
  }

  public static uploadSVG(event: React.ChangeEvent<HTMLInputElement>, svgContainerElement: SVGSVGElement | null): void {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = UploadSVG.onFileLoad.bind(this, svgContainerElement as SVGSVGElement);
    reader.readAsDataURL(file);
  }
}
