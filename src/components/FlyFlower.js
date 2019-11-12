import Flower from "./Flower";
import translateClient from "../helper/transform";
import { wWidth, wHeight, scale } from "../config";
import { global, changeGlobalValue, STATUSCONST } from "../config/global";
import anime from "animejs/lib/anime.es.js";
import { simpleCopy } from "../util";

const defaultOptions = {
  elWrapper: null,
  intervalCount: 10,
  curInterval: 0,
  animateIndex: 0,
  storyData: [],
  flowerList: [],
  complete: () => {}
};

export default class FlyFlower {
  constructor(options) {
    simpleCopy(this, defaultOptions, options);
    this.render();
  }
  createFlower(point) {
    const { x, y } = point;
    const count = Math.ceil(Math.random() * 3 + 3);
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() * 0.1 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
      const vy = (Math.random() * 0.1 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
      const scale = Math.random() * 0.003 + 0.003;
      const life = Math.ceil(Math.random() * 100 + 50);
      const flower = new Flower({ x, y, vx, vy, life, scale });
      flower.status = "motion";
      this.elWrapper.appendChild(flower.el);
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
    window.requestAnimationFrame(this.render.bind(this));
  }
  getTwoPointByEl(pos1, pos2) {
    let from = {};
    let to = {};
    if (pos1) {
      const point1 = pos1.boundingPoint;
      from = this.getPointInfo(pos1, point1);
    }
    if (pos2) {
      const point2 = pos2.boundingPoint;
      to = this.getPointInfo(pos2, point2);
    }

    return { from, to };
  }
  getPointInfo(pos, point) {
    const obj = {
      xs: pos.left + pos.width / 2,
      ys: pos.top + pos.height / 2,
      x: point.left + point.width / 2 - wWidth / 2,
      y: point.top + point.height / 2 - wHeight / 2
    };
    return obj;
  }
  animateStack(index, delay, reverse) {
    this.animateIndex = index ? index : this.animateIndex;
    const i = this.animateIndex;
    if (i + 1 < this.storyData.length && !reverse) {
      // next
      this.createAnime(
        this.storyData[i],
        this.storyData[i + 1],
        delay,
        reverse
      );
    } else if (i > 0 && reverse) {
      // prev
      this.createAnime(
        this.storyData[i],
        this.storyData[i - 1],
        delay,
        reverse
      );
    } else {
      setTimeout(() => {
        this.toBig(this.animateIndex, this.complete);
      }, 3000);
    }
  }
  //立即到单个story
  toSingleImmediately(index) {
    this.animateIndex = index || 0;
    const i = this.animateIndex;
    if (i < this.storyData.length) {
      const { from } = this.getTwoPointByEl(this.storyData[i]);
      changeGlobalValue("status", STATUSCONST.STORYMANUAL);
      this.translateClient(-from.x, -from.y);
    }
  }
  // Experiment function
  toSingle(index) {
    if (global.status === STATUSCONST.ANIMATEEND) {
      this.scaleAndTranslateAnimate({
        from: { scalen: 1 },
        to: { scalen: scale },
        change: "toSingle"
      });
    }
  }
  // Experiment function
  toBig(index, complete) {
    if (global.status === STATUSCONST.STORYAUTO) {
      this.scaleAndTranslateAnimate({
        from: { scalen: scale },
        to: { scalen: 1 },
        change: "toBig",
        complete
      });
    }
  }
  //主界面移入某个目标 或者  某个目标移入主界面
  scaleAndTranslateAnimate({ from, to, change, complete }) {
    //console.log(from, to);
    anime({
      targets: from,
      scalen: {
        value: to.scalen,
        easing: "easeOutCubic"
      },
      duration: 4000,
      update: anim => {
        const { scalen } = anim.animatables[0].target;
        const { progress } = anim;
        changeGlobalValue("scale", scalen);
        this.translateClient();
        const storyData = this.storyData[this.animateIndex];
        const el = storyData.el;
        //动态计算  boundingClient
        const obj = el.getBoundingClientRect();
        const obj2 = this.getPointInfo(storyData, obj);
        //缓动移动距离
        if (change === "toBig") {
          this.translateClient(
            -(((0 - obj2.x) * progress) / 100 + obj2.x),
            -(((0 - obj2.y) * progress) / 100 + obj2.y)
          );
        } else if (change === "toSingle") {
          this.translateClient(
            -(((obj2.x - 0) * progress) / 100 + 0),
            -(((obj2.y - 0) * progress) / 100 + 0)
          );
        }
      },
      complete: () => {
        complete && complete();
      }
    });
  }
  createAnime(pos1, pos2, delay, reverse) {
    const { from, to } = this.getTwoPointByEl(pos1, pos2);
    let count = 12;
    changeGlobalValue("storyMoving", true);
    anime({
      targets: from,
      xs: {
        value: to.xs,
        easing: "easeInCubic"
      },
      x: {
        value: to.x,
        easing: "easeInCubic"
      },
      ys: {
        value: to.ys,
        easing: "easeOutCubic"
      },
      y: {
        value: to.y,
        easing: "easeOutCubic"
      },
      duration: 2000,
      easing: "linear",
      update: anim => {
        const { x, y, xs, ys } = anim.animatables[0].target;
        if (count++ > 13) {
          count = 0;
          this.createFlower({ x: xs, y: ys });
        }
        if (x && y) {
          this.translateClient(-x, -y);
        }
      },
      complete: () => {
        changeGlobalValue("storyMoving", false);
        reverse ? this.animateIndex-- : this.animateIndex++;
        if (global.status === STATUSCONST.STORYAUTO) {
          this.animateStack();
        }
      },
      delay: delay || delay == 0 ? delay : 3000
      //   direction: "alternate",
      //   loop: true
    });
  }
  // permission wrapper
  translateClient() {
    if (
      global.status === STATUSCONST.STORYAUTO ||
      global.status === STATUSCONST.STORYMANUAL
    ) {
      translateClient(...arguments);
    }
  }
}
