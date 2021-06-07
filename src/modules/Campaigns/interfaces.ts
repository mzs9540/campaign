import { CampaignType } from 'enums';

export type FormData = {
  type: CampaignType,
  title: string,
  description: string | null,
  startsAt: string,
  endsAt: string,
};
