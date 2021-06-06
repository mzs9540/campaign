import { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Confirmation } from 'shared';

type Props = {
  onDelete: () => void,
  onUpdate: () => void,
};

class Menu extends PureComponent<Props, any> {
  render() {
    return (
      <Dropdown className="dropdown-menu-wrap">
        <Dropdown.Toggle id="dropdown-basic">
          Menu
          <FontAwesomeIcon
            className="ml-2"
            icon={['fas', 'angle-down']}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.props.onUpdate()}>
            Update
          </Dropdown.Item>

          <Confirmation
            body="Are you sure to delete this campaign."
            onAction={() => {
              this.props.onDelete();
            }}
          >
            <Dropdown.Item className="text-danger">
              Delete
            </Dropdown.Item>
          </Confirmation>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export { Menu };
