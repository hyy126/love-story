/**
 *
 * @summary flower base class
 * @author Hyy
 *
 * Created at     : 2019-11-06 10:34:41
 * Last modified  : 2019-11-12 19:37:57
 */

import { wWidth, wHeight } from "../config";

// 花瓣图片里每个花瓣的大小px
const flowerSize = {
  width: 232,
  height: 233
};

export default class Flower {
  constructor({ x, y, fixed, vx, vy, life, scale, screenRate }) {
    this.el = document.createElement("div");
    this.el.classList.add("flowers");
    this.changeDirection = Math.ceil(Math.random() * 40 + 20);
    this.updateCount = 0;
    this.createRandomFlower();
    this.fixed = fixed ? true : false;
    this.life = life ? life : null;
    this.rotate = Math.floor(Math.random() * 360);
    this.scale = scale ? scale : Math.random() * 0.1 + 0.1;
    this.left = this.fixed ? x : x - flowerSize.width / 2;
    this.top = this.fixed ? y : y - flowerSize.height / 2;
    this.vx = vx
      ? vx
      : (Math.random() * 4 + 1) * (Math.random() > 0.7 ? 1 : -1);
    this.vy = vy
      ? vy
      : (Math.random() * 3 + 1) * (Math.random() > 0.3 ? 1 : -1);
    //适应屏幕尺寸的 大小和速度变化
    if (screenRate) {
      this.scale *= screenRate;
      this.vx *= screenRate;
      this.vy *= screenRate;
    }
    this.render();
    //静止状态
    this.status = "static";
  }
  //background from sprite png
  createRandomFlower() {
    let index = Math.ceil(Math.random() * 49);
    const row = Math.ceil(index / 8);
    const col = index % 8;
    const backgroundPosLeft = -(col - 1) * flowerSize.width + "px";
    const backgroundPosTop = -(row - 1) * flowerSize.height + "px";
    this.el.style.backgroundPosition = `${backgroundPosLeft} ${backgroundPosTop}`;
  }
  render() {
    this.style = {
      transform: `translate(${this.left}px,${this.top}px) rotate(${this.rotate}deg) scale(${this.scale})`
    };
    this.el.style.transform = this.style.transform;
  }
  update() {
    this.updateCount++;
    if (this.life && this.updateCount > this.life) {
      this.status = "die";
      this.el.parentNode.removeChild(this.el);
    } else if (
      this.left + flowerSize.width < 0 ||
      this.top + flowerSize.height < 0 ||
      this.left > wWidth ||
      this.top > wHeight
    ) {
      this.status = "die";
      this.el.parentNode.removeChild(this.el);
    } else {
      this.left += this.vx;
      this.top += this.vy;
    }
  }
  verticalLanding() {
    this.vx = 0;
    this.vy = 7;
  }
}
