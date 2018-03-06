import { Component } from "react";
import makeSubject from "callbag-subject";
import pipe from "callbag-pipe";
import subscribe from "callbag-subscribe";
import map from "callbag-map";
import startWith from "callbag-start-with";

export { default as startWith } from "callbag-start-with";

export const reducerFromMap = reducerMap =>
  map(([state, type, data]) => {
    if (reducerMap.has(type)) {
      return reducerMap.get(type)(state, data);
    } else {
      return state;
    }
  });

export class Subject extends Component {
  constructor(props) {
    super(props);

    this.subject = makeSubject();

    this.state = {};

    this.handleSend = (type, event) => {
      this.subject(1, [this.state, type, event]);
    };
  }

  componentDidMount() {
    pipe(
      this.subject,
      this.props.pipeline,
      subscribe({
        next: state => this.setState(state)
      })
    );

    if (this.props.lifecycle) {
      this.subject(1, [this.state, "componentDidMount", this.props]);
    }
  }

  componentWillUnmount() {
    if (this.props.reducer && this.props.lifecycle) {
      this.subject(1, [this.state, "componentWillUnmount", this.props]);
    }
    this.subject(2); // terminates
  }

  render() {
    if (this.props.render) {
      return this.props.render(this.state, this.handleSend);
    } else {
      return this.props.children(this.state, this.handleSend);
    }
  }
}
