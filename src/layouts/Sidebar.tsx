import { PureComponent } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import eduLogo from 'images/edu-logo.svg';
import universityIconImg from 'images/university_icn.svg';
import accountIconImg from 'images/account_icn.svg';
import activityIconImg from 'images/activity_icn.svg';
import doubtIconImg from 'images/doubt_icn.svg';
import bookmarkIconImg from 'images/bookmark_icn.svg';
import notesIconImg from 'images/notes_icn.svg';
import themeIconImg from 'images/theme_icn.svg';
import guideIconImg from 'images/guide_icn.svg';

type Props = { sideBarClassName: any };

export class Sidebar extends PureComponent<Props> {
  render() {
    return (
      <div className={`sidebar ${this.props.sideBarClassName}`}>
        <Navbar.Brand className="d-flex align-items-center" href="/">
          <img
            className="h-40p w-40p mr-2"
            src={eduLogo}
            alt="logo"
          />
          <span
            className="d-lg-block turq_color h2 mb-0 font-weight-600"
          >
            LMS
          </span>
        </Navbar.Brand>

        <Link
          to="/experimental"
          className="d-flex align-items-center text-white mb-2"
        >
          <span className="sidebar-thumb mr-3">
            <img
              src={accountIconImg}
              alt="dashboard-icon"
            />
          </span>
          Experimental Features
        </Link>

        <a
          href="/#"
          className="institute-details d-flex align-items-center w-100"
        >
          <span className="institute-thumbnail mr-3">
            <img
              src={universityIconImg}
              alt="university-logo"
            />
          </span>
          <div>
            <h6>join your institute</h6>
            <p className="text-13">Connect with your coaching center</p>
          </div>
        </a>
        <ul>
          <li className="active">
            <a href="/#" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={accountIconImg}
                  alt="dashboard-icon"
                />
              </span>
              My Account
            </a>
          </li>
          <li>
            <a href="/#" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={activityIconImg}
                  alt="dashboard-icon"
                />
              </span>
              My activity
            </a>
          </li>
          <li>
            <a href="/#" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={doubtIconImg}
                  alt="dashboard-icon"
                />
              </span>
              My doubts
            </a>
          </li>
          <li>
            <a href="/#" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={notesIconImg}
                  alt="dashboard-icon"
                />
              </span>
              My notes
            </a>
          </li>
          <li>
            <a href="/#" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={bookmarkIconImg}
                  alt="dashboard-icon"
                />
              </span>
              bookmarks
            </a>
          </li>
          <li>
            <a href="/#" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={themeIconImg}
                  alt="dashboard-icon"
                />
              </span>
              change your theme
            </a>
          </li>
          <li>
            <a href="/#" className="d-flex align-items-center">
              <span className="sidebar-thumb mr-3">
                <img
                  src={guideIconImg}
                  alt="dashboard-icon"
                />
              </span>
              how to ?
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
