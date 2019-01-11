import React from "react";
import ReactDOM from "react-dom";
import Viewport from "./components/Viewport";
import ScrollAware from "./components/ScrollAware";
import "./styles.css";

const renderItem = ({ index }) => (
  <div className="row" key={index}>
    row index {index}
  </div>
);

function App() {
  return (
    <div className="App">
      <h1>Virtual Scroll</h1>
      <ScrollAware height={400}>
        {({ scrollTop, height }) => (
          <div>
            <h1>Header</h1>
            <Viewport
              count={10000}
              height={height}
              scrollTop={scrollTop}
              childHeight={20}
              renderItem={renderItem}
            />
            <h1>Footer</h1>
          </div>
        )}
      </ScrollAware>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
