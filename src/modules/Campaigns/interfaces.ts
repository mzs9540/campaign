import { CampaignType } from 'enums';

export type FormData = {
  type: CampaignType,
  title: string,
  description: string,
  startsAt: string,
  endsAt: string,
};
