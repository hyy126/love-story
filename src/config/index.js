export {
  imgWidth,
  imgHeight,
  space,
  ItopLeft,
  IbottomLeft,
  ImidLeft,
  ItopTop,
  ImidTop,
  IbottomTop,
  UleftLeft,
  URightLeft,
  UleftTop,
  URightTop,
  scale
} from "../helper/responseDataCalc";

const el = document.querySelector(".page-wrapper");
export const otherWrapper = document.querySelector(".other-wrapper");
export const heartWrapper = document.querySelector(".heart-wrapper");
export const tragEl = document.querySelector(".trag-wrapper");
export const wWidth = el.offsetWidth;
export const wHeight = el.offsetHeight;

export const CloudAddress = "https://love-story.oss-cn-shanghai.aliyuncs.com/";

const normalWidth = 1536;
export const widthRate = wWidth / normalWidth;
// export const imgWidth = 72;
// export const imgHeight = 40.5;
