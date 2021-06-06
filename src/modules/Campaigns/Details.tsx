import React, { PureComponent } from 'react';
import { Alert } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router';

import './Details.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Header } from './Header';
import { Status } from './Status';
import { Menu } from './Menu';

import { utcToLocalDateTime } from 'utilities/dates';
import { CampaignId } from 'interfaces';
import { Show, Spinner } from 'shared';
import { getParam } from 'utilities/helper';
import calendar from 'images/calendar.svg';
import { CampaignStatus, CampaignType, PageStatus } from 'enums';
import { Campaign } from 'API/interfaces';
import { CampaignAPI } from 'API/CampaignAPI';

type Props = RouteComponentProps<{ campaignId: string }>;

type State = {
  status: PageStatus,
  campaign: Campaign | null,
  error: string | null,
};

class Details extends PureComponent<Props, State> {
  campaignAPI: CampaignAPI;

  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      campaign: null,
      error: null,
    };
    this.campaignAPI = new CampaignAPI();
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails() {
    const campaignId = getParam<CampaignId>(this, 'campaignId');
    Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => this.campaignAPI.getCampaign(campaignId))
      .then((campaign) => {
        this.setState({ campaign, status: PageStatus.Loaded });
      })
      .catch((err) => {
        this.setState({ error: err.message, status: PageStatus.Error });
      });
  }

  changeStatus(status: CampaignStatus, campaignId: CampaignId | null) {
    if (!campaignId) {
      return this.setState({
        status: PageStatus.Error,
        error: 'CampaignId not valid',
      });
    }
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => this.campaignAPI.changeStatus(campaignId, status))
      .then(() => this.campaignAPI.getCampaign(campaignId))
      .then((campaign) => {
        this.setState({ campaign, status: PageStatus.Loaded });
      })
      .catch((err) => {
        this.setState({ error: err.message, status: PageStatus.Error });
      });
  }

  deleteCampaign(campaignId: CampaignId | null) {
    if (!campaignId) {
      return this.setState({
        status: PageStatus.Error,
        error: 'CampaignId not valid',
      });
    }
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => this.campaignAPI.deleteCampaign(campaignId))
      .then(() => {
        this.props.history.push('/campaigns');
      })
      .catch((err) => {
        this.setState({ error: err.message, status: PageStatus.Error });
      });
  }

  render() {
    const { campaign } = this.state;

    return (
      <section className="campaigns-details-wrap">
        <Show when={this.state.status === PageStatus.Loading}>
          <div className="w-100 vh-100 p-5 d-flex justify-content-center">
            <Spinner />
          </div>
        </Show>

        <Alert show={this.state.status === PageStatus.Error} variant="danger">
          {this.state.error}
        </Alert>

        <Show when={this.state.status === PageStatus.Loaded}>
          <Header />

          <div className="campaign-card-summary w-100">
            <div className="d-flex align-items-center justify-content-between">
              <h3>Campaign Details</h3>

              <div className="d-flex align-items-center">
                <Status
                  status={campaign?.status || null}

                  onChangeStatus={(status) => {
                    this.changeStatus(status, campaign?.id || null);
                  }}
                />

                <Menu
                  onDelete={() => {
                    this.deleteCampaign(campaign?.id || null);
                  }}
                  onUpdate={() => {
                    this.props.history.push(
                      `/campaigns/${campaign?.id}/update`,
                    );
                  }}
                />
              </div>
            </div>

            <hr />

            <h4 className="dashboard-header">
              {campaign?.title}
            </h4>

            <div className="campaign-type mr-2">
              <Show when={campaign?.type === CampaignType.PushNotification}>
                Push Notifications Campaign
              </Show>

              <Show when={campaign?.type === CampaignType.Message}>
                Message Campaign
              </Show>

              <Show when={campaign?.type === CampaignType.Email}>
                Email Campaign
              </Show>
            </div>

            <div className="campaign-status mb-3">
              <Show when={campaign?.status === CampaignStatus.Active}>
                Active
              </Show>

              <Show when={campaign?.status === CampaignStatus.Upcoming}>
                Upcoming
              </Show>

              <Show when={campaign?.status === CampaignStatus.Paused}>
                Paused
              </Show>

              <Show when={campaign?.status === CampaignStatus.Expired}>
                Expired
              </Show>
            </div>

            <p>
              {campaign?.description}
            </p>

            <div className="campaign-thumb mb-3">
              <img src={calendar} alt="calendar" />
              <small>
                <b>Starts At:</b>
                {' '}
                {utcToLocalDateTime(campaign?.startsAt || null)}
                <span>
                  -
                  {' '}
                  <b>Ends At:</b>
                  {' '}
                  {utcToLocalDateTime(campaign?.endsAt || null)}
                </span>
              </small>
            </div>

            <div>
              <span className="font-weight-bolder">
                <FontAwesomeIcon
                  icon={['fas', 'edit']}
                  className="mr-2 text-17"
                />
                Last Updated at:
              </span>
              {' '}
              {utcToLocalDateTime(campaign?.updatedAt || null)}
            </div>

            <hr />

            <h5>Created by</h5>

            <div className="font-weight-bolder mb-3">
              {campaign?.createdBy.name}
            </div>
          </div>

        </Show>
      </section>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export { DetailsWithRouter as Details };
