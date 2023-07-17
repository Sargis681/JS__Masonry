function Masonry(objectSettings) {
  const containerClassName = objectSettings.containerClassName;
  const gap = objectSettings.gap || 5;
  const columnWidth = objectSettings.columnWidth || 200;

  const render = () => {
    const masonry = document.querySelector(containerClassName);
    const items = masonry.querySelectorAll(".masonry__item");
    const columnsCount = Math.trunc(masonry.offsetWidth / (columnWidth + gap));
    const columns = [];

    for (let i = 0; i < columnsCount; i++) {
      columns.push(0);
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const columnIndex = getIndex(columns);

      item.style.left = `${columnIndex * (columnWidth + gap)}px`;
      item.style.top = `${columns[columnIndex]}px`;
      item.style.width = columnWidth + "px";
      columns[columnIndex] += item.offsetHeight + gap;
    }
  };

  const getIndex = (columns) => {
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
  render();
  if (objectSettings.autoResize) {
    window.addEventListener("resize", render);
  }
}
const masonrySettings = {
  containerClassName: ".masonry",
  columnWidth: 200,
  autoResize: true,
  gap: 5,
};
const masonryLayout = new Masonry(masonrySettings);
