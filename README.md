Asynchronous reducer pipelines using [callbags](https://github.com/staltz/callbag-basics).

Try it now on [CodeSandbox](https://codesandbox.io/s/mozmv6vrmp).

## Install

```
yarn add react-callbag
```

## Usage

```javascript
import { Subject } from "react-callbag";
import pipe from "callbag-pipe";
import map from "callbag-map";
import skip from "callbag-skip";
import { debounce } from "callbag-debounce";
import startWith from "callbag-start-with";

const operator = source =>
  pipe(
    source,
    skip(1),
    debounce(250),
    map(([state, data, _event]) => ({
      count: state.count + data
    })),
    startWith({ count: 0 })
  );
```

Or if you're blessed with the pipeline operator:

```javascript
const operator = source =>
  source
  |> skip(1)
  |> debounce(250)
  |> map(([state, data, _event]) => ({
    count: state.count + data
  }))
  |> startWith({ count: 0 });
*/
```

```jsx
<Subject operator={operator}>
  {(state, send) => (
    <div>
      <button onClick={send(-1)}>Subtract 1</button>
      <button onClick={send(1)}>Add 1</button>
      <div>{state.count}</div>
    </div>
  )}
</Subject>
```

## Further reading

* [Callbag basics](https://github.com/staltz/callbag-basics)
* [Callbag wiki](https://github.com/callbag/callbag/wiki)
* [Why we need callbags](https://staltz.com/why-we-need-callbags.html), by André Staltz
