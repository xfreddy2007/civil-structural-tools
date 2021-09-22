import { resolve } from "path/posix";

let isParsed = false;
let supportWebpResult = false;
// https://stackoverflow.com/questions/5573096/detecting-webp-support
export default function isSupportWebp():Promise<boolean> {
  if (isParsed) {
    Promise.resolve(supportWebpResult);
  }
  return new Promise((resolve) => {
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    const handler = () => {
      const result = webP.height === 2;
      supportWebpResult = result;
      isParsed = true;
      resolve(result);
    };
    webP.onload = handler;
    webP.onerror = handler;
  });
}