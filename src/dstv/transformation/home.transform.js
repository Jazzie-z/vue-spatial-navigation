export const transformHomeData = (data) => {
  if (data) {
    return data
      .filter((item) => item.editorialListType === "Catchup")
      .map(({ editorialItems, name }) => ({
        items: editorialItems.map(({ id, image }) => ({
          id: id,
          src: image.LARGE,
        })),
        title: name,
        id: name,
      }));
  }
  return data;
};
