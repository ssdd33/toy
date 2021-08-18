const container = document.querySelector("#puzzle_wrapper");
const timer = document.querySelector("#timer");
const playBtn = document.querySelector("#play_btn");
const playMessage = document.querySelector("#game_message");

const totalTile = 16;
let dragged = {
  el: null,
  class: null,
  index: null,
};
let isPlaying = true;
let timeInterval = null;
let time = 0;

//functions

function makeImageTiles() {
  let tempArr = [];
  Array(totalTile)
    .fill()
    .forEach((_, i) => {
      const li = document.createElement("li");
      li.setAttribute("data-index", i);
      li.setAttribute("draggable", "true");
      li.classList.add(`list${i}`);
      tempArr.push(li);
    });
  return tempArr;
}

function suffleTiles(array) {
  let idx = totalTile - 1;
  while (idx > 0) {
    let randomIdx = Math.floor(Math.random() * (idx + 1));
    [array[idx], array[randomIdx]] = [array[randomIdx], array[idx]];
    idx--;
  }
  return array;
}

function startGame() {
  isPlaying = true;
  playMessage.style.display = "none";
  container.innerHTML = "";
  time = 0;
  clearInterval(timeInterval);

  let tiles = makeImageTiles();
  tiles.forEach((tile) => {
    container.appendChild(tile);
  });
  setTimeout(() => {
    container.innerHTML = "";
    suffleTiles(tiles).forEach((tile) => {
      container.appendChild(tile);
      tiles.push(tile);
    });
    timeInterval = setInterval(() => {
      timer.innerText = time;
      time++;
    }, 1000);
  }, 2000);
}
function checkStatus() {
  let currentList = [...container.children];
  let unMatched = currentList.filter(
    (child, i) => Number(child.getAttribute("data-index")) !== i
  );
  console.log(currentList);
  if (!unMatched.length) {
    playMessage.style.display = "block";
    isPlaying = false;
    clearInterval(timeInterval);
  }
}
//event

playBtn.addEventListener("click", () => {
  startGame();
});

container.addEventListener("dragstart", (e) => {
  if (!isPlaying) return;
  const obj = e.target;
  dragged.el = obj;
  dragged.class = obj.className;
  console.log(obj.className);
  dragged.index = [...obj.parentNode.children].indexOf(obj);
});
container.addEventListener("dragover", (e) => {
  e.preventDefault();
});
container.addEventListener("drop", (e) => {
  if (!isPlaying) return;
  const obj = e.target;
  if (obj.className !== dragged.class) {
    let originPlace;
    let isLast = false;
    if (dragged.el.nextSibling) {
      originPlace = dragged.el.nextSibling;
    } else {
      originPlace = dragged.el.previousSibling;
      isLast = true;
    }
    const droppedIdx = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedIdx ? obj.before(dragged.el) : obj.after(dragged.el);
    isLast ? originPlace.after(obj) : originPlace.before(obj);

    checkStatus();
  }
});
