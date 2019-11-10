/**
 *
 * @summary 响应式数据计算 contain imgWidth && imgHeight HeartSize FlowerCount
 * @author Hyy
 *
 * Created at     : 2019-11-05 14:00:15
 * Last modified  : 2019-11-06 09:52:44
 */

const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;

const oneThird = clientWidth / 3;

const imgRate = 1.78;
/************************* 图片占三分之一屏幕的比例 ***********************/
const imgFromOneThird = 0.15;

const imgWidth = imgFromOneThird * oneThird;
const imgHeight = Math.floor(imgWidth / imgRate);
const space = Math.floor(imgWidth / 5);

//放大到0.8屏幕大小的图片需要的倍数
const scale = (clientWidth * 0.8) / imgWidth;

const { ItopLeft, IbottomLeft, ImidLeft } = calcIWidth();

const { ItopTop, ImidTop, IbottomTop } = calcIHeight();

const { UleftLeft, URightLeft } = calcUWidth();

const { UleftTop, URightTop } = calcUHeight();

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
};

//计算 I宽度相关
function calcIWidth() {
  const ItopLeft = (oneThird - imgWidth * 3 - space * 2) / 2;
  const IbottomLeft = ItopLeft;
  const ImidLeft = ItopLeft + imgWidth + space;
  return { imgWidth, ItopLeft, IbottomLeft, ImidLeft, imgHeight, space };
}

//计算 I高度相关
function calcIHeight() {
  const IHeight = 8 * imgHeight + 7 * space;
  const ItopTop = (clientHeight - IHeight) / 2;
  const ImidTop = ItopTop + imgHeight + space;
  const IbottomTop = ItopTop + IHeight - imgHeight;
  return { ItopTop, ImidTop, IbottomTop };
}

function calcUWidth() {
  const uBetween = (oneThird - 4 * (imgWidth + space)) / 2;
  const UleftLeft = oneThird * 2 + uBetween;
  const URightLeft = oneThird * 3 - uBetween - imgWidth;
  return { UleftLeft, URightLeft };
}

function calcUHeight() {
  const UleftTop = ItopTop;
  const URightTop = ItopTop;
  return { UleftTop, URightTop };
}
