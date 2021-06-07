import { PureComponent } from 'react';

type State = {
  title: string | null,
};

type Props = {
  title: string,
};

export class DocumentTitle extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
    };
  }

  componentDidMount() {
    const previousTitle = document.title;
    this.setState({ title: previousTitle });
    document.title = this.props.title;
  }

  componentWillUnmount() {
    document.title = this.state.title || '';
  }

  render() {
    return null;
  }
}
