import React from "react";
import ReactDOM from "react-dom";
import { Subject } from "../src/index";
import pipe from "callbag-pipe";
import map from "callbag-map";
import skip from "callbag-skip";
import { debounce } from "callbag-debounce";
import startWith from "callbag-start-with";

const reducer = source =>
  pipe(
    source,
    skip(1),
    debounce(250),
    map(([state, data, _event]) => ({
      count: state.count + data
    })),
    startWith({ count: 0 })
  );

ReactDOM.render(
  <div>
    <h1>react-callbag</h1>
    <pre>
      <code className="javascript">{`import { Subject } from "react-callbag";
import pipe from "callbag-pipe";
import map from "callbag-map";
import skip from "callbag-skip";
import { debounce } from "callbag-debounce";
import startWith from "callbag-start-with";

const reducer = source =>
  pipe(
    source,
    skip(1),
    debounce(250),
    map(([state, data, _event]) => ({
      count: state.count + data
    })),
    startWith({ count: 0 })
  );

/* Or if you're blessed with the pipeline operator:
const reducer = source =>
  source
  |> skip(1)
  |> debounce(250)
  |> map(([state, data, _event]) => ({
    count: state.count + data
  }))
  |> startWith({ count: 0 });
*/

<Subject reducer={reducer}>
  {(state, send) => (
    <div>
      <button onClick={send(-1)}>Subtract -1</button>
      <button onClick={send(1)}>Add 1</button>
      <div>{state.count}</div>
    </div>
  )}
</Subject>`}</code>
    </pre>
    <Subject reducer={reducer}>
      {(state, send) => (
        <div>
          <ul>
            <li>Skips first action</li>
            <li>Debounces at 250ms</li>
          </ul>
          <button onClick={send(-1)}>Subtract 1</button>
          <button onClick={send(1)}>Add 1</button>
          <div>{state.count}</div>
        </div>
      )}
    </Subject>
  </div>,
  document.getElementById("root")
);

hljs.highlightBlock(document.querySelector("pre"));
