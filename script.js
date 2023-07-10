function MasonryPrototype() {
  this.columnHeights = [];
}

MasonryPrototype.prototype.render = function(containerClass, settings) {
  const container = document.querySelector(containerClass);
  if (!container) {
    return;
  }

  const columnWidth = settings.columnWidth || 200;
  const columnHeight = settings.columnHeight || 150;
  const autoResize = settings.autoResize || false;
  const gap = 5;

  const positionItems = () => {
    const containerWidth = container.offsetWidth;
    const columns = Math.floor(containerWidth / (columnWidth + gap));
    const paddingInline = autoResize
      ? 0
      : (containerWidth - columns * (columnWidth + gap)) / 2 + 50;

    container.style.cssText = `
      columns-count: ${columns};
      padding-inline: ${paddingInline}px;
      column-gap: ${gap}px;
      column-width: ${columnWidth}px;
    `;

    const items = container.children;
    const itemCount = items.length;
    const itemsPerColumn = Math.ceil(itemCount / columns);
    // console.log(`Total items: ${itemCount}`);
    // console.log(`Items per column: ${itemsPerColumn}`);

    // Determine the count of items in each column
    const columnCounts = Array(columns).fill(0);

    for (let i = 0; i < itemCount; i++) {
      const columnIndex = i % columns;
      columnCounts[columnIndex]++;
    }
    console.log(items);

    this.columnHeights = Array(columns).fill(0); // Reset column heights array

    for (let i = 0; i < itemCount; i++) {
      const columnIndex = i % columns;
      const itemHeight = items[i].offsetHeight;
      this.columnHeights[columnIndex] += itemHeight;
    }

    // Log the sum of each column's height
    for (let i = 0; i < columns; i++) {
      console.log(`Column ${i + 1} sum: ${this.columnHeights[i]}`);
    }
    let largestNumber =  Math.max(...this.columnHeights) 
    console.log(largestNumber);

    // Log the column number for each image
    const columnImages = document.querySelectorAll('.masonry img');
    for (let i = 0; i < columnImages.length; i++) {
      const imageHeight = columnImages[i].offsetHeight;
      const columnIndex = Math.floor(i / itemsPerColumn) + 1;
      console.log(columnIndex);
      if(i<4){

        columnImages[i].style.height = columnImages[i].offsetHeight-70+"px"
      }
      // console.log(columnIndex);
      
      console.log(`Image ${i + 1} is in column ${columnIndex}. Height: ${imageHeight}px`);
    }
  };

  positionItems();

  window.addEventListener("resize", positionItems);
};

const masonry = new MasonryPrototype();

window.addEventListener("DOMContentLoaded", () => {
  masonry.render(".masonry", {
    columnWidth: 200,
    autoResize: true,
  });
});
