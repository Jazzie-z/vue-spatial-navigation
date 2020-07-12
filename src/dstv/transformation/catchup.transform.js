export const transformCatchupData = ({
  items: CatchupItem,
  subSections,
} = {}) => {
  let result = [];
  if (subSections.length)
    result.push({
      renderType: "List",
      id: "Filter-List",
      items: subSections.map(({ items, name }) => ({
        displayName: name,
        items: items.map((item) => ({
          ...item,
          displayName: item.name,
          renderType: "OverlayButton",
        })),
        renderType: "FilterButton",
      })),
      shouldScroll: false,
    });
  result.push({
    renderType: "Grid",
    id: "gird",
    items: CatchupItem.map((item) => ({
      src: item.program
        ? item.program.images.poster.LARGE
        : item.video.images.poster.LARGE,
      renderType: "CardPoster",
    })),
  });
  return result;
};
