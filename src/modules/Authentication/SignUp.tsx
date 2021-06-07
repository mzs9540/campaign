import React from 'react';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import { Verify } from './Verify';
import { user } from './authentication.actions';
import { SignUpFormFields } from './SignUpFormFields';

import { AuthenticationLayout } from 'layouts';
import { AuthenticationAPI } from 'API';
import { Spinner, Show } from 'shared';
import { PageStatus } from 'enums';

const emailRegex = () => new RegExp(
  '(?:[a-z0-9!#$%&\'*+/=?^_'
    + '{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_'
    + '{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|'
    + '\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'
    + '\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?'
    + '[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]'
    + '*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-'
    + '\x09\x0b\x0c\x0e-\\x7f])+)\\])',
);

const emailCheck = (value) => (
  value && !emailRegex().test(value)
);
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

class SignUp extends React.Component<Props, State> {
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
        .then(() => auth.signUp(otp, values))
        .then((userDetails) => this.props.user(userDetails))
        .then(() => this.historyCallback())
        .catch((error) => {
          this.setState({ status: PageStatus.Error, error: error.message });
        });
    } catch {
      return this.setState({
        status:
        PageStatus.Error,
        error: 'Something went wrong.',
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

  // @todo: Lang.
  showOtpScreen() {
    if (!this.isDisabled()) {
      return this.setState({
        status: PageStatus.Error,
        error: 'Please check all required fields.',
      });
    }

    return this.setState({
      showOtpScreen: true,
    });
  }

  historyCallback() {
    this.props.history.push('/');
  }

  isDisabled() {
    return !emailCheck(this.props.email)
        && this.props.name.length > 0
        && this.props.phone.length === 10;
  }

  render() {
    return (
      <AuthenticationLayout>
        <div className={'d-flex align-items-center justify-content-center'
          + ' w-100 h-100'}
        >
          <div className="col-12 col-lg-9 col-md-11 si">
            <form
              className="signup_form"
              onSubmit={this.props.handleSubmit(
                (e) => this.onSubmit(e),
              )}
            >
              <Show when={!this.state.showOtpScreen}>
                <SignUpFormFields emailCheck={emailCheck} />

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

                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="btn turquoise-btn"
                    disabled={!this.isDisabled()}
                    onClick={() => this.sendOtp()}
                  >
                    Sign Up
                    <FontAwesomeIcon
                      className="ml-2"
                      icon={['fas', 'user-plus']}
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

                <div className="mt-3">
                  {' '}
                  Already a member?
                  {' '}
                  <Link className="link font-weight-600" to="/auth/login">
                    Log in
                  </Link>
                </div>
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

const SignUpWithRedux = reduxForm<any, any>({ form: 'signUpForm' })(SignUp);

const selector = formValueSelector('signUpForm');

const mapStateToProps = (state) => {
  const phone = selector(state, 'phone') || '';
  const email = selector(state, 'email') || '';
  const name = selector(state, 'name') || '';
  return {
    phone,
    email,
    name,
  };
};

const connector = connect(mapStateToProps, { user });

const SignUpWithState = connector(SignUpWithRedux);

const SignUpWithRouter = withRouter(SignUpWithState);

export { SignUpWithRouter as SignUp };
