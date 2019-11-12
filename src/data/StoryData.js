import {
  imgWidth,
  imgHeight,
  space,
  ItopLeft,
  IbottomLeft,
  ImidLeft,
  ItopTop,
  ImidTop,
  IbottomTop,
  UleftLeft,
  URightLeft,
  UleftTop,
  URightTop
} from "../config";

const storyText = [
  "人生就像一场漂流",
  "曾经的阿狸是那么地无忧无虑,每天睡到自然醒",
  "上云霄俯瞰大地",
  "乘小鲸鱼遨游海底",
  "和木头人来场不那么愉快的游戏",
  "当然偶尔也会惹得妈妈生气",
  "直到遇见了桃子",
  "那心跳的感觉让阿狸念念不忘",
  "满眼都是你",
  "看着星空,默默地下定了决心",
  "于是阿狸开始慢慢接触桃子,他们一起看书",
  "一起欣赏风景",
  "一起游玩",
  "一起乘小鲸鱼飞翔(这次多了你)",
  "乘着小龙",
  "在月亮上勾勒出对你的喜欢",
  "传说在摩天轮的最高点,会成为这个世界上最幸运的人",
  "瞧,那边有只调皮的飞机",
  "可惜飞机撞上了摩天轮,他们到不了最高点了,阿狸很难过",
  "桃子:我最大的幸运,就是遇见了你",
  "即便偶尔分隔异地,也会通过信燕来传达彼此的思念与情谊",
  "异地的分别总是短暂的,最终阿狸和桃子生活在了一起",
  "命运有很多波折,但我们不会彼此放弃",
  "依然会站在幸福的最高点",
  "漂流有时会很寂寞",
  "有时会很痛苦",
  "幸好有你",
  "一路相伴"
];

const blackColor = "color:#000";

let StoryData = [
  /********************************  I  Top Start ************************************/
  {
    left: ItopLeft,
    top: ItopTop,
    url: "story1"
  },
  {
    left: ItopLeft + (imgWidth + space),
    top: ItopTop,
    url: "story2"
  },
  {
    left: ItopLeft + (imgWidth + space) * 2,
    top: ItopTop,
    url: "story3"
  },
  /********************************  I  Mid Start ************************************/
  {
    left: ImidLeft,
    top: ImidTop,
    url: "story4",
    textStyle: blackColor
  },
  {
    left: ImidLeft,
    top: ImidTop + (imgHeight + space),
    url: "story5"
  },
  {
    left: ImidLeft,
    top: ImidTop + (imgHeight + space) * 2,
    url: "story6"
  },
  {
    left: ImidLeft,
    top: ImidTop + (imgHeight + space) * 3,
    url: "story7",
    textStyle: blackColor
  },
  {
    left: ImidLeft,
    top: ImidTop + (imgHeight + space) * 4,
    url: "story8",
    textStyle: "margin-top:-12%"
  },
  {
    left: ImidLeft,
    top: ImidTop + (imgHeight + space) * 5,
    url: "story9"
  },
  /********************************  I  Bottom Start ************************************/
  {
    left: IbottomLeft,
    top: IbottomTop,
    url: "story10",
    textStyle: "margin-top:0%"
  },
  {
    left: IbottomLeft + (imgWidth + space),
    top: IbottomTop,
    url: "story11"
  },
  {
    left: IbottomLeft + (imgWidth + space) * 2,
    top: IbottomTop,
    url: "story12"
  },
  /********************************* U  Left Start ************************************/
  {
    left: UleftLeft,
    top: UleftTop,
    url: "story13",
    textStyle: blackColor
  },
  {
    left: UleftLeft,
    top: UleftTop + (imgHeight + space),
    url: "story14",
    textStyle: blackColor
  },
  {
    left: UleftLeft,
    top: UleftTop + (imgHeight + space) * 2,
    url: "story15"
  },
  {
    left: UleftLeft,
    top: UleftTop + (imgHeight + space) * 3,
    url: "story16"
  },
  {
    left: UleftLeft,
    top: UleftTop + (imgHeight + space) * 4,
    url: "story17",
    textStyle: blackColor
  },
  {
    left: UleftLeft,
    top: UleftTop + (imgHeight + space) * 5,
    url: "story18",
    textStyle: blackColor
  },
  /********************************* U  Right Start ************************************/
  {
    left: URightLeft,
    top: URightTop,
    url: "story19",
    textStyle: blackColor
  },
  {
    left: URightLeft,
    top: URightTop + (imgHeight + space),
    url: "story20",
    textStyle: blackColor
  },
  {
    left: URightLeft,
    top: URightTop + (imgHeight + space) * 2,
    url: "story21",
    textStyle: blackColor
  },
  {
    left: URightLeft,
    top: URightTop + (imgHeight + space) * 3,
    url: "story22",
    textStyle: `${blackColor};margin-top:0%`
  },
  {
    left: URightLeft,
    top: URightTop + (imgHeight + space) * 4,
    url: "story23"
  },
  {
    left: URightLeft,
    top: URightTop + (imgHeight + space) * 5,
    url: "story24",
    textStyle: blackColor
  },
  /********************************* U  Bottom Start ************************************/
  {
    left: UleftLeft + imgWidth * 0.6,
    top: UleftTop + (imgHeight + space) * 6,
    url: "story25"
  },
  {
    left: UleftLeft + imgWidth * 1.2,
    top: UleftTop + (imgHeight + space) * 7,
    url: "story26"
  },
  {
    left: URightLeft - imgWidth * 0.6,
    top: URightTop + (imgHeight + space) * 6,
    url: "story27"
  },
  {
    left: URightLeft - imgWidth * 1.2,
    top: URightTop + (imgHeight + space) * 7,
    url: "story28"
  }
];

StoryData.forEach((obj, index) => {
  obj.text = storyText[index];
});

export { StoryData };
