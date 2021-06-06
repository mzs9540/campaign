import { PureComponent } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CampaignStatus, CampaignType } from 'enums';
import { StatusMap, TypesMap } from 'maps';

type Props = {
  status: CampaignStatus | null,
  type: CampaignType | null,

  onSelectStatus: (status: CampaignStatus) => void,
  onSelectType: (type: CampaignType) => void,
  onReset: () => void,
};

class Filters extends PureComponent<Props, any> {
  getTitle(): string {
    const { status, type } = this.props;
    if (!!type && type in TypesMap) {
      return TypesMap[type];
    }
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
          <Dropdown.Item onClick={() => {
            this.props.onReset();
          }}
          >
            All Campaigns
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.ItemText>
            By type
          </Dropdown.ItemText>

          <Dropdown.Item
            onClick={() => {
              this.props.onSelectType(CampaignType.PushNotification);
            }}
          >
            Push notifications
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              this.props.onSelectType(CampaignType.Email);
            }}
          >
            Email
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              this.props.onSelectType(CampaignType.Message);
            }}
          >
            Message
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.ItemText>
            By status
          </Dropdown.ItemText>

          <Dropdown.Item
            onClick={() => {
              this.props.onSelectStatus(CampaignStatus.Expired);
            }}
          >
            Expired
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              this.props.onSelectStatus(CampaignStatus.Active);
            }}
          >
            Active
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              this.props.onSelectStatus(CampaignStatus.Upcoming);
            }}
          >
            Upcoming
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              this.props.onSelectStatus(CampaignStatus.Paused);
            }}
          >
            Paused
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export { Filters };
