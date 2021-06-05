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
  Expired = 'EXPIRED',
  Paused = 'PAUSED',
}

export enum CampaignType {
  Message = 'MESSAGE',
  Email = 'Email',
  PushNotification = 'PUSH_NOTIFICATION',
}
