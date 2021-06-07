import { PureComponent } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import accountIconImg from 'images/account_icn.svg';
import activityIconImg from 'images/activity_icn.svg';
import doubtIconImg from 'images/doubt_icn.svg';

type Props = { sideBarClassName: any };

export class Sidebar extends PureComponent<Props> {
  render() {
    return (
      <div className={`sidebar ${this.props.sideBarClassName}`}>
        <Navbar.Brand className="d-flex align-items-center" href="/">
          <span
            className="d-lg-block turq_color mb-0 font-weight-600"
          >
            Campaigns
          </span>
        </Navbar.Brand>

        <ul>
          <li>
            <Link to="/" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={accountIconImg}
                  alt="dashboard-icon"
                />
              </span>
              Home
            </Link>
          </li>

          <li>
            <Link to="/campaigns" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={activityIconImg}
                  alt="dashboard-icon"
                />
              </span>
              All campaigns
            </Link>
          </li>
          <li>
            <Link to="/campaigns/create" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={doubtIconImg}
                  alt="dashboard-icon"
                />
              </span>
              Create campaign
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
