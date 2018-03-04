import { Component } from "react";
import makeSubject from "callbag-subject";
import pipe from "callbag-pipe";
import subscribe from "callbag-subscribe";

export class Subject extends Component {
  constructor(props) {
    super(props);

    this.subject = makeSubject();

    this.state = this.props.initialState;

    pipe(
      this.subject,
      this.props.pipeline,
      subscribe({
        next: state => this.setState(state)
      })
    );

    this.handleSend = data => event => {
      this.subject(1, [this.state, data, event]);
    };
  }

  componentWillMount() {
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
