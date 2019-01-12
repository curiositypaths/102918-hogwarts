import React from "react";

const generateImageName = hogName =>
  hogName
    .split(" ")
    .map(w => w.toLowerCase())
    .join("_");

const Hog = ({ hog, toggleDetails }) => (
  <div onClick={() => toggleDetails(hog.name)}>
    <h1>{hog.name}</h1>
    <div>
      <img src={require(`./hog-imgs/${generateImageName(hog.name)}.jpg`)} />
    </div>
    <div>{hog.weight}</div>
    {hog.showDetails && <div>{hog.specialty}</div>}
  </div>
);

export default Hog;
