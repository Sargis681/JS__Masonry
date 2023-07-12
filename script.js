function Masonry() {}

Masonry.prototype.render = function (className, objectSettings) {
  const masonry = document.querySelector(className);
  const imgsItems = document.querySelectorAll(".masonry__item");
  const columnWidth = objectSettings.columnWidth || 200;
  const autoResize = objectSettings.autoResize || false;
  const numberCol = Math.trunc(masonry.offsetWidth / columnWidth);
  const columns = [];

  for (let i = 0; i < numberCol; i++) {
    columns.push(0);
  }

  for (let i = 0; i < imgsItems.length; i++) {
    const imgItem = imgsItems[i];
    const columnIndex = getIndex(columns);

    imgItem.style.left = `${columnIndex * columnWidth}px`;
    imgItem.style.top = `${columns[columnIndex]}px`;
    imgItem.style.width = columnWidth + "px";
    columns[columnIndex] += imgItem.offsetHeight + 5;
  }

  masonry.style.height = Math.max(...columns) + "px";

  if (autoResize) {
    setInterval(() => {
      this.handleResize(className, {
        columnWidth: columnWidth,
        autoResize: autoResize,
      });
    }, 0);
  }
};

function getIndex(columns) {
  let index = 0;
  let indexHeight = columns[0];

  for (let i = 0; i < columns.length; i++) {
    if (columns[i] <= indexHeight) {
      index = i;
      indexHeight = columns[i];
    }
  }

  return index;
}

Masonry.prototype.handleResize = function (className, objectSettings) {
  this.render(className, objectSettings);
};

const MasonryLayout = new Masonry();

window.addEventListener("DOMContentLoaded", () => {
  MasonryLayout.render(".masonry", {
    columnWidth: 200,
    autoResize: true,
  });
});
