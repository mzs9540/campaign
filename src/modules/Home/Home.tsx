import { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import './Home.scss';

import { Card } from '../Campaigns/Card';

import { CampaignAPI } from 'API/CampaignAPI';
import { Show, Spinner } from 'shared';
import { DoughnutChart, LineChart } from 'shared/Charts';
import { CampaignStatus, CampaignType, PageStatus } from 'enums';
import { Campaign } from 'API/interfaces';
import { UserId } from 'interfaces';

type Props = ConnectedProps<typeof connector> & RouteComponentProps;

type State = {
  status: PageStatus,
  campaigns: Campaign[],
  recentCampaigns: Campaign[],
  pushNotificationCampaigns: Campaign[],
  emailCampaigns: Campaign[],
  messageCampaigns: Campaign[],
  error: string | null,
};

class Home extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      campaigns: [],
      pushNotificationCampaigns: [],
      emailCampaigns: [],
      messageCampaigns: [],
      recentCampaigns: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    try {
      const campaign = new CampaignAPI();
      Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => Promise.all([
          campaign.getCampaigns(),
          campaign.getCampaigns({ filter: CampaignType.Message }),
          campaign.getCampaigns({ filter: CampaignType.Email }),
          campaign.getCampaigns({ filter: CampaignType.PushNotification }),
          campaign.getCampaigns({ total: 10 }),
        ]))
        .then(([
          campaigns,
          messageCampaigns,
          emailCampaigns,
          pushNotificationCampaigns,
          recentCampaigns,
        ]) => {
          console.log('recentCampaigns', recentCampaigns);
          this.setState({
            campaigns,
            messageCampaigns,
            emailCampaigns,
            recentCampaigns,
            pushNotificationCampaigns,
            status: PageStatus.Loaded,
          });
        })
        .catch((error) => {
          this.setState({ status: PageStatus.Error, error: error.message });
        });
    } catch (err) {
      this.setState({ status: PageStatus.Error, error: err.message });
    }
  }

  filterByStatus(status: CampaignStatus) {
    return this.state.campaigns.filter((campaign) => {
      return campaign.status === status;
    });
  }

  filterByUser(userId: UserId) {
    return this.state.campaigns.filter((campaign) => {
      return campaign.createdBy.id === userId;
    });
  }

  render() {
    const activeCampaign = this.filterByStatus(CampaignStatus.Active);
    const upcomingCampaign = this.filterByStatus(CampaignStatus.Upcoming);
    const pausedCampaign = this.filterByStatus(CampaignStatus.Paused);
    const expiredCampaign = this.filterByStatus(CampaignStatus.Expired);
    const createdByMe = this.filterByUser(this.props.userId);

    return (
      <section className="home-wrap">
        <Show when={this.state.status === PageStatus.Loading}>
          <div className="d-flex justify-content-center p-5">
            <Spinner />
          </div>
        </Show>

        <Show when={this.state.status === PageStatus.Loaded}>
          <h2 className="mb-3">Campaign Dashboard</h2>

          <div className="summary-wrap">
            <div className="summary-box">
              <h5>
                Campaign types
              </h5>
              <div className="summary-content">
                <div className="graph">
                  <DoughnutChart
                    backgroundColors={[
                      'rgba(69, 166, 100,0.9)',
                      'rgba(255, 191, 0, 0.9)',
                      'rgba(235, 59, 30, 0.9)',
                    ]}
                    values={[
                      this.state.pushNotificationCampaigns.length,
                      this.state.emailCampaigns.length,
                      this.state.messageCampaigns.length,
                    ]}
                  />
                </div>
                <div className="summary-text">
                  <ul>
                    <li className="green-mark">
                      Notification:
                      <span>{this.state.pushNotificationCampaigns.length}</span>
                    </li>
                    <li className="orange-mark">
                      Email:
                      <span>{this.state.emailCampaigns.length}</span>
                    </li>
                    <li className="red-mark">
                      Message:
                      <span>{this.state.messageCampaigns.length}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="summary-box">
              <h5>
                Campaign state
              </h5>
              <div className="summary-content">
                <div className="graph">
                  <DoughnutChart
                    backgroundColors={[
                      'rgba(69, 166, 100,0.9)',
                      'rgba(255, 191, 0, 0.9)',
                      'rgba(235, 59, 30, 0.9)',
                      'rgba(145, 80, 80, 0.9)',
                    ]}
                    values={[
                      activeCampaign.length,
                      pausedCampaign.length,
                      expiredCampaign.length,
                      upcomingCampaign.length,
                    ]}
                  />
                </div>
                <div className="summary-text">
                  <ul>
                    <li className="green-mark">
                      Active
                      <span>{activeCampaign.length}</span>
                    </li>
                    <li className="orange-mark">
                      Paused
                      <span>{pausedCampaign.length}</span>
                    </li>
                    <li className="red-mark">
                      Expired
                      <span>{expiredCampaign.length}</span>
                    </li>
                    <li className="brown-mark">
                      Upcoming
                      <span>{upcomingCampaign.length}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="summary-box">
              <h5>
                Create by
              </h5>
              <div className="summary-content">
                <div className="graph">
                  <DoughnutChart
                    backgroundColors={[
                      'rgba(69, 166, 100,0.9)',
                      'rgba(255, 191, 0, 0.9)',
                    ]}
                    values={[
                      createdByMe.length,
                      this.state.campaigns.length,
                    ]}
                  />
                </div>
                <div className="summary-text">
                  <ul>
                    <li className="green-mark">
                      You
                      <span>
                        {createdByMe.length}
                      </span>
                    </li>
                    <li className="orange-mark">
                      Others
                      <span>
                        {this.state.campaigns.length - createdByMe.length}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="campaigns-stats-wrap">
            <h4>Compare With Others</h4>
            <p>Demonstrate your performance with respect to others.</p>
            <LineChart />
          </div>

          <div className="campaigns-wrap">
            <div className="d-flex align-items-center justify-content-between">
              <div className="my-3 h4">Recent campaigns</div>

              <Link to="/campaigns" className="turq_color mr-3">
                View all
              </Link>
            </div>
            <div className="campaigns-row">
              {
                this.state.recentCampaigns.map((campaign) => (
                  <Card campaign={campaign} />
                ))
              }
            </div>
          </div>
        </Show>

        <Alert show={this.state.status === PageStatus.Error} variant="danger">
          {this.state.error}
        </Alert>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.users.id,
});

const connector = connect(mapStateToProps);

const HomeWithState = connector(Home);

const HomeWithRouter = withRouter(HomeWithState);

export { HomeWithRouter as Home };
