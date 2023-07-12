function Masonry() {}

Masonry.prototype.render = function (objectSettings) {
  const masonry = document.querySelector(".masonry");
  const imgsItems = masonry.querySelectorAll(".masonry__item");
  const columnWidth = objectSettings.columnWidth || 200;
  const numberCol = Math.trunc(masonry.offsetWidth / columnWidth);
  const columns = [];

  for (let i = 0; i < numberCol - 1; i++) {
    columns.push(0);
  }

  for (let i = 0; i < imgsItems.length; i++) {
    const imgItem = imgsItems[i];
    const columnIndex = getIndex(columns);

    imgItem.style.left = `${columnIndex * columnWidth + 160}px`;
    imgItem.style.top = `${columns[columnIndex]}px`;
    imgItem.style.width = columnWidth + "px";
    columns[columnIndex] += imgItem.offsetHeight + 5;
  }

  masonry.style.height = Math.max(...columns) + "px";
};

Masonry.prototype.handleResize = function (className, objectSettings) {
  if (objectSettings.autoResize) {
    window.addEventListener("resize", () => {
      this.render(className, objectSettings);
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  MasonryLayout.render(".masonry", {
    columnWidth: 200,
    autoResize: true,
  });
  MasonryLayout.handleResize(".masonry", {
    columnWidth: 200,
    autoResize: true,
  });
});

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

const MasonryLayout = new Masonry();
