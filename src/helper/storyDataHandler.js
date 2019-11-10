import translateClient from "@/helper/transform";
import { imgWidth, imgHeight, tragEl, scale } from "@/config";
/**
 * @summary handler photo list data set width height background transfrom and el
 * @author Hyy
 *
 * Created at     : 2019-11-01 10:54:04
 * Last modified  : 2019-11-08 21:26:38
 */
export default function storyDataHandler(storyData, { hide, clickhandler }) {
  //统计  15倍下 元素的BoundingClientRect
  translateClient(0, 0, scale);
  const storyObject = {};
  storyData.forEach((story, index) => {
    story.width = imgWidth;
    story.height = imgHeight;
    const el = document.createElement("div");
    el.style.width = `${story.width}px`;
    el.style.height = `${story.height}px`;
    el.classList.add("story-item");
    if (hide) {
      el.style.visibility = "hidden";
    }
    el.style.backgroundImage = `url(./public/img/story/${story.url}.png)`;
    el.style.transform = `translate(${story.left}px,${story.top}px)`;
    el.innerHTML = `<div class="desc" style='${story.textStyle}'>${story.text}</div>`;
    story.el = el;
    tragEl.appendChild(el);
    el.addEventListener("click", event => {
      console.log("触发点击图片");
      clickhandler && clickhandler(index);
    });
    story.boundingPoint = el.getBoundingClientRect();
    storyObject[story.url] = story;
  });
  //回到原先的视角
  translateClient(0, 0, 1);
  return storyData;
}

export function showAllStory(storyData) {
  storyData.forEach(story => {
    story.el.style.visibility = "visible";
  });
}
