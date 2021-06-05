import { Moment } from 'moment';

import { CampaignStatus, CampaignType } from 'enums';
import { CampaignId, UserId } from 'interfaces';

export type User = {
  id: UserId,
  fullName: string,
  phone: string,
  email: string,
  bio: string,
  profileImageUrl: string,
};

export type Campaign = {
  id: CampaignId,
  title: string,
  description: string | null,
  isActive: boolean,
  status: CampaignStatus,
  type: CampaignType,
  createdAt: Moment,
  updatedAt: Moment | null,
  createdBy: UserId,
};
