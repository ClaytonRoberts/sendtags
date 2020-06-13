//This is the main component for determining whom to send the tags to. It pulls together other components.
//Note: the "tags" are not handled. The instructions didn't indicate what to do with them. ...for production, the tags could be added to the db entry for each person qualifying for the Sent To event.

import { CleanSendTo, CleanConfig } from "../molecules/CleanData";

export const recipientCalc = async (tags, config, sendTo, sendType) => {
  try {
    //change "sendTo" into a clean array
    var sendToArray = [];
    await CleanSendTo(sendTo).then((array) => {
      sendToArray = array;
    });

    //clean the "config", and conditionally iterate through...

    var configObject = null;
    var recipientsTemp = [];
    await CleanConfig(config).then((response) => {
      configObject = JSON.parse(response);

      //if sendType == OR
      if (sendType === "OR") {
        Object.entries(configObject).forEach(([key, value]) => {
          if (sendToArray.some((v) => value.includes(v))) {
            recipientsTemp.push(key);
          }
        });
      }

      //if sendType == AND
      else if (sendType === "AND") {
        Object.entries(configObject).forEach(([key, value]) => {
          if (sendToArray.every((v) => value.includes(v))) {
            recipientsTemp.push(key);
          }
        });
      } else {
        console.log("Sent Type Invalid");
      }
    });

    let keys = recipientsTemp.sort().join(", ");

    return keys;
  } catch (e) {
    console.error(e);
  }
};
