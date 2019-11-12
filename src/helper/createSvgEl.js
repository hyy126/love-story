import { otherWrapper } from "../config";
import { wWidth, wHeight } from "../config";

export let svgPathArray = [];

Snap.load(
  "public/svg/clearance.svg",
  function(svg) {
    this.appendChild(svg.node);
    const svgFlowerPath = Snap("#svgFlowerPath");
    svgFlowerPath.attr({
      width: wWidth,
      height: wHeight,
      viewBox: "0,0,1536,731"
    });

    const svgPath = svgFlowerPath.selectAll("path");
    svgPathArray.push(svgPath[0]);

    // svgPath.forEach(function(e, index) {
    //   var length = e.getTotalLength();
    //   console.log(e, length);
    //   e.attr({
    //     opacity: 1,
    //     strokeDashoffset: length,
    //     strokeDasharray: length
    //   });
    //   e.animate(
    //     {
    //       "stroke-dashoffset": 0
    //     },
    //     8000,
    //     "",
    //     function(a) {
    //       console.log(a);
    //       debugger;
    //     }
    //   );
    // });
  },
  document.getElementById("svgFlowerPath")
);

export function createSvgEl(className, timeout) {
  let el = document.createElement("div");
  el.classList.add(className || "svgFlower1");
  otherWrapper.append(el);
  setTimeout(() => {
    otherWrapper.removeChild(el);
  }, timeout);
  return el;
}
