export interface Customer {
  generalInformation: GeneralInformation;
  headline: Headline;
}

export interface GeneralInformation {
  custId: number;
  username: string;
  firstName: string;
  lastName: string;
  username2: string;
  roleId: number;
  enabled: boolean;
  phone: string;
  mobilePhone: string;
  fax: string;
  site: string;
}

export interface Headline {
  memberId: number;
  memberName: string;
  agentId: number;
  agentName: string;
  agentEnabled: boolean;
  masterId: number;
  masterName: string;
  masterEnabled: boolean;
  superId: number;
  superName: string;
  superEnabled: boolean;
}