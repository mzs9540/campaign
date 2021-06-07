import { uuid } from 'uuidv4';
import moment from 'moment';

import { AuthenticationAPI } from './API';
import { Campaign, User } from './API/interfaces';
import { CampaignId, UserId } from './interfaces';
import { CampaignAPI } from './API/CampaignAPI';
import { CampaignStatus, CampaignType } from './enums';

export function initialize() {
  const userId = uuid() as UserId;
  try {
    const authAPI = new AuthenticationAPI();
    let users = authAPI.store.getValue<User[]>('users');
    if (!users) {
      users = [{
        id: userId,
        fullName: 'Mohammad Zaid',
        email: 'zaid@gmail.com',
        phone: '919540306628',
        bio: '',
        profileImageUrl: 'https://picsum.photos/200/300?random=1200',
      }];
      authAPI.store.setValue<User[]>('users', users);
    }
  } catch (e) {
    console.error(e);
  }

  try {
    const campaignsAPI = new CampaignAPI();
    let campaigns = campaignsAPI.store.getValue<Campaign[]>('campaigns');
    if (!campaigns) {
      campaigns = [{
        id: uuid() as CampaignId,
        type: CampaignType.Email,
        title: 'Email campaign 1',
        // eslint-disable-next-line max-len
        description: 'Email campaign 1 Email campaign 1 Email campaign 1 Email campaign 1',
        startsAt: moment(),
        endsAt: moment().add(1, 'day'),
        createdAt: moment(),
        createdBy: {
          name: 'Mohammad Zaid',
          id: userId,
        },
        status: CampaignStatus.Active,
        updatedAt: null,
        isActive: true,
      },
      {
        id: uuid() as CampaignId,
        type: CampaignType.PushNotification,
        title: 'Push Notification campaign 1',
        // eslint-disable-next-line max-len
        description: 'Email campaign 1 Email campaign 1 Email campaign 1 Email campaign 1',
        startsAt: moment(),
        endsAt: moment().add(1, 'day'),
        createdAt: moment(),
        createdBy: {
          name: 'Mohammad Zaid',
          id: userId,
        },
        status: CampaignStatus.Active,
        updatedAt: null,
        isActive: true,
      },
      {
        id: uuid() as CampaignId,
        type: CampaignType.Message,
        title: 'Message campaign 1',
        // eslint-disable-next-line max-len
        description: 'Email campaign 1 Email campaign 1 Email campaign 1 Email campaign 1',
        startsAt: moment(),
        endsAt: moment().add(1, 'day'),
        createdAt: moment(),
        createdBy: {
          name: 'Mohammad Zaid',
          id: userId,
        },
        status: CampaignStatus.Active,
        updatedAt: null,
        isActive: true,
      },
      {
        id: uuid() as CampaignId,
        type: CampaignType.Email,
        title: 'Email campaign 2',
        // eslint-disable-next-line max-len
        description: 'Email campaign 1 Email campaign 1 Email campaign 1 Email campaign 1',
        startsAt: moment().add(1, 'month').utc(),
        endsAt: moment().add(2, 'month').utc(),
        createdAt: moment(),
        createdBy: {
          name: 'Mohammad Zaid',
          id: userId,
        },
        status: CampaignStatus.Upcoming,
        updatedAt: null,
        isActive: true,
      },
      {
        id: uuid() as CampaignId,
        type: CampaignType.Message,
        title: 'Message campaign 2',
        // eslint-disable-next-line max-len
        description: 'Email campaign 1 Email campaign 1 Email campaign 1 Email campaign 1',
        startsAt: moment().subtract(1, 'month').utc(),
        endsAt: moment().subtract(1, 'day').utc(),
        createdAt: moment().subtract(1, 'month').utc(),
        createdBy: {
          name: 'Mohammad Zaid',
          id: userId,
        },
        status: CampaignStatus.Active,
        updatedAt: null,
        isActive: true,
      },
      ];
      campaignsAPI.store.setValue<Campaign[]>('campaigns', campaigns);
    }
  } catch (e) {
    console.error(e);
  }
}
