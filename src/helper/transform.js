/**
 * @summary 移动屏幕
 * @author Hyy
 *
 * Created at     : 2019-11-01 14:29:42
 * Last modified  : 2019-11-12 19:42:47
 */

import { tragEl } from "../config";
import { global, changeGlobalValue } from "../config/global";

export default function translateClient(transformX, transformY, scale) {
  if (scale) {
    changeGlobalValue("scale", scale);
  }
  if (transformX || transformX === 0) {
    changeGlobalValue("transformX", transformX);
  }
  if (transformY || transformX === 0) {
    changeGlobalValue("transformY", transformY);
  }
  //console.log(global);
  tragEl.style.transform = `matrix(${global.scale}, 0, 0, ${global.scale},${global.transformX}, ${global.transformY})`;
}
