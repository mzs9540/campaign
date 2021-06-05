import { uuid } from 'uuidv4';
import moment from 'moment';

import { Campaign } from './interfaces';
import { AuthenticationAPI } from './AuthenticationAPI';

import { lang } from 'lang';
import { CampaignStatus, CampaignType } from 'enums';
import { AppStorage } from 'AppStorage';
import { CampaignId } from 'interfaces';

export class CampaignAPI {
  store: AppStorage | null = null;

  constructor() {
    this.store = new AppStorage({ prefix: 'campaigns' });
  }

  getCampaigns(): Promise<Campaign[] | never> {
    return new Promise((resolve, reject) => {
      try {
        const campaigns = this.store?.getValue<Campaign[]>('campaigns');
        if (!Array.isArray(campaigns)) {
          return resolve([]);
        }
        return resolve(campaigns);
      } catch {
        return reject(new Error(lang.unknownError));
      }
    });
  }

  getCampaign(id: CampaignId | null): Promise<Campaign | never> {
    return new Promise((resolve, reject) => {
      try {
        if (!id) {
          return reject(new Error('NO_CAMPAIGN_ID'));
        }
        const campaigns = this.store?.getValue<Campaign[]>('campaigns') || [];
        const index = campaigns.findIndex((campaign) => {
          return campaign.id === id;
        });

        if (index < 0) {
          return reject(new Error(lang.noCampaign));
        }
        return resolve(campaigns[index]);
      } catch {
        return reject(new Error(lang.unknownError));
      }
    });
  }

  createCampaign(values: {
    title: string,
    description: string | null,
    type: CampaignType,
  }): Promise<Campaign | never> {
    return new Promise((resolve, reject) => {
      try {
        if (!CampaignAPI.validateCampaign(values)) {
          return reject(new Error(lang.invalidCampaign));
        }
        const auth = new AuthenticationAPI();
        return auth.getUser().then((user) => {
          const campaigns = this.store?.getValue<Campaign[]>('campaigns') || [];
          const campaign: Campaign = {
            ...values,
            id: uuid() as CampaignId,
            createdAt: moment.utc(),
            updatedAt: null,
            createdBy: user.id,
            isActive: true,
            status: CampaignStatus.Active,
          };
          campaigns.push(campaign);
          this.store?.setValue<Campaign[]>('campaigns', campaigns);
          return resolve(campaign);
        });
      } catch {
        return reject(new Error(lang.unknownError));
      }
    });
  }

  updateCampaign(
    campaignId: CampaignId,
    values: {
      title: string,
      description: string | null,
      type: CampaignType,
    },
  ): Promise<Campaign | never> {
    return new Promise((resolve, reject) => {
      try {
        if (!CampaignAPI.validateCampaign(values)) {
          return reject(new Error(lang.invalidCampaign));
        }
        const campaigns = this.store?.getValue<Campaign[]>('campaigns') || [];
        const index = campaigns.findIndex((campaign) => {
          return campaign.id === campaignId;
        });
        if (index < 0) {
          return reject(new Error(lang.noCampaign));
        }
        const campaignOld = campaigns[index];
        const campaign: Campaign = {
          ...campaignOld,
          ...values,
          updatedAt: moment.utc(),
        };
        campaigns[index] = campaign;
        this.store?.setValue<Campaign[]>('campaigns', campaigns);
        return resolve(campaign);
      } catch {
        return reject(new Error(lang.unknownError));
      }
    });
  }

  deleteCampaign(campaignId: CampaignId): Promise<boolean | never> {
    return new Promise((resolve, reject) => {
      try {
        const campaigns = this.store?.getValue<Campaign[]>('campaigns') || [];
        const index = campaigns.findIndex((campaign) => {
          return campaign.id === campaignId;
        });
        if (index < 0) {
          return reject(new Error(lang.noCampaign));
        }
        campaigns.splice(index, 1);
        this.store?.setValue<Campaign[]>('campaigns', campaigns);
        return resolve(true);
      } catch {
        return reject(new Error(lang.unknownError));
      }
    });
  }

  static validateCampaign(values: {
    title: string,
    description: string | null,
    type: CampaignType,
  }): boolean {
    return values.title.length <= 150
      && (!!values.description ? values.description?.length <= 500 : true)
      && values.type in CampaignType;
  }
}
