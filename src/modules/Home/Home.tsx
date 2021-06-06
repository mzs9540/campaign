import { Component } from 'react';

import './Home.scss';

import { DoughnutChart, LineChart } from 'shared/Charts';
import { PageStatus } from 'enums';

type State = {
  status: PageStatus,
  error: string | null,
};

class Home extends Component {
  render() {
    return (
      <section className="home-wrap">
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
                    13, 12, 5,
                  ]}
                />
              </div>
              <div className="summary-text">
                <ul>
                  <li className="green-mark">
                    Notification:
                    <span>{13}</span>
                  </li>
                  <li className="orange-mark">
                    Email:
                    <span>{12}</span>
                  </li>
                  <li className="red-mark">
                    Message:
                    <span>{5}</span>
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
                  ]}
                  values={[
                    13, 12, 5,
                  ]}
                />
              </div>
              <div className="summary-text">
                <ul>
                  <li className="green-mark">
                    Active
                    <span>{13}</span>
                  </li>
                  <li className="orange-mark">
                    Paused
                    <span>{12}</span>
                  </li>
                  <li className="red-mark">
                    Expired
                    <span>{5}</span>
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
                    13, 12,
                  ]}
                />
              </div>
              <div className="summary-text">
                <ul>
                  <li className="green-mark">
                    You
                    <span>
                      {13}
                    </span>
                  </li>
                  <li className="orange-mark">
                    Others
                    <span>
                      {12}
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
      </section>
    );
  }
}

export { Home };
