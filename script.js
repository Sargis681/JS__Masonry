function Masonry() {}

Masonry.prototype.render = function(objectSettings) {
  const masonry = document.querySelector(".masonry");
  const imgsItems = masonry.querySelectorAll(".masonry__item");
  const gap = objectSettings.gap || 5
  const columnWidth = objectSettings.columnWidth || 200;
  const numberCol = Math.trunc(masonry.offsetWidth / (columnWidth+gap));
  const columns = [];
  console.log(gap);

  for (let i = 0; i < numberCol - 1; i++) {
    columns.push(0);
  }

  for (let i = 0; i < imgsItems.length; i++) {
    const imgItem = imgsItems[i];
    const columnIndex = this.getIndex(columns);

    imgItem.style.left = `${columnIndex * (columnWidth+gap) }px`;
    imgItem.style.top = `${columns[columnIndex]}px`;
    imgItem.style.width = columnWidth + "px";
    columns[columnIndex] += imgItem.offsetHeight +gap;
  }
};

Masonry.prototype.handleResize = function(className, objectSettings) {
  if (objectSettings.autoResize) {
    window.addEventListener("resize", () => {
      this.render(className, objectSettings);
    });
  }
};

Masonry.prototype.getIndex = function(columns) {
  let index = 0;
  let indexHeight = columns[0];

  for (let i = 0; i < columns.length; i++) {
    if (columns[i] <= indexHeight) {
      index = i;
      indexHeight = columns[i];
    }
  }
  return index;
};

window.addEventListener("DOMContentLoaded", () => {
  const MasonryLayout = new Masonry();

  MasonryLayout.render({
    // Specify object settings if needed
  });
  
  MasonryLayout.handleResize(".masonry", {
    columnWidth: 200,
    autoResize: true,
  });
});
