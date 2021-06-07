import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';

import { CampaignStatus, CampaignType } from 'enums';
import { Campaign } from 'API/interfaces';
import campaignCard from 'images/campaign_card.svg';
import calendar from 'images/calendar.svg';
import { Show } from 'shared';
import { utcToLocalDateTime, utcToLocalWithoutTime } from 'utilities/dates';

type Props = {
  campaign: Campaign | null,
};

export class Card extends PureComponent<Props, any> {
  classNames() {
    return this.props.campaign?.status === CampaignStatus.Expired
      ? 'campaign-card expired'
      : 'campaign-card';
  }

  render() {
    const { campaign } = this.props;
    if (!campaign) return null;

    return (
      <div className={this.classNames()}>
        <img src={campaignCard} alt="test-series" />
        <div className="campaign-thumb">
          <img src={calendar} alt="calendar" />
          <small>
            Starts At:
            {' '}
            {utcToLocalWithoutTime(campaign.startsAt)}
            <span>
              Ends At:
              {' '}
              {utcToLocalWithoutTime(campaign.endsAt)}
            </span>
          </small>
        </div>
        <h6>
          {campaign.title}
        </h6>

        <div className="campaign-type">
          <Show when={campaign.type === CampaignType.PushNotification}>
            Push Notifications
          </Show>

          <Show when={campaign.type === CampaignType.Message}>
            Message
          </Show>

          <Show when={campaign.type === CampaignType.Email}>
            Email
          </Show>
        </div>

        <Show when={campaign.status === CampaignStatus.Active}>
          <div className="ml-2 custom-ribbon active">
            <div />
            <span>
              Active
            </span>
          </div>
        </Show>

        <Show when={campaign.status === CampaignStatus.Upcoming}>
          <div className="ml-2 custom-ribbon upcoming">
            <div />
            <span>
              Upcoming
            </span>
          </div>
        </Show>

        <Show when={campaign.status === CampaignStatus.Paused}>
          <div className="ml-2 custom-ribbon paused">
            <div />
            <span>Paused</span>
          </div>
        </Show>

        <Show when={campaign.status === CampaignStatus.Expired}>
          <div className="ml-2 custom-ribbon expired">
            <div />
            <span>Expired</span>
          </div>
        </Show>

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="update-wrap">
              Updated at:
              {' '}
              <span>{utcToLocalDateTime(campaign.updatedAt)}</span>
            </div>

            <div className="user-wrap">
              Created by:
              {' '}
              <span>{campaign.createdBy.name || 'N/A'}</span>
            </div>
          </div>

          <Link
            to={`/campaigns/${campaign.id}`}
            className="btn btn-sm"
          >
            View
          </Link>
        </div>
      </div>
    );
  }
}
