import React, { PureComponent } from 'react';

import './Card.scss';

import { CampaignStatus } from 'enums';
import { Campaign } from 'API/interfaces';
import campaignCard from 'images/campaign_card.svg';
import calendar from 'images/calendar.svg';
import { Show } from 'shared';
import { utcToLocalWithoutTime } from 'utilities/dates';

type Props = {
  campaign: Campaign | null,
};

export class Card extends PureComponent<Props, any> {
  render() {
    const { campaign } = this.props;
    if (!campaign) return null;

    return (
      <div className="campaign-card">
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

        <Show when={campaign.status === CampaignStatus.Active}>
          <div className="ml-2 custom-ribbon">
            <div />
            <span>
              Active
            </span>
          </div>
        </Show>

        <Show when={campaign.status === CampaignStatus.Upcoming}>
          <div className="ml-2 custom-ribbon">
            <div />
            <span>
              Upcoming
            </span>
          </div>
        </Show>

        <Show when={campaign.status === CampaignStatus.Paused}>
          <div className="ml-2 custom-ribbon">
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

        <div className="update-wrap w-100">
          Updated at: hulu
        </div>
      </div>
    );
  }
}
