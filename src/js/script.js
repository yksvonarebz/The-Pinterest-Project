import axios from "axios";
import { HEIGHT_MAP, PERIODIC_NUM } from "./constants";

let numOfImages = 0;

function addImg(url, desc) {
  const listEl = document.getElementById("my-masonry-grid");
  const listLen = listEl.children.length;
  const posNum = numOfImages % PERIODIC_NUM;
  const clmnPosNum = (numOfImages % listLen) + 1;
  numOfImages++;
  let splitUrl = url.split("/");
  const node = creatNode(posNum, url);
  node.setAttribute("id", "el-id-" + numOfImages);
  node.addEventListener("mouseover", function() {
    node.classList.add(hoverConatainer)
    // node.style.display.none
    // node.style.display.setAttribute("hoverConatainer")
})
// Функция когда мышка уходит с картинки
node.addEventListener("mouseleave", function() {
  hoverConatainer.style.display.none
})


  node.setAttribute("hashtag", splitUrl[splitUrl.length-1]);
  node.setAttribute("description", desc);
  const clmn = listEl.getElementsByClassName(
    `masonry-grid-column-${clmnPosNum}`)[0];
  clmn.append(node);
}

function creatNode(position, url) {
  let gridItem = document.createElement("div");
  gridItem.setAttribute("class", "my-masonry-grid-item");
  gridItem.style.height = HEIGHT_MAP.get(position);
  gridItem.style["background-image"] = `url('${url}')`;
  return gridItem;
}

/**
 *
 * @returns images data :
 * 	id: image id
 *  image: url to an image
 *  userName: auther nickname
 *  avatar: url to the user avatar
 * @example :
 * {
    "image": "https://loremflickr.com/640/480/business",
    "userName": "Rowena_Cronin",
    "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/256.jpg",
    "id": "1"
  }
 */
function getImages() {
  return axios
    .get("https://64affd44c60b8f941af506ea.mockapi.io/api/images")
    .then((res) => res.data);
}

async function main() {
  let images = await getImages();
  for (let el of images) addImg(el.image, el.description);
}
  // Нахождение контейера и элементов  появляющегося при наведение 
  const hoverConatainer = document.getElementById("containerHoverBox");
  const descriptionContainer= document.getElementById("description");
  const avatarContainer= document.getElementById("avatar");
  descriptionContainer.innerText=el.desc 
  main();
