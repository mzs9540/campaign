import React, { PureComponent } from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { signOut } from 'modules/Authentication/authentication.actions';
import { AuthenticationAPI } from 'API';

function getFirstName(username: string): string | undefined {
  if (!username) return undefined;
  const nameWords = username.split(' ');

  return _.first(nameWords);
}

type DispatchProps = {
  signOut: () => any;
};

type PropsFromRedux = {
  username: string,
  pictureUrl: string,
};

type Props = PropsFromRedux & DispatchProps;

class ProfileDropdown extends PureComponent<Props, any> {
  // eslint-disable-next-line class-methods-use-this
  onLogout() {
    const auth = new AuthenticationAPI();
    return Promise.resolve()
      .then(() => auth.signOut())
      .then(() => this.props.signOut())
      .catch((err) => {
        console.error(err);
      });
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
            href="#"
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
  pictureUrl: state.users.profileImageUrl,
});

const ProfileDropdownWithState = connect(
  mapStateToProps, { signOut },
)(ProfileDropdown);

export { ProfileDropdownWithState as ProfileDropdown };
