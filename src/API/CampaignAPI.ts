import { uuid } from 'uuidv4';
import moment from 'moment';

import { lang } from '../lang';

import { Campaign, User } from './interfaces';
import { AuthenticationAPI } from './AuthenticationAPI';

import { CampaignStatus, CampaignType } from 'enums';
import { AppStorage } from 'AppStorage';
import { CampaignId } from 'interfaces';

export class CampaignAPI {
  store: AppStorage | null = null;

  constructor() {
    this.store = new AppStorage({ prefix: 'campaigns' });
  }

  getCampaigns(params?: {
    type?: CampaignType,
    status?: CampaignStatus,
    total?: number,
  }): Promise<Campaign[] | never> {
    return new Promise((resolve, reject) => {
      try {
        let campaigns = this.store?.getValue<Campaign[]>('campaigns');
        if (!Array.isArray(campaigns)) {
          return resolve([]);
        }
        campaigns = CampaignAPI.updateStatus(campaigns);
        if (!!params?.type) {
          campaigns = campaigns.filter((campaign) => {
            return campaign.type === params.type;
          });
        }
        if (!!params?.status) {
          campaigns = campaigns.filter((campaign) => {
            return campaign.status === params.status;
          });
        }
        if (!!params?.total) {
          const index = campaigns.length > params.total
            ? params.total
            : campaigns.length;
          campaigns = campaigns.slice(0, index);
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

  async createCampaign(values: {
    title: string,
    description: string | null,
    type: CampaignType,
    startsAt: string,
    endsAt: string,
    isActive?: boolean
  }): Promise<Campaign | never> {
    let user: User;
    try {
      const auth = new AuthenticationAPI();
      user = await auth.getUser();
      if (!user) throw new Error(lang.unknownError);
    } catch (err) {
      return Promise.reject(err);
    }

    return new Promise((resolve, reject) => {
      try {
        if (!CampaignAPI.validateCampaign(values)) {
          return reject(new Error(lang.invalidCampaign));
        }
        const campaigns = this.store?.getValue<Campaign[]>('campaigns') || [];
        const campaign: Campaign = {
          ...values,
          id: uuid() as CampaignId,
          createdAt: moment.utc(),
          startsAt: moment(values.startsAt).utc(),
          endsAt: moment(values.endsAt).utc(),
          updatedAt: null,
          createdBy: {
            id: user.id,
            name: user.fullName,
          },
          isActive: values.isActive || true,
          status: CampaignStatus.Active,
        };
        campaigns.push(campaign);
        this.store?.setValue<Campaign[]>('campaigns', campaigns);
        return resolve(campaign);
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
      startsAt: string,
      endsAt: string,
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
          startsAt: moment(values.startsAt).utc(),
          endsAt: moment(values.endsAt).utc(),
          updatedAt: moment.utc(),
        };
        campaigns[index] = campaign;
        this.store?.setValue<Campaign[]>('campaigns', campaigns);
        return resolve(campaign);
      } catch (err) {
        return reject(err);
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

  updateCampaignStatus(
    campaignId: CampaignId,
    status: CampaignStatus,
  ): Promise<Campaign | never> {
    return new Promise((resolve, reject) => {
      try {
        if (!(status in CampaignStatus)) {
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
          status,
        };
        campaigns[index] = campaign;
        this.store?.setValue<Campaign[]>('campaigns', campaigns);
        return resolve(campaign);
      } catch (err) {
        return reject(err);
      }
    });
  }

  static validateCampaign(values: {
    title: string,
    description: string | null,
    type: CampaignType,
  }): boolean {
    const { title, description } = values;
    return title.length > 10
      && title.length <= 150
      && (!!description
        ? (description.length <= 500 && description.length > 50)
        : true);
  }

  static updateStatus(campaignsIn: Campaign[]): Campaign[] {
    if (!campaignsIn?.length) return campaignsIn;
    return campaignsIn.map((campaign) => {
      const { startsAt, endsAt } = campaign;
      const isUpcoming = moment(moment().utc()).isBefore(
        moment(startsAt).utc(),
        'minutes',
      );
      const isActive = moment(moment().utc()).isBetween(
        startsAt,
        endsAt,
        'minutes',
      );
      const isExpired = moment(moment().utc()).isAfter(endsAt);
      if (campaign.isActive && isActive) {
        return {
          ...campaign,
          isActive: true,
          status: CampaignStatus.Active,
        };
      }
      if (!campaign.isActive && isActive) {
        return {
          ...campaign,
          isActive: false,
          status: CampaignStatus.Paused,
        };
      }
      if (isUpcoming) {
        return {
          ...campaign,
          isActive: true,
          status: CampaignStatus.Upcoming,
        };
      }
      if (isExpired) {
        return {
          ...campaign,
          isActive: false,
          status: CampaignStatus.Expired,
        };
      }
      return campaign;
    });
  }
}
