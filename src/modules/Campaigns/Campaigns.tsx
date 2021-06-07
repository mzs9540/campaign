import { Component } from 'react';
import { Alert } from 'react-bootstrap';

import './Campaigns.scss';

import { List } from './List';
import { Filters } from './Filters';

import { Show, Spinner } from 'shared';
import { CampaignAPI } from 'API/CampaignAPI';
import { Campaign } from 'API/interfaces';
import { CampaignStatus, CampaignType, PageStatus } from 'enums';

type State = {
  status: PageStatus,
  campaigns: Campaign[] | null,
  filters: {
    type: CampaignType | null,
    status: CampaignStatus | null,
  }
  error: string | null,
};

class Campaigns extends Component<any, State> {
  campaignAPI: CampaignAPI;

  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      campaigns: null,
      filters: {
        type: null,
        status: null,
      },
      error: null,
    };

    this.campaignAPI = new CampaignAPI();
  }

  componentDidMount() {
    this.fetchCampaigns();
  }

  fetchCampaigns(filters?: {
    type?: CampaignType,
    status?: CampaignStatus,
  }) {
    try {
      Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => this.campaignAPI.getCampaigns({
          type: filters?.type,
          status: filters?.status,
        }))
        .then((campaigns) => {
          this.setState({ status: PageStatus.Loaded, campaigns });
        })
        .catch((err) => {
          this.setState({ status: PageStatus.Error, error: err.message });
        });
    } catch (err) {
      this.setState({ status: PageStatus.Error, error: err.message });
    }
  }

  onResetFilters() {
    this.setState({ filters: { type: null, status: null } });
    this.fetchCampaigns();
  }

  onChangeStatusFilter(status: CampaignStatus) {
    this.setState({ filters: { status, type: null } });
    this.fetchCampaigns({ status });
  }

  onChangeTypeFilter(type: CampaignType) {
    this.setState({ filters: { type, status: null } });
    this.fetchCampaigns({ type });
  }

  render() {
    return (
      <div className="all-campaigns-wrap">
        <Show when={this.state.status === PageStatus.Loading}>
          <div className="d-flex justify-content-center p-5">
            <Spinner />
          </div>
        </Show>

        <Show when={this.state.status === PageStatus.Loaded}>
          <div className="campaigns-header-wrap">
            <h3>Campaigns</h3>

            <div className="mr-4">
              <Filters
                type={this.state.filters.type}
                status={this.state.filters.status}

                onReset={() => {
                  this.onResetFilters();
                }}
                onSelectStatus={(status) => {
                  this.onChangeStatusFilter(status);
                }}
                onSelectType={(type) => {
                  this.onChangeTypeFilter(type);
                }}
              />
            </div>
          </div>

          <List campaigns={this.state.campaigns} />
        </Show>

        <Alert show={this.state.status === PageStatus.Error} variant="danger">
          {this.state.error}
        </Alert>

        <Alert
          show={
            this.state.status === PageStatus.Loaded
              && !this.state.campaigns?.length
          }
          variant="warning"
        >
          No campaigns found.
        </Alert>
      </div>
    );
  }
}

export { Campaigns };
