const getCurrentEventTitle = (event) => {
  if (event.seasonNumber)
    return `${event.title}  |  S${event.seasonNumber}, E${event.episodeNumber}: ${event.episodeTitle}`;
  return event.title;
};
const reduceSynopsisLength = (currentEvent) => {
  let synopsis;
  let SYNOPSIS_LIMIT = 280;
  if (currentEvent) {
    synopsis = currentEvent.synopsis || currentEvent.longSynopsis;
    if (window.isSmartTv && synopsis && synopsis.length > SYNOPSIS_LIMIT) {
      synopsis = synopsis.slice(0, SYNOPSIS_LIMIT);
      synopsis = synopsis.concat("...");
    }
  }
  return synopsis;
};

const getCard = (item) => {
  let isEventAvailable =
    item.events &&
    item.events.length > 0 &&
    item.events[0] &&
    item.events[0].id;
  let isNextEventAvailable =
    item.events &&
    item.events.length > 1 &&
    item.events[1] &&
    item.events[0].id;
  let nextEvent = item.events && item.events.length > 1 ? item.events[1] : {};
  let currentEvent =
    item.events && item.events.length > 0 ? item.events[0] : {};
  return {
    channelId: item.notificationId || item.id || "",
    channelLogo:
      (item.channelLogoPathsWeb ? item.channelLogoPathsWeb.XLARGE : "") ||
      item.channelLogoPaths.XLARGE ||
      item.channelLogoPaths.LARGE ||
      "",
    channelNumber: item.channelNumber || item.number || "",
    channelTag: item.channelTag || item.id || "",
    genre: (item.genres && item.genres.length && item.genres[0]) || "",
    id: item.notificationId || item.id || "",
    currentEvent: item.currentEvent,
    episodeNumber: currentEvent ? currentEvent.episodeNumber : "",
    seasonNumber: currentEvent ? currentEvent.seasonNumber : "",
    eventTitle: getCurrentEventTitle(currentEvent),
    title: currentEvent.mainTitle || currentEvent.title || "",
    synopsis: reduceSynopsisLength(currentEvent) || item.description || "",
    time: "555", //currentEvent ? getTotalTime(currentEvent) : "",
    nextShowTime: "444", //currentEvent ? getTotalTime(currentEvent) : "",
    image:
      currentEvent && currentEvent.thumbnailImagePaths
        ? currentEvent.thumbnailImagePaths.THUMB
        : "",
    progressBarPercent: 100, //getProgressBarPercent(item),
    url: item.streams || "",
    episodeTitle: "titlecomes here", //getEpisodeTitle(currentEvent),
    ageMaturityClassification: "some rating", //getMaturityClassification_Rating(currentEvent),
    isLive: currentEvent.isLive,
    nextShow: {
      title: nextEvent.mainTitle || nextEvent.title || "",
      synopsis: nextEvent.synopsis || nextEvent.longSynopsis || "",
      time: "++555", //nextEvent ? getTotalTime(nextEvent) : "",
      nextShowTime: "++444", //nextEvent ? getTotalTime(nextEvent) : "",
      image:
        nextEvent && nextEvent.thumbnailImagePaths
          ? nextEvent.thumbnailImagePaths.THUMB
          : "",
      episodeTitle: "next title comes here", //getEpisodeTitle(nextEvent),
      ageMaturityClassification: "maturity comes here", //getMaturityClassification_Rating(nextEvent),
      isNextEventAvailable,
      isLive: nextEvent.isLive,
    },
    isEventAvailable,
    channelName: item.channelName || item.name,
    renderType: "Card16x9",
  };
};
export const transformChannelData = (data) => {
  if (data.length) {
    return data.map(getCard);
  }
  return data;
};
