export enum PageStatus {
  None,
  Loading,
  Loaded,
  Deleting,
  Deleted,
  Submitting,
  Submitted,
  Error,
}

export enum CampaignStatus {
  Active = 'ACTIVE',
  Upcoming = 'UPCOMING',
  Expired = 'EXPIRED',
  Paused = 'PAUSED',
}

export enum CampaignType {
  Message = 'MESSAGE',
  Email = 'EMAIL',
  PushNotification = 'PUSH_NOTIFICATION',
}
