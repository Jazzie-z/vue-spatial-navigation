export const transformSectionData = (data) => {
  if (data.length) {
    return data.map((item, index) => ({
      ...item,
      displayName: item.name,
      path: index ? item.name.toLowerCase().replace(" ", "") : "",
    }));
  }
  return data;
};
