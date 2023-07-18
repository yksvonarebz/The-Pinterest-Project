$.fn.masonryGrid = function (options) {
  const constants = require("./constants");
  // Get options
  var settings = $.extend(
    {
      columns: 6,
      breakpoint: 767,
    },
    options
  );

  var $this = $(this),
    currentColumn = 1,
    i = 1,
    itemCount = 1;

  // Add class to already existent items
  $this.addClass("masonry-grid-origin");
  $this.children().addClass("masonry-grid-item");

  function createMasonry() {
    currentColumn = 1;

    // Add columns
    for (columnCount = 1; columnCount <= settings.columns; columnCount++) {
      $this.each(function () {
        $(this).append(
          '<div class="masonry-grid-column masonry-grid-column-' +
            columnCount +
            '"></div>'
        );
      });
    }

    // Add basic styles to columns
    $this.each(function () {
      $(this)
        .css("display", "flex")
        .find(".masonry-grid-column")
        .css("width", "100%");
    });

    $this.each(function () {
      var currentGrid = $(this);

      currentGrid.find(".masonry-grid-item").each(function () {
        // Reset current column
        if (currentColumn > settings.columns) currentColumn = 1;

                // Add ident to element and put it in a column
                $(this).attr('id', 'masonry_grid_item_' + itemCount)
                    .appendTo(currentGrid.find('.masonry-grid-column-' + currentColumn));

                // Increase current column and item count
                currentColumn++;
                itemCount++;
            });
        });
    }

	// recalc colums count
  function destroyMasonry() {
    const winWidth = $(window).width();
    let maxCol = 6;
    if (winWidth < constants.XL_WIN) --maxCol;
    if (winWidth < constants.L_WIN) --maxCol;
    if (winWidth < constants.M_WIN) --maxCol;
    if (winWidth < constants.S_WIN) --maxCol;
    if (winWidth < constants.XS_WIN) --maxCol;

    for (let i = 1; i <= 6; i++) {
      if (i <= maxCol) $(`.masonry-grid-column-${i}`).css("display", "");
      else $(`.masonry-grid-column-${i}`).css("display", "none");
    }
  }

  // Call functions
  createMasonry();
  destroyMasonry();
  $(window).on("resize", function () {
    destroyMasonry();
  });
};
