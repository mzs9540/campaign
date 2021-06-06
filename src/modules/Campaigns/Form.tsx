import { Component } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { RouteComponentProps, withRouter } from 'react-router';
import { Alert } from 'react-bootstrap';

import './Form.scss';

import { FormData } from './interfaces';
import { validateForm } from './helpers';

import { CampaignId } from 'interfaces';
import { lang } from 'lang';
import { inputFormat } from 'utilities/dates';
import { Campaign } from 'API/interfaces';
import { CampaignAPI } from 'API/CampaignAPI';
import { Show, Spinner } from 'shared';
import {
  DateInput, Input, Select, Textarea,
} from 'shared/Inputs';
import { CampaignType, PageStatus } from 'enums';
import { getParam } from 'utilities/helper';

type Props =
    InjectedFormProps<FormData, any>
    & RouteComponentProps<{ campaignId: string }>;

type State = {
  status: PageStatus,
  campaign: Campaign | null,
  error: string | null,
};

class Form extends Component<Props, State> {
  campaign: CampaignAPI | null;
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      campaign: null,
      error: null,
    };

    this.campaign = new CampaignAPI();
  }

  componentDidMount() {
    const campaignId = getParam<CampaignId>(this, 'campaignId');
    if (!!campaignId) {
      this.fetchCampaign(campaignId).then(() => {
        const { campaign } = this.state;
        if (!campaign) return null;
        const values: FormData = {
          type: campaign.type,
          title: campaign.title,
          description: campaign.description,
          startsAt: inputFormat(campaign.startsAt || null),
          endsAt: inputFormat(campaign.endsAt || null),
        };
        return this.props.initialize(values);
      }).catch((err) => {
        this.setState({ error: err.message, status: PageStatus.Error });
      });
    }
  }

  fetchCampaign(campaignId: CampaignId) {
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => {
        try {
          return this.campaign?.getCampaign(campaignId) || null;
        } catch {
          return Promise.reject(new Error(lang.unknownError));
        }
      })
      .then((campaign) => {
        this.setState({ campaign, status: PageStatus.Loaded });
      })
      .catch((err) => {
        this.setState({ error: err.message, status: PageStatus.Error });
      });
  }

  onSubmit(values) {
    const campaignId = getParam<CampaignId>(this, 'campaignId');
    if (!!campaignId) {
      return this.updateCampaign(campaignId, values);
    }
    return this.createCampaign(values);
  }

  createCampaign(values) {
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => this.campaign?.createCampaign(values))
      .then(() => this.setState({ status: PageStatus.Submitted }))
      .catch((err) => {
        this.setState({ error: err.message, status: PageStatus.Error });
      });
  }

  updateCampaign(campaignId: CampaignId, values) {
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => this.campaign?.updateCampaign(campaignId, values))
      .then(() => this.setState({ status: PageStatus.Submitted }))
      .catch((err) => {
        this.setState({ error: err.message, status: PageStatus.Error });
      });
  }

  isShowForm(): boolean {
    return this.state.status === PageStatus.Error
        || this.state.status === PageStatus.None
        || this.state.status === PageStatus.Submitting
        || this.state.status === PageStatus.Loaded
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
                  Submit campaign
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
                Campaign submitted successfully
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

const FormWithRouter = withRouter(FormWithRedux);

export { FormWithRouter as Form };
