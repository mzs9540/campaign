import React from 'react';
import { Alert } from 'react-bootstrap';

import { PageStatus } from 'enums';
import { Timer, Show, Spinner } from 'shared';

const TIMER_SEC = 150;

type State = {
  status: PageStatus,
  error: any,
  duration: number,
};

type Props = {
  phone: string | null,
};

export class ResendOTP extends React.Component<Props, State> {
  timer: NodeJS.Timer | null = null;

  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      duration: TIMER_SEC,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => this.onTimer(), 1000);
  }

  stopTimer() {
    if (!!this.timer) {
      clearInterval(this.timer);
    }
  }

  onTimer() {
    this.setState((state) => {
      return {
        duration: state.duration - 1,
      };
    });
  }

  resendOtp() {
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => this.setState({
        status: PageStatus.Submitted,
      }))
      .then(() => this.startTimer())
      .catch((error) => {
        this.setState({ status: PageStatus.Error, error: error.message });
      });
  }

  render() {
    return (
      <>
        <Show when={this.state.duration <= 0}>
          <button
            type="button"
            onClick={() => this.resendOtp()}
            className="text-a-d-3 font-weight-bolder bg-white mr-4"
          >
            Resend OTP
          </button>
        </Show>

        <Show when={this.state.status === PageStatus.Submitting}>
          <Spinner />
        </Show>

        <Show when={this.state.duration > 0}>
          <div className="d-flex align-items-center h-40p">
            <div className="font-weight-bolder mr-2 text-muted">
              Resend OTP in
            </div>

            <Timer
              duration={this.state.duration}

              onTimeUp={() => {
                this.stopTimer();
              }}
            />
          </div>
        </Show>

        <Alert
          dismissible
          onClose={() => {
            this.setState({ status: PageStatus.None });
          }}
          show={this.state.status === PageStatus.Error}
          variant="danger"
        >
          {this.state.error}
        </Alert>

        <Alert
          dismissible
          onClose={() => this.setState({ status: PageStatus.None })}
          show={this.state.status === PageStatus.Submitted}
          variant="success"
        >
          OTP sent successfully.
        </Alert>
      </>
    );
  }
}
