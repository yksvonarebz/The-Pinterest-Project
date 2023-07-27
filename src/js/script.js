import axios from "axios";
import Toastify from "toastify-js";

import { HEIGHT_MAP, PERIODIC_NUM } from "./constants";

let numOfImages = 0;
if (!localStorage['desk_one']) {
  localStorage['desk_one'] = JSON.stringify([]);
  localStorage['desk_two'] = JSON.stringify([]);
  localStorage['desk_three'] = JSON.stringify([]);
}

document.getElementsByClassName('logo-box')[0].addEventListener('click', () => {
  document.querySelectorAll(".desk-masonry-grid").forEach(el => el.style.display = 'none');
  document.getElementById('my-masonry-grid').style.display = 'flex';
  document.getElementById('toggle-button').innerText = 'Desks';
})

document.getElementById('dropdown-item-1').addEventListener('click', () => {
  openDeskWin('desk_one', 'desk-masonry-grid-first');
  document.getElementById('toggle-button').innerText = 'First desk';
});

document.getElementById('dropdown-item-2').addEventListener('click', () => {
  openDeskWin('desk_two', 'desk-masonry-grid-second');
  document.getElementById('toggle-button').innerText = 'Second desk';
});

document.getElementById('dropdown-item-3').addEventListener('click', () => {
  openDeskWin('desk_three', 'desk-masonry-grid-third');
  document.getElementById('toggle-button').innerText = 'Third desk';
});



function addImg(el, gridName) {
  const listEl = document.getElementById(gridName);
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
  node.setAttribute('avatar', el.avatar);
  node.setAttribute('userName', el.userName);
  const clmn = listEl.getElementsByClassName(
    `masonry-grid-column-${clmnPosNum}`
  )[0];
  clmn.append(node);
}

// Создание всплывающего элемента картинки
function createHoverEl(description, avatar, id, userName) {
  let hoverEl = document.createElement("div");
  hoverEl.setAttribute("class", "hover-el");
  hoverEl.setAttribute('id', `hover-element-${id}`)
  let userInfo = document.createElement("div");
  userInfo.setAttribute("class", "hover-el__user-nfo");
  // создание кнопки
  let hoverButton = document.createElement("button");
  hoverButton.setAttribute("class", "button");
  hoverButton.innerText = "..."

  // создание контейнеров внутри кнопки)
  let container = document.createElement("div")
  container.setAttribute("class", "containerWithAddBoards");

  let buttonReport = document.createElement("button");
  buttonReport.setAttribute("class", "report");
  buttonReport.innerText = "Report"

  let buttonAdd = document.createElement("button");
  buttonAdd.setAttribute("class", "report");
  buttonAdd.innerText = "Add To Desk";
  buttonAdd.addEventListener('click', () => {
    hoverEl.style.color = 'transparent';
    userInfo.style.display = 'none';
    container.style.display = 'none';
    createAddToDeskWin(id);
  });

  let closeContainer = document.createElement("button");
  closeContainer.setAttribute("class", "cross");
  closeContainer.innerText = "X";

  closeContainer.addEventListener("click", function () {
    container.style.display = "none";
  })

  hoverButton.addEventListener("click", function () {
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
  container.append(closeContainer);
  return hoverEl;
}


function createAddToDeskWin(id) {
  const winEl = document.createElement('div');
  winEl.setAttribute('class', 'add-to-desk-win');
  winEl.setAttribute('id', `win-el-${id}`);

  const firstDesk = document.createElement("button");
  firstDesk.setAttribute('class', 'btn btn-light btn-cstm');
  firstDesk.innerText = "First desk"
  firstDesk.addEventListener('click', () => {
    addToDesk(id, "desk_one");
  });
  winEl.append(firstDesk);

  const secondDesk = document.createElement("button");
  secondDesk.setAttribute('class', 'btn btn-light btn-cstm');
  secondDesk.innerText = "Second desk";
  secondDesk.addEventListener('click', () => {
    addToDesk(id, "desk_two");
  });
  winEl.append(secondDesk);

  const thirdDesk = document.createElement("button");
  thirdDesk.setAttribute('class', 'btn btn-light btn-cstm');
  thirdDesk.innerText = "Third desk";
  thirdDesk.addEventListener('click', () => {
    addToDesk(id, "desk_three");
  });
  winEl.append(thirdDesk);

  let parent = document.getElementById(id);
  parent.append(winEl);
}


function openDeskWin(desk_name, gridName) {
  let el = document.getElementById('my-masonry-grid');
  el.style.display = 'none';
  document.querySelectorAll(".desk-masonry-grid").forEach(el => el.style.display = 'none');
  let desk = document.getElementById(gridName);
  desk.style.display = 'flex';
  desk.querySelectorAll('.my-masonry-grid-item').forEach(el => el.remove());
  const images = JSON.parse(localStorage[desk_name]);
  for (let el of images) addImg(el, gridName);
}

function addToDesk(id, deskName) {
    let el = document.querySelector(`#${id}`);
    let newArr = JSON.parse(localStorage[deskName]);
    let obj = {
        image: el.style["background-image"].split('("')[1].split('")')[0],
        avatar: el.attributes["avatar"].value,
        description: el.attributes["description"].value,
        hashtag: el.attributes["hashtag"].value,
        userName: el.attributes["userName"].value
    };

    newArr.push(obj);
    localStorage[deskName] = JSON.stringify(newArr);

    document.getElementById(`win-el-${id}`).style.display = 'none';

    const hovEl = el.getElementsByClassName('hover-el')[0];
    const usrInf = hovEl.getElementsByClassName('hover-el__user-nfo')[0];
    const cntnr = hovEl.getElementsByClassName('containerWithAddBoards')[0];

    hovEl.style.color = 'white';
    usrInf.style.display = 'block';
    cntnr.style.display = 'flex';

    Toastify({
        text: "Card added to the desk",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
            animation: '3.5s progress linear',
            background: 'white',
            position: 'fixed',
            'z-index': '1',
            bottom: '0px',
            right: '0px',
            width: '20%'
        }
    }).showToast();
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
  for (let el of images) addImg(el, 'my-masonry-grid');
}

// Search

document.querySelector("#search-machine").oninput = function () {
  let val = this.value.trim();
  let searchMachineItems = document.querySelectorAll(".my-masonry-grid-item");
  if (val != "") {
    searchMachineItems.forEach(function (elem) {
      if (elem.attributes["hashtag"].value.indexOf(val) < 0) {
        elem.style.display = "none";
      } else {
        elem.style.display = "flex";
      }
    });
  } else {
    searchMachineItems.forEach(function (elem) {
      elem.style.display = "flex";
    });
  }
};

main();