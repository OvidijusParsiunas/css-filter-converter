export default class UploadSVG {
  private static onFileLoad(event: ProgressEvent<FileReader>): void {
    if (event.target?.result) {
      const svgBase64 = event.target.result as string;
      const svgImageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      svgImageElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', svgBase64);
      document.body.appendChild(svgImageElement);
      const svgElement = document.getElementById('icon-mode-user-entry');
      if (svgElement) svgElement.appendChild(svgImageElement);
    }
  }

  public static uploadSVG(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = UploadSVG.onFileLoad;
    reader.readAsDataURL(file);
  }
}
