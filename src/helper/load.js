let total = 0;
let cur = 0;
let loadcallback = () => {};
let srcprefix = null;

const analysis = {
  img: loadImg,
  video: loadVideo
};

/* 
data : {img:['a.png','b.jpg],video:['c.mp3']}
*/
export default function waitLoad({ data, callback, prefix }) {
  total = 0;
  loadcallback = callback;
  srcprefix = prefix;
  for (let key in data) {
    let array = data[key];
    total += array.length;
    analysis[key](array);
  }
}

function loadImg(array) {
  array.forEach(src => {
    load(src);
  });

  function load(src) {
    var img = new Image();

    img.onload = function() {
      console.log("图片加载完成");
      cur++;
      loadcallback(cur, total);
    };
    img.src = `${srcprefix}${src}`;
  }
}

function loadVideo(array) {
  array.forEach(src => {
    load(src);
  });

  function load(src) {
    const audio = document.createElement("audio");

    audio.addEventListener("canplaythrough", event => {
      console.log("音频加载完成");
      cur++;
      loadcallback(cur, total);
    });
    audio.src = `${srcprefix}${src}`;
    audio.preload = true;
  }
}
