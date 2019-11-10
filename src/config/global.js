const STATUSCONST = {
  PEDDING: "PEDDING",
  HEARTFLY: "HEARTFLY",
  SVGFLOWERFLY: "SVGFLOWERFLY",
  STORYAUTO: "STORYAUTO",
  STORYMANUAL: "STORYMANUAL",
  ANIMATEEND: "ANIMATEEND"
};

let global = {
  status: STATUSCONST.PEDDING,
  storyMoving: false, //one story to another
  scale: 1,
  transformX: 0,
  transformY: 0
};

export function changeGlobalValue(param, value) {
  global[param] = value;
}

export { STATUSCONST, global };
