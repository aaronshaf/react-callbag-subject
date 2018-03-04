import React from "react";
import ReactDOM from "react-dom";
import { Subject } from "../src/index";
import flow from "lodash/flow";
import map from "callbag-map";
import skip from "callbag-skip";
import { debounce } from "callbag-debounce";

const initialState = { count: 0 };

const pipeline = flow(
  skip(1),
  debounce(250),
  map(([state, data, _event]) => {
    return {
      count: state.count + data
    };
  })
);

ReactDOM.render(
  <div>
    <h1>react-callbag</h1>
    <pre>
      <code className="javascript">{`import { Subject } from "../src/index";
import flow from "lodash/flow";
import map from "callbag-map";
import skip from "callbag-skip";
import { debounce } from "callbag-debounce";

const initialState = { count: 0 };

const pipeline = flow(
  skip(1),
  debounce(250),
  map(([state, data, _event]) => {
    return {
      count: state.count + data
    };
  })
);

<Subject initialState={initialState} pipeline={pipeline}>
  {(state, send) => (
    <div>
      <button onClick={send(1)}>Add 1</button>
      <button onClick={send(2)}>Add 2</button>
      <div>{state.count}</div>
    </div>
  )}
</Subject>`}</code>
    </pre>
    <Subject initialState={initialState} pipeline={pipeline}>
      {(state, send) => (
        <div>
          <button onClick={send(1)}>Add 1</button>
          <button onClick={send(2)}>Add 2</button>
          <div>{state.count}</div>
        </div>
      )}
    </Subject>
  </div>,
  document.getElementById("root")
);

hljs.highlightBlock(document.querySelector("pre"));
