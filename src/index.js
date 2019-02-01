import React, { memo } from "react";
import ReactDOM from "react-dom";
import VirtualScroll from "./components/VirtualScroll";
import "./styles.css";

// usage:
const Item = memo(({ index }) => (
  <div
    style={{
      height: 30,
      lineHeight: "30px",
      display: "flex",
      justifyContent: "space-between",
      padding: "0 10px"
    }}
    className="row"
    key={index}
  >
    <img
      alt={index}
      src={`http://lorempixel.com/30/30/animals/${(index % 10) + 1}`}
    />
    row index {index}
  </div>
));

function App() {
  return (
    <div className="App">
      <h1>Virtual Scroll</h1>
      <VirtualScroll
        itemCount={10000}
        height={300}
        childHeight={30}
        Item={Item}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
