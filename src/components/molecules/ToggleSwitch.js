//This component is a toggle switch, specifically with props for affecting the updateSendType state.

import React, { useState } from "react";
import "./ToggleSwitch.css";

export const SendTypeToggle = (props) => {
  const [toggle, toggleState] = useState(false);

  const changeStates = () => {
    toggleState(!toggle);
  };

  return (
    <div className="switch-field">
      <div className="switch-title">{props.title}</div>
      <input
        type="radio"
        id="switch_left"
        name="switchToggle"
        value={props.leftLabel}
        onChange={(event) => {
          changeStates();
          props.onChange(event.target.value);
        }}
        checked={!toggle}
      />
      <label htmlFor="switch_left">{props.leftLabel}</label>

      <input
        type="radio"
        id="switch_right"
        name="switchToggle"
        value={props.rightLabel}
        onChange={(event) => {
          changeStates();
          props.onChange(event.target.value);
        }}
        checked={toggle}
      />
      <label htmlFor="switch_right">{props.rightLabel}</label>
    </div>
  );
};
