import axios from "axios";
import { HEIGHT_MAP, PERIODIC_NUM } from "./constants";

let numOfImages = 0;

function addImg(el) {
  const listEl = document.getElementById("my-masonry-grid");
  const listLen = listEl.children.length;
  const posNum = numOfImages % PERIODIC_NUM;
  const clmnPosNum = (numOfImages % listLen) + 1;
  numOfImages++;
  let splitUrl = el.image.split("/");
  const node = creatNode(posNum, el.image);
  const id = "el-id-" + numOfImages;
  node.setAttribute("id", id);
  let hovEl = createHoverEl(el.description, el.avatar, id, el.userName);
  node.append(hovEl);
  // действие на наведение курсора
  node.addEventListener("mouseover", function () {
    hovEl.style.display = "flex";
  });
  // действие на отсутствие курсора мышки
  node.addEventListener("mouseout", function () {
    hovEl.style.display = "none";
  });

  node.setAttribute("hashtag", splitUrl[splitUrl.length - 1]);
  node.setAttribute("description", el.description);
  const clmn = listEl.getElementsByClassName(
    `masonry-grid-column-${clmnPosNum}`
  )[0];
  clmn.append(node);
}

// Создание всплывающего элемента картинки
function createHoverEl(description, avatar, id, userName) {
  let hoverEl = document.createElement("div");
  hoverEl.setAttribute("class", "hover-el");
  let userInfo = document.createElement("div");
  userInfo.setAttribute("class", "hover-el__user-nfo");
  // создание кнопки
  let hoverButton=document.createElement("button");
  hoverButton.setAttribute("class", "button");
  hoverButton.innerText="..."
  
  // создание контейнеров внутри кнопки)
  let container=document.createElement("div")
  container.setAttribute("class", "containerWithAddBoards");

  let buttonReport=document.createElement("button");
  buttonReport.setAttribute("class", "report");
  buttonReport.innerText="Report"

  let buttonAdd=document.createElement("button");
  buttonAdd.setAttribute("class", "report");
  buttonAdd.innerText="Add To Borders"

  let closecontainer=document.createElement("button");
  closecontainer.setAttribute("class", "cross");
  closecontainer.innerText="X"

  closecontainer.addEventListener("click", function(){ 
    container.style.display = "none";
  })
  
  hoverButton.addEventListener("click", function(){ 
    container.style.display = "flex";
  })

  let userAvatar = document.createElement("img");
  userAvatar.setAttribute("src", avatar);
  userInfo.append(userAvatar);
  userInfo.append(userName);
  hoverEl.append(userInfo);
  hoverEl.append(description);
  hoverEl.append(hoverButton);
  hoverEl.append(container);
  container.append(buttonReport);
  container.append(buttonAdd);
  container.append(closecontainer);
  return hoverEl;
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
  for (let el of images) addImg(el);
}
main();
