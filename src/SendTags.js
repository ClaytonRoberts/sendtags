import React, { useState } from "react";
import { recipientCalc } from "./components/organisms/RecipientCalc";
import { SendTypeToggle } from "./components/molecules/ToggleSwitch";

export default function SendTags() {
  const [recipients, updateRecipients] = useState("");
  const [tags, updateTags] = useState("");
  const [config, updateConfig] = useState("");
  const [sendTo, updateSendTo] = useState("");
  const [sendType, updateSendType] = useState("AND"); //changed to AND bc of ToggleSwitch
  const [sent, updateSent] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "tags":
        updateTags(value);
        return;
      case "config":
        updateConfig(value);
        return;
      case "sendTo":
        updateSendTo(value);
        return;
      case "sendType":
        updateSendType(value);
        return;
      default:
        return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    /*  implement me
            hint: we will probably need to update state here to render the right parts
        */
    recipientCalc(tags, config, sendTo, sendType).then((keys) => {
      updateRecipients(keys);
    });
    updateSent(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
        <label style={{ paddingRight: "10px" }}>
          <div>
            <span style={{ paddingRight: "10px" }}>
              Tags (separated by commas):
            </span>
            <input type="text" name="tags" onChange={handleChange} />
          </div>
          <div>
            <span
              style={{ paddingRight: "10px", paddingTop: "20px" }}
              dangerouslySetInnerHTML={{
                __html:
                  "People Configs (e.g. {“Spiderman”: [“hero”, “tough”, “smart”, “tall”]}): ",
              }}
            ></span>
            <input
              type="text"
              name="config"
              style={{ width: "500px" }}
              onChange={handleChange}
            />
          </div>
          <div>
            <span style={{ paddingRight: "10px", paddingTop: "20px" }}>
              Send To:
            </span>
            <input type="text" name="sendTo" onChange={handleChange} />
          </div>
          {/* <div>
            <span style={{ paddingRight: "10px", paddingTop: "20px" }}>
              AND/OR?:{" "}
            </span>
            <input type="text" name="sendType" onChange={handleChange} />
          </div> */}
          <SendTypeToggle
            title="AND / OR sendType:"
            leftLabel="AND"
            rightLabel="OR"
            onChange={(value) => updateSendType(value)}
          />
        </label>

        <input type="submit" value="Send Messages" onClick={handleSubmit} />
      </form>
      {sent && (
        <div>
          Sent to:
          <br />
          {recipients}
        </div>
      )}
    </div>
  );
}
