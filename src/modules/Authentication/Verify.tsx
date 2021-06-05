import React from 'react';
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';

import { ResendOTP } from './ResendOTP';

import { Spinner, Show } from 'shared';

function normalizeOtp(value) {
  return value >= 0 && value < 10 && !value.includes('-') && value.length <= 1
    ? value : value % 10;
}

function renderField({ input, type, ...inputProps }, ref) {
  return <input {...input} type={type} ref={ref} {...inputProps} />;
}

type Props = {
  phone: string | null,
  submitting: boolean,
  invalid: boolean,
  error: any

  editDetailsCallback: () => void,
  hideError: () => void,
};

export class Verify extends React.Component<Props, any> {
  otpRef1: any;
  otpRef2: any;
  otpRef3: any;
  otpRef4: any;

  constructor(props) {
    super(props);

    this.otpRef1 = React.createRef();
    this.otpRef2 = React.createRef();
    this.otpRef3 = React.createRef();
    this.otpRef4 = React.createRef();
  }

  componentDidMount() {
    this.setInitialFocus();
  }

  setInitialFocus() {
    return this.otpRef1.current.focus();
  }

  handleFocusChange(event) {
    const { key } = event;

    const isCurrent = (ref) => ref.current === event.target;
    const isNumeric = () => parseInt(key, 10) >= 0 && parseInt(key, 10) < 9;
    const isBackspace = () => key === 'Backspace';

    if (!event.shiftKey && !event.ctrlKey) {
      if (isCurrent(this.otpRef1) && isNumeric()) {
        return this.otpRef2.current.focus();
      }
      if (isCurrent(this.otpRef2)) {
        if (isNumeric()) {
          return this.otpRef3.current.focus();
        }
        if (isBackspace()) {
          return this.otpRef1.current.focus();
        }
      } else if (isCurrent(this.otpRef3)) {
        if (isNumeric()) {
          return this.otpRef4.current.focus();
        } if (isBackspace()) {
          return this.otpRef2.current.focus();
        }
      } else if (isCurrent(this.otpRef4)) {
        if (isBackspace()) {
          return this.otpRef3.current.focus();
        }
      }
    }

    return null;
  }

  render() {
    return (
      <>
        <h2 className="text-a-d-3 mb-4">
          Enter OTP
        </h2>

        <div className="mb-3">
          We have sent a 4 digit OTP to
          {' '}
          {this.props.phone}
        </div>
        <div className="form-group mb-4">
          <label
            className="text-a-d-3 h6 font-weight-600"
            htmlFor="otpLogin"
          >
            OTP
          </label>
          <div className="d-flex align-items-center">
            <Field
              name="otp1"
              type="number"
              className="form-control w-50p mr-3"
              id="otpLogin"
              component={(e) => renderField(e, this.otpRef1)}
              onKeyUp={(e) => this.handleFocusChange(e)}
              normalize={normalizeOtp}
              required
            />
            <Field
              name="otp2"
              type="number"
              className="form-control w-50p mr-3"
              id="otpLogin"
              component={(e) => renderField(e, this.otpRef2)}
              onKeyUp={(e) => this.handleFocusChange(e)}
              normalize={normalizeOtp}
              required
            />
            <Field
              name="otp3"
              type="number"
              className="form-control w-50p mr-3"
              id="otpLogin"
              component={(e) => renderField(e, this.otpRef3)}
              onKeyUp={(e) => this.handleFocusChange(e)}
              normalize={normalizeOtp}
              required
            />
            <Field
              name="otp4"
              type="number"
              className="form-control w-50p"
              id="otpLogin"
              component={(e) => renderField(e, this.otpRef4)}
              onKeyUp={(e) => this.handleFocusChange(e)}
              normalize={normalizeOtp}
              required
            />
          </div>
        </div>

        <div className="d-flex align-items-center mb-4">
          <button
            type="submit"
            className="btn turquoise-btn mr-4"
            disabled={this.props.submitting || this.props.invalid}
          >
            Verify
            <FontAwesomeIcon className="ml-2" icon={['fas', 'check']} />
          </button>

          <button
            type="button"
            onClick={this.props.editDetailsCallback}
            className="btn default-btn mr-4"
          >
            Edit Details
            <FontAwesomeIcon className="ml-2" icon={['fas', 'pen']} />
          </button>

          <Show when={this.props.submitting}>
            <Spinner />
          </Show>
        </div>

        <ResendOTP phone={this.props.phone} />

        <Alert
          dismissible
          onClose={() => {
            this.props.hideError();
          }}
          show={!!this.props.error}
          variant="danger"
        >
          {this.props.error}
        </Alert>
      </>
    );
  }
}
