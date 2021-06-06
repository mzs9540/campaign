import { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Confirmation } from 'shared';
import { StatusMap } from 'maps';
import { CampaignStatus } from 'enums';

type Props = {
  status: CampaignStatus | null,

  onChangeStatus: (status: CampaignStatus) => void,
};

class Status extends PureComponent<Props, any> {
  getTitle(): string {
    const { status } = this.props;
    console.log(status);
    if (!!status && status in StatusMap) {
      return StatusMap[status];
    }
    return 'All campaigns';
  }

  render() {
    return (
      <Dropdown className="dropdown-menu-wrap">
        <Dropdown.Toggle id="dropdown-basic">
          {this.getTitle()}
          <FontAwesomeIcon
            className="ml-2"
            icon={['fas', 'angle-down']}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Confirmation
            body="Are you sure to active this campaign."
            onAction={() => {
              this.props.onChangeStatus(CampaignStatus.Active);
            }}
          >
            <Dropdown.Item>
              Active campaign
            </Dropdown.Item>
          </Confirmation>

          <Confirmation
            body="Are you sure to pause this campaign."
            onAction={() => {
              this.props.onChangeStatus(CampaignStatus.Paused);
            }}
          >
            <Dropdown.Item>
              Pause campaign
            </Dropdown.Item>
          </Confirmation>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export { Status };
