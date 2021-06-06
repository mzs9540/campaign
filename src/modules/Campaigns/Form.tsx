import { Component } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { RouteComponentProps } from 'react-router';
import { Alert } from 'react-bootstrap';

import './Form.scss';

import { FormData } from './interfaces';
import { validateForm } from './helpers';

import { CampaignAPI } from 'API/CampaignAPI';
import { Show, Spinner } from 'shared';
import {
  DateInput, Input, Select, Textarea,
} from 'shared/Inputs';
import { CampaignType, PageStatus } from 'enums';

type Props = InjectedFormProps<FormData, any> & RouteComponentProps;

type State = {
  status: PageStatus,
  error: string | null,
};

class Form extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
    };
  }

  async onSubmit(values) {
    const campaign = new CampaignAPI();
    try {
      this.setState({ status: PageStatus.Submitting });
      await campaign.createCampaign(values);
      this.setState({ status: PageStatus.Submitted });
    } catch (err) {
      this.setState({ status: PageStatus.Error, error: err.message });
    }
  }

  isShowForm(): boolean {
    return this.state.status === PageStatus.Error
        || this.state.status === PageStatus.None
        || this.state.status === PageStatus.Submitting
        || this.state.status === PageStatus.Submitted;
  }

  render() {
    return (
      <section className="campaigns-create-wrap">
        <Show when={this.state.status === PageStatus.Loading}>
          <div className="d-flex justify-content-center p-5">
            <Spinner />
          </div>
        </Show>

        <Show when={this.isShowForm()}>
          <div className="campaigns-form">
            <form
              className="signup-form"
              onSubmit={this.props.handleSubmit(
                (e) => this.onSubmit(e),
              )}
            >
              <Select label="Type*" name="type">
                <option disabled value="">Select campaign type</option>
                <option value={CampaignType.Email}>Email campaign</option>
                <option value={CampaignType.Message}>Message campaign</option>
                <option value={CampaignType.PushNotification}>
                  Push notification campaign
                </option>
              </Select>

              <Input label="Title*" name="title" />

              <Textarea label="Description" name="description" />

              <div className="form-row">
                <div className="col-12 col-md-6">
                  <DateInput label="Starts At*" name="startsAt" />
                </div>

                <div className="col-12 col-md-6">
                  <DateInput label="Ends At*" name="endsAt" />
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <button
                  type="submit"
                  className="btn turquoise-btn mr-4"
                  disabled={
                    this.props.submitting
                      || this.props.invalid
                      || this.props.pristine
                  }
                >
                  Create campaign
                </button>

                <Show when={this.state.status === PageStatus.Submitting}>
                  <Spinner />
                </Show>
              </div>

              <Alert
                show={this.state.status === PageStatus.Error}
                variant="danger"
              >
                {this.state.error}
              </Alert>

              <Alert
                show={this.state.status === PageStatus.Submitted}
                variant="success"
              >
                Campaign created successfully
              </Alert>
            </form>
          </div>
        </Show>
      </section>
    );
  }
}

const FormWithRedux = reduxForm<FormData, any>({
  form: 'campaignForm',
  validate: validateForm,
})(Form);

export { FormWithRedux as Form };
