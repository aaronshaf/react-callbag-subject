import React from "react";
import ReactDOM from "react-dom";
import { Subject, reducerFromMap, startWith } from "../src/index";
import pipe from "callbag-pipe";
import { debounce } from "callbag-debounce";

const reducers1 = new Map([
  ["SUBTRACT", (state, amount) => ({ count: state.count - amount })],
  ["ADD", (state, amount) => ({ count: state.count + amount })],
  ["MULTIPLY", (state, multiplier) => ({ count: state.count * multiplier })]
]);

const pipeline1 = actions =>
  pipe(actions, reducerFromMap(reducers1), startWith({ count: 0 }));

const Example1 = () => (
  <Subject pipeline={pipeline1}>
    {(state, send) => (
      <div>
        <button onClick={() => send("SUBTRACT", 1)}>Remove 1</button>
        <button onClick={() => send("ADD", 1)}>Add 1</button>
        <button onClick={() => send("MULTIPLY", 2)}>Multiply by 2</button>
        <div>{state.count}</div>
      </div>
    )}
  </Subject>
);

const reducers2 = new Map([
  ["ADD", (state, amount) => ({ counter: state.counter + amount })]
]);

const pipeline2 = actions =>
  pipe(
    actions,
    debounce(250),
    reducerFromMap(reducers2),
    startWith({ counter: 1 })
  );

const Example2 = () => (
  <Subject pipeline={pipeline2}>
    {(state, send) => (
      <div>
        <button onClick={() => send("ADD", 1)}>Add 1</button>
        <div>{state.counter}</div>
      </div>
    )}
  </Subject>
);

ReactDOM.render(
  <div>
    <h1>react-callbag</h1>

    <h2>Basic usage</h2>
    <pre>
      <code className="javascript">{`const reducers = new Map([
  ["SUBTRACT", (state, amount) => ({ count: state.count - 1 })],
  ["ADD", (state, amount) => ({ count: state.count + 1 })],
  ["MULTIPLY", (state, multiplier) => ({ count: state.count * multiplier })]
]);

const pipeline = actions =>
  pipe(actions, reducerFromMap(reducers1), startWith({ count: 0 }));

<Subject pipeline={pipeline}>
  {(state, send) => (
    <div>
      <button onClick={() => send("SUBTRACT", 1)}>Remove 1</button>
      <button onClick={() => send("ADD", 1)}>Add 1</button>
      <button onClick={() => send("MULTIPLY", 2)}>Multiply by 2</button>
      <div>{state.count}</div>
    </div>
  )}
</Subject>`}</code>
    </pre>
    <Example1 />

    <h2>Debounced</h2>
    <pre>
      <code className="javascript">{`const reducers = new Map([
  ["ADD", (state, amount) => ({ counter: state.counter + amount })]
]);

const pipeline = actions =>
  pipe(
    actions,
    debounce(250),
    reducerFromMap(reducers),
    startWith({ counter: 1 })
  );

<Subject pipeline={pipeline}>
  {(state, send) => (
    <div>
      <button onClick={() => send("ADD", 1)}>Add 1</button>
      <div>{state.counter}</div>
    </div>
  )}
</Subject>
`}</code>
    </pre>
    <Example2 />
  </div>,
  document.getElementById("root")
);

Array.from(document.querySelectorAll("pre")).forEach(pre =>
  hljs.highlightBlock(pre)
);
