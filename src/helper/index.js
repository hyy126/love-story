/**
 * @summary 射线法判断点是否在多边形内
 * @author Hyy
 *
 * Created at     : 2019-11-01 15:04:28
 * Last modified  : 2019-11-07 13:15:15
 */

export function pointInPolygon(point, vs) {
  // get source code from https://github.com/substack/point-in-polygon
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  var x = point[0],
    y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

export function createHeartPolygon(t, size) {
  //获取心型线的X坐标
  let x = size * (16 * Math.pow(Math.sin(t), 3));
  //获取心型线的Y坐标
  let y =
    -size *
    (13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t));

  return { x, y };
}
