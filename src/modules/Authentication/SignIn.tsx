import React from 'react';
import {
  Field,
  formValueSelector,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';

import { Verify } from './Verify';
import { user } from './authentication.actions';

import { AuthenticationAPI } from 'API';
import { PageStatus } from 'enums';
import eduLogo from 'images/edu-logo.svg';
import { AuthenticationLayout } from 'layouts';
import { Spinner, Show } from 'shared';

function normalizePhone(value, previousValue) {
  return !value.includes('-') && value.length <= 10 ? value : previousValue;
}

const phoneRegex = () => new RegExp('^(0|[1-9][0-9]{9})$');
const validatePhoneNumber = (value) => value && !phoneRegex().test(value);
const required = (value) => !value;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props =
    InjectedFormProps<any, any, string>
    & PropsFromRedux
    & RouteComponentProps;

type State = {
  showOtpScreen: boolean,
  status: PageStatus,
  error: any,
};

class SignIn extends React.Component<InjectedFormProps<Props> & Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showOtpScreen: false,
      status: PageStatus.None,
      error: null,
    };
  }

  onSubmit(values) {
    try {
      const auth = new AuthenticationAPI();
      const otp = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`;
      if (!otp) {
        return this.setState({
          status: PageStatus.Error,
          error: 'Something went wrong!!',
        });
      }

      return Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Submitting }))
        .then(() => auth.signIn(otp, values.phone))
        .then((userDetails) => {
          return this.props.user(userDetails);
        })
        .then(() => this.historyCallback())
        .catch((error) => {
          this.setState({ status: PageStatus.Error, error: error.message });
        });
    } catch {
      return this.setState({
        status: PageStatus.Error,
        error: 'Something went wrong!!',
      });
    }
  }

  sendOtp() {
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => this.setState({
        status: PageStatus.Submitted,
        showOtpScreen: true,
      }))
      .catch((error) => {
        this.setState({ error: error.message, status: PageStatus.Error });
      });
  }

  showOtpScreen() {
    if (!this.props.phone) {
      return this.setState({
        status: PageStatus.Error,
        error: 'Please enter phone number.',
      });
    }

    return this.setState({ showOtpScreen: true });
  }

  historyCallback() {
    this.props.history.push('/');
  }

  render() {
    return (
      <AuthenticationLayout>
        <div className={'d-flex align-items-center justify-content-center'
          + ' w-100 h-100'}
        >
          <div className="col-11 col-lg-10 col-md-10">
            <form
              className="login_form"
              onSubmit={this.props.handleSubmit(
                (event) => this.onSubmit(event),
              )}
            >
              <Show when={!this.state.showOtpScreen}>
                <h2 className="mb-4">
                  Sign in to
                  {' '}
                  <a href="/">
                    <img
                      className="h-40p w-40p mr-2"
                      src={eduLogo}
                      alt="logo"
                    />
                    <span className="turq_color">LMS</span>
                  </a>
                </h2>
                <div className="form-group mb-4">
                  <label
                    htmlFor="phoneLogin"
                    className="text-a-d-3 h6 font-weight-600"
                  >
                    Phone
                  </label>
                  <div className="input-group position-relative h-40p">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-a-3">+91</div>
                    </div>
                    <Field
                      component="input"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') e.preventDefault();
                      }}
                      type="number"
                      name="phone"
                      validate={[
                        validatePhoneNumber,
                        required,
                      ]}
                      className="form-control h-40p"
                      id="phoneLogin"
                      normalize={normalizePhone}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <button
                    type="button"
                    className="btn turquoise-btn"
                    onClick={() => this.sendOtp()}
                    disabled={validatePhoneNumber(this.props.phone)}
                  >
                    Login
                    <FontAwesomeIcon
                      className="ml-2"
                      icon={['fas', 'sign-in-alt']}
                    />
                  </button>

                  <div>
                    <button
                      type="button"
                      onClick={() => this.showOtpScreen()}
                      className="link bg-transparent mx-2"
                    >
                      Already have an OTP?
                    </button>
                  </div>

                  <Show when={this.state.status === PageStatus.Submitting}>
                    <Spinner />
                  </Show>
                </div>
                <span>
                  {' '}
                  Not a member?
                  {' '}
                  <Link className="link" to="/auth/signup">Sign up now</Link>
                </span>

                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => this.setState({ status: PageStatus.None })}
                  show={
                    this.state.status === PageStatus.Error
                        && !this.state.showOtpScreen
                  }
                  className="mt-4"
                >
                  {this.state.error}
                </Alert>
              </Show>

              <Show when={this.state.showOtpScreen}>
                <Verify
                  editDetailsCallback={() => this.setState({
                    showOtpScreen: false,
                  })}
                  invalid={this.props.invalid}
                  phone={this.props.phone}
                  submitting={this.props.submitting}
                  error={this.state.error}
                  hideError={() => {
                    this.setState({ error: null, status: PageStatus.None });
                  }}
                />
              </Show>
            </form>
          </div>
        </div>
      </AuthenticationLayout>
    );
  }
}

const SignInWithRedux = reduxForm<any, any>({ form: 'signInForm' })(SignIn);

const selector = formValueSelector('signInForm');

const mapStateToProps = (state) => {
  const phone = selector(state, 'phone') || null;
  return { phone };
};

const connector = connect(mapStateToProps, { user });

const SignInWithState = connector(SignInWithRedux);

const SignInWithRouter = withRouter(SignInWithState);

export { SignInWithRouter as SignIn };
