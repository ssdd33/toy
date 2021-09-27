let boxes = Array.from(document.getElementsByClassName("box"));

const selectBox = (id) => {
  boxes.forEach((b) => {
    b.classList.toggle("selected", b.classList[1] === id);
  });
};
boxes.forEach((b) => {
  let id = b.classList[1];
  b.addEventListener("click", () => {
    selectBox(id);
    history.pushState({ id }, `selected:${id}`, `#/selected=${id}`);
    console.log(history.state);
  });
});

window.addEventListener("popstate", (e) => {
  let id = e.state.id;
  selectBox(id);
  console.log(e.state);
});

history.replaceState({ id: null }, "default state", "#/");
