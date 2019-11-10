import Flower from "@/components/Flower";
import { otherWrapper, widthRate } from "@/config";
import { svgPathArray } from "@/helper/createSvgEl";

export default class SvgFlower {
  constructor(time) {
    this.time = time;
    this.frame = null;
    this.intervalCount = 5;
    this.flowerList = [];
    this.curInterval = 0;
    this.totalRenderInterval = 0;
    this.endAnimate = false;
    this.createFlowerBySvgFlyFlower();
    this.render();
  }
  createFlowerBySvgFlyFlower() {
    const path1 = svgPathArray[0];
    const totalLength = path1.getTotalLength();
    Snap.animate(
      0,
      totalLength,
      val => {
        if (this.curInterval++ > this.intervalCount) {
          this.curInterval = 0;
          const point = path1.getPointAtLength(val);
          point.x *= widthRate;
          point.y *= widthRate;
          this.createFlower(point);
        }
      },
      this.time
    );
  }
  createFlower(point) {
    const { x, y } = point;
    const count = Math.ceil(Math.random() * 3 + 3);
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
      const vy = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
      const scale = Math.random() * 0.05 + 0.03;
      const life = Math.ceil(Math.random() * 100 + 50);
      const flower = new Flower({ x, y, vx, vy, life, scale, widthRate });
      flower.status = "motion";
      otherWrapper.append(flower.el);
      this.flowerList.push(flower);
    }
  }
  updateFlower() {
    //运动
    this.flowerList.forEach((flower, index) => {
      if (flower.status === "motion") {
        flower.update();
        flower.render();
      } else if (flower.status === "die") {
        this.flowerList.splice(index, 1);
      }
    });
  }
  render() {
    this.updateFlower();
    // if (this.endAnimate) {
    //   window.cancelAnimationFrame(this.frame);
    // } else {
    this.frame = window.requestAnimationFrame(this.render.bind(this));
    //}
  }
}
