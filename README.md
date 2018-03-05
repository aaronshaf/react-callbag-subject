Asynchronous reducer pipelines using [callbags](https://github.com/staltz/callbag-basics).

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

const initialState = { count: 0 };

const operator = source =>
  pipe(
    source,
    skip(1),
    debounce(250),
    map(([state, data, _event]) => ({
      count: state.count + data
    }))
  );
```

```jsx
<Subject initialState={initialState} operator={operator}>
  {(state, send) => (
    <div>
      <button onClick={send(1)}>Add 1</button>
      <button onClick={send(2)}>Add 2</button>
      <div>{state.count}</div>
    </div>
  )}
</Subject>
```

## Further reading

* [Callbag basics](https://github.com/staltz/callbag-basics)
* [Callbag wiki](https://github.com/callbag/callbag/wiki)
* [Why we need callbags](https://staltz.com/why-we-need-callbags.html), by André Staltz
