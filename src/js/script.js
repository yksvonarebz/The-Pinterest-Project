import axios from "axios";

const PERIODIC_NUM = 16;
let el = 0;

const HEIGHT_MAP = new Map([
  [0, "295px"],
  [1, "378px"],
  [2, "315px"],
  [3, "420px"],
  [4, "429px"],
  [5, "315px"],
  [6, "229px"],
  [7, "420px"],
  [8, "472px"],
  [9, "347px"],
  [10, "268px"],
  [11, "345px"],
  [12, "418px"],
  [13, "354px"],
  [14, "313px"],
  [15, "420px"],
  [16, "320px"],
]);

function addImg(url, desc) {
  console.log("dfsdfsd");
  const listEl = document.getElementById("my-masonry-grid");
  const listLen = listEl.children.length;
  const posNum = el % PERIODIC_NUM;
  const clmnPosNum = (el % listLen) + 1;
  el++;
  let splitUrl = url.split("/");
  const node = creatNode(posNum, url);
  node.setAttribute("hashtag", splitUrl[splitUrl.length-1]);
  node.setAttribute("description", desc);
  const clmn = listEl.getElementsByClassName(
    `masonry-grid-column-${clmnPosNum}`
  )[0];
  clmn.append(node);
}

function creatNode(position, url) {
  let gridItem = document.createElement("div");
  console.log(gridItem);
  gridItem.setAttribute("class", "my-masonry-grid-item");
  gridItem.style.height = HEIGHT_MAP.get(position);
  gridItem.style["background-image"] = `url('${url}')`;
  return gridItem;
}


axios
  .get("https://64b12164062767bc4825bd2e.mockapi.io/pinterest")
  .then(function (response) {
		for (let el of response.data) {
			addImg(el.img, el.desc);
		}
  });


  // Контейнер появляющийся при наведение
  const hoverBox=document.createElement('div'); 
  hoverBox.classList.add("hoverBox"); 
  // masonry-grid-column.append(hoverBox); 
  const hoverImg = document.querySelector('.my-masonry-grid-item'); 
    hoverImg.addEventListener("mouseover", function(){
        gridItem.classList.add("hoverBox")
    })    

  // Контейнер описания
  const hoverBoxDescription=document.createElement('div'); 
  hoverBoxDescription.innerText=el.desc 
  hoverBox.append(hoverBoxDescription);


