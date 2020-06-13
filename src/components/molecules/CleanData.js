// The quote marks in the ReadMe input were strange...and I want to turn it into an array for looping etc...
//So this component replaces using regex, and then splits for the sendTo; for the config it just replaces

export const CleanSendTo = async (sendTo) => {
  const withGoodQuotes = sendTo
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');
  let noQuotes = await withGoodQuotes.replace(/"/g, "");
  let removedSpace = noQuotes.replace(/, /g, ",");
  let sendToArray = await removedSpace.split(",");

  return sendToArray;
};

export const CleanConfig = async (config) => {
  const withGoodQuotes = config
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');

  return withGoodQuotes;
};
