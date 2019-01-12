import React from "react";
import Hog from "./Hog";

const Hogs = ({ hogs, toggleDetails }) => (
  <div>
    {hogs.map(h => (
      <Hog key={h.name} hog={h} toggleDetails={toggleDetails} />
    ))}
  </div>
);

export default Hogs;
