Asynchronous reducer pipelines using [callbags](https://github.com/staltz/callbag-basics).

Try it now on [CodeSandbox](https://codesandbox.io/s/mozmv6vrmp).

## Install

```
npm install react-callbag --save
```

## Pipeline operator

If you don't have the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator) you can use the [pipe function](https://github.com/staltz/callbag-pipe). `foo |> bar()` would instead be `pipe(foo, bar())`.

## Basic usage

```javascript
import { Subject, reducerFromMap, startWith } from "react-callbag";

const reducers = new Map([
  ["SUBTRACT", (state, amount) => ({ count: state.count - amount })],
  ["ADD", (state, amount) => ({ count: state.count + amount })],
  ["MULTIPLY", (state, multiplier) => ({ count: state.count * multiplier })]
]);

const pipeline = actions =>
  actions |> reducerFromMap(reducers) |> startWith({ count: 0 });
```

```jsx
<Subject pipeline={pipeline}>
  {(state, send) => (
    <div>
      <button onClick={() => send("SUBTRACT", 1)}>Remove 1</button>
      <button onClick={() => send("ADD", 1)}>Add 1</button>
      <button onClick={() => send("MULTIPLY", 2)}>Multiply by 2</button>
      <div>{state.count}</div>
    </div>
  )}
</Subject>
```

## Debouncing example

```javascript
import { debounce } from "callbag-debounce";

const pipeline = actions =>
  actions
  |> debounce(250)
  |> reducerFromMap(reducers)
  |> startWith({ counter: 1 });
```

## Further reading

* [Callbag basics](https://github.com/staltz/callbag-basics)
* [Callbag wiki](https://github.com/callbag/callbag/wiki)
* [Why we need callbags](https://staltz.com/why-we-need-callbags.html), by André Staltz
