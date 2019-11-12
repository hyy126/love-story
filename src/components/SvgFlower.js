import Flower from "./Flower";
import { otherWrapper } from "../config";

export default class SvgFlower {
  constructor(el) {
    this.el = el;
    this.frame = null;
    this.intervalCount = 1;
    this.flowerList = [];
    this.curInterval = 0;
    this.totalRenderInterval = 0;
    this.endAnimate = false;
    this.render();
  }
  createFlowerBySvgFlyFlower() {
    if (this.curInterval++ === this.intervalCount) {
      this.totalRenderInterval++;
      this.intervalCount = 4 + Math.ceil(this.totalRenderInterval / 3);
      this.curInterval = 0;
      //获取当前飞花所在点位
      const curPoint = this.el.getBoundingClientRect();
      /* 计算当前图片得宽高误差 */
      curPoint.x = curPoint.x + 90 / 2;
      curPoint.y = curPoint.y + 90 / 2;
      this.createFlower(curPoint);
    }
  }
  createFlower(point) {
    const { x, y } = point;
    const count = Math.ceil(Math.random() * 3 + 3);
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
      const vy = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
      const scale = Math.random() * 0.05 + this.totalRenderInterval * 0.003;
      const life = Math.ceil(Math.random() * 100 + 50);
      const flower = new Flower({ x, y, vx, vy, life, scale });
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
    if (!this.endAnimate) {
      this.createFlowerBySvgFlyFlower();
    }
    this.updateFlower();
    this.frame = window.requestAnimationFrame(this.render.bind(this));
  }
}
