import { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { secondsToTimeAsString } from 'utilities/helper';

type Props = {
  duration: number | null,

  onTimeUp: () => void,
};

class Timer extends PureComponent<Props, any> {
  componentDidMount() {
    if (this.isTimeUp()) {
      this.props.onTimeUp();
    }
  }

  componentDidUpdate() {
    if (this.isTimeUp()) {
      this.props.onTimeUp();
    }
  }

  isTimeUp() {
    return !!this.props.duration && this.props.duration <= 0;
  }

  render() {
    const timer = secondsToTimeAsString(this.props.duration || 0);
    return (
      <>
        <FontAwesomeIcon className="mr-2" icon={['fas', 'stopwatch']} />
        <span>{timer}</span>
      </>
    );
  }
}

export { Timer };
