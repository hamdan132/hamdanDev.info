document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.mosaic-container');
  const items = Array.from(container.querySelectorAll('.mosaic-item'));

  function arrangeMosaic() {
    const containerWidth = container.clientWidth;
    const baseColumnWidth = containerWidth < 768 ? 120 : 150; // smaller on mobile
    const columnCount = Math.max(2, Math.floor(containerWidth / baseColumnWidth)); // min 2 columns
    const columnHeights = new Array(columnCount).fill(0);

    items.forEach(item => {
      // Reset styles
      item.style.gridColumn = '';
      item.style.gridRow = '';
    });

    items.forEach(item => {
      const img = item.querySelector('img');
      if (!img || img.naturalWidth === 0 || img.naturalHeight === 0) return;

      // Calculate aspect ratio
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      // Find the shortest column to place the item
      let minCol = 0;
      let minHeight = columnHeights[0];
      for (let i = 1; i < columnCount; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i];
          minCol = i;
        }
      }

      // Calculate column span based on aspect ratio (max 2)
      let colSpan = 1;
      if (aspectRatio > 1.5 && minCol + 2 <= columnCount) {
        colSpan = 2;
      }

      // Calculate row span based on aspect ratio for tall images
      let rowSpan = 1;
      if (aspectRatio < 0.7) {
        rowSpan = 2;
      } else if (aspectRatio < 0.5) {
        rowSpan = 3;
      }

      // Ensure doesn't exceed column count
      if (minCol + colSpan > columnCount) {
        colSpan = columnCount - minCol;
      }

      // Set grid column and row span
      item.style.gridColumn = `span ${colSpan}`;
      item.style.gridRow = `span ${rowSpan}`;

      // Update column heights (weight by rowSpan)
      for (let i = minCol; i < minCol + colSpan; i++) {
        columnHeights[i] += rowSpan;
      }
    });
  }

  // Function to check if all images are loaded
  function checkImagesLoaded() {
    const images = container.querySelectorAll('img');
    let loadedCount = 0;
    images.forEach(img => {
      if (img.complete && img.naturalWidth > 0) {
        loadedCount++;
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) {
            arrangeMosaic();
          }
        });
        img.addEventListener('error', () => {
          loadedCount++;
          if (loadedCount === images.length) {
            arrangeMosaic();
          }
        });
      }
    });
    if (loadedCount === images.length) {
      arrangeMosaic();
    }
  }

  // Run on load and on resize
  checkImagesLoaded();
  window.addEventListener('resize', arrangeMosaic);
});
