export const menuSuccess = (data) => {
  let menuData = {
    home: "Home",
    livetv: "Live TV",
    catchup: "Catch Up",
    mylist: "My List",
    search: "Search",
    settings: "Settings",
  };
  let menuOrder = ["home", "livetv", "catchup", "mylist", "search", "settings"];
  let result = [];
  data.forEach((item) => {
    if (menuOrder.includes(item.id) && item.visible)
      result.push({ id: item.id, displayName: menuData[item.id] });
  });
  result.splice(
    result.findIndex((item) => item.id === "settings"),
    0,
    { id: "search", visible: true, displayName: menuData.search }
  );
  return result;
};
