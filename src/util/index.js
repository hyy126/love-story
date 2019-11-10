/**
 * @summary util file
 * @author Hyy
 *
 * Created at     : 2019-11-07 13:34:00
 * Last modified  : 2019-11-07 13:52:19
 */

/* 对象浅拷贝 */
export function simpleCopy() {
  let argumentsArray = Array.from(arguments);
  let source = argumentsArray.shift();
  argumentsArray.forEach(obj => {
    for (let i in obj) {
      source[i] = obj[i];
    }
  });
}
