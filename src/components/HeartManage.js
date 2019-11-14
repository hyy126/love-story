/**
 * @summary heart by flower particle
 * @author Hyy
 *
 * Created at     : 2019-11-02 10:56:38
 * Last modified  : 2019-11-14 10:28:13
 */

import { wWidth, wHeight, widthRate } from "../config";
import Flower from "./Flower";
import { pointInPolygon, createHeartPolygon } from "../helper";
import { simpleCopy } from "../util";

const heartWidth = 700;
const heartHeight = 700;

const pointXRange = [
  (wWidth - heartWidth) / 2,
  (wWidth - heartWidth) / 2 + heartWidth
];

const pointYRange = [
  (wHeight - heartHeight) / 2,
  (wHeight - heartHeight) / 2 + heartHeight
];

/* 
不同分辨率适配爱心的大小  
*/
const nowHeartSize = widthRate * 12;
const nowHeartCount = (widthRate * Math.PI) / 25;
const maxFlowerCount = 300;

//console.log(pointXRange, pointYRange);
const hideSlope = 1;

// const testEl = document.createElement("div");
// testEl.style.position = "absolute";
// testEl.style.left = pointXRange[0] + "px";
// testEl.style.top = pointYRange[0] + "px";
// testEl.style.width = heartWidth + "px";
// testEl.style.height = heartHeight + "px";
// testEl.style.border = "1px solid red";
// document.body.appendChild(testEl);

const defaultOptions = {
  heartWrapper: null,
  complete: () => {},
  heartAngleAddList: [nowHeartCount],
  heartSizeList: [nowHeartSize],
  heartAngle: 0,
  heartCount: 0,
  maxHeartCount: 1,
  flowerList: [],
  maxFlowerCount: maxFlowerCount,
  frame: null,
  hideSpeed: 1.2,
  heartPolygon: [],
  axis: [wWidth / 2 + 200, 0],
  nextAnimate: false,
  normalFlying: false,
  normalCurCount: 0,
  normalMaxCount: 20
};

export default class HeartManage {
  constructor(options) {
    simpleCopy(this, defaultOptions, options);
    this.initFlower();
  }
  initFlower() {
    this.heartPolygon = [];
    this.heartCount = 0;
    while (this.heartCount < this.maxHeartCount) {
      if (this.heartAngle > 2 * Math.PI) {
        this.heartCount++;
        this.heartAngle = 0;
      }
      if (this.heartCount < this.maxHeartCount) {
        this.heartAngle += this.heartAngleAddList[this.heartCount];
        this.addFlower();
      }
    }
    this.fillHeartByHeart();
    this.flowerList.forEach(flower => {
      this.heartWrapper.append(flower.el);
    });
  }
  fillHeartByHeart() {
    if (!window.heartPolygon) {
      window.heartPolygon = this.heartPolygon;
    }
    while (this.flowerList.length < this.maxFlowerCount) {
      this.createPointInHeart();
    }
  }
  createPointInHeart() {
    const randomX =
      Math.random() * (pointXRange[1] - pointXRange[0]) + pointXRange[0];
    const randomY =
      Math.random() * (pointYRange[1] - pointYRange[0]) + pointYRange[0];
    const flag = pointInPolygon([randomX, randomY], this.heartPolygon);
    //debugger
    if (flag) {
      const flower = new Flower({
        x: randomX,
        y: randomY,
        fixed: true,
        screenRate: widthRate
      });
      this.flowerList.push(flower);
    } else {
      this.createPointInHeart();
    }
  }
  addFlower() {
    const { x, y } = this.getHeartPoint();
    this.heartPolygon.push([x, y]);
    const life = Math.ceil(Math.random() * 100 + 150);
    const flower = new Flower({
      x,
      y,
      fixed: true,
      life,
      screenRate: widthRate
    });
    this.flowerList.push(flower);
  }
  getHeartPoint() {
    let { x, y } = createHeartPolygon(
      this.heartAngle,
      this.heartSizeList[this.heartCount]
    );
    x = x + wWidth / 2 - 110;
    y = y + wHeight / 2 - 150;
    return { x, y };
  }
  slantAnimate() {
    if (this.axis[0] > 0) {
      this.axis = [this.axis[0] - this.hideSpeed, 0];
      this.flowerList.forEach(flower => {
        if (flower.status === "static") {
          const { top, left } = flower;
          const [x, y] = this.axis;
          const curSlope = (top - y) / (left - x);
          if (curSlope < hideSlope && curSlope > 0) {
            flower.status = "motion";
          }
        }
      });
    }
  }
  updateFlower() {
    this.flowerList.forEach((flower, index) => {
      if (flower.status === "motion") {
        flower.update();
        flower.render();
      } else if (flower.status === "die") {
        this.flowerList.splice(index, 1);
      }
    });
    if (this.flowerList.length < 20 && !this.nextAnimate) {
      this.nextAnimate = true;
      this.complete && this.complete();
    }
  }
  //垂直降落
  verticalLanding() {
    this.flowerList.forEach(flower => {
      if (flower.status === "motion") {
        flower.verticalLanding();
        flower.render();
      }
    });
  }
  //爱心正常状态下的花朵零散飘落
  normalFly() {
    if (this.normalCurCount++ > this.normalMaxCount) {
      this.normalCurCount = 0;
      this.normalMaxCount = Math.floor(Math.random() * 30 + 30);
      this.createPointInHeart();
      const latestedIndex = this.flowerList.length - 1;
      this.heartWrapper.append(this.flowerList[latestedIndex].el);
      this.flowerList[latestedIndex].status = "motion";
    }
  }
  render() {
    // 初始动画流程的斜向洒落动画
    this.slantAnimate();
    this.updateFlower();
    if (this.normalFlying) {
      this.normalFly();
    }
    this.frame = window.requestAnimationFrame(this.render.bind(this));
  }
}

/* test heartPolygon */
// document.addEventListener("click", e => {
//   const { clientX, clientY } = e;
//   const flag = pointInPolygon([clientX, clientY], window.heartPolygon);
//   console.log(flag, clientX, clientY);
// });
