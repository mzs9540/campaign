import React, { PureComponent } from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import * as _ from 'lodash';

function getFirstName(username: string | undefined): string | undefined {
  if (!username) return undefined;
  const nameWords = username.split(' ');

  return _.first(nameWords);
}

type Props = {
  username: string,
  pictureUrl: string,
};

class ProfileDropdown extends PureComponent<Props, any> {
  // eslint-disable-next-line class-methods-use-this
  onLogout() {
    console.log('logged out');
  }

  render() {
    return (
      <Dropdown as={Nav.Item} className="user-filter">
        <Dropdown.Toggle
          aria-expanded={false}
          aria-haspopup
          as={Nav.Link}
          data-toggle="dropdown"
          id="profileList"
          variant="default"
          className="m-0"
        >
          <span className="user-avatar mr-2">
            <img
              className="w-100 h-100"
              src={this.props.pictureUrl}
              alt="!!"
            />
          </span>

          <span className="user_name">
            {getFirstName(this.props.username)}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu aria-labelledby="profileList">
          <Dropdown.Item
            className="d-flex align-items-center"
            href="#profile"
            onClick={(e) => e.preventDefault()}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={['fas', 'user-circle']}
            />
            Profile
          </Dropdown.Item>

          <Dropdown.Item
            className="d-flex align-items-center"
            href="#settings"
            onClick={(e) => e.preventDefault()}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={['fas', 'cog']}
            />
            Settings
          </Dropdown.Item>

          <Dropdown.Item
            className="d-flex align-items-center"
            href="#hindi"
            onClick={() => this.onLogout()}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={['fas', 'sign-out-alt']}
            />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.users.fullName,
  pictureUrl: state.users.pictureUrl,
});

const ProfileDropdownWithState = connect(
  mapStateToProps,
)(ProfileDropdown);

export { ProfileDropdownWithState as ProfileDropdown };
