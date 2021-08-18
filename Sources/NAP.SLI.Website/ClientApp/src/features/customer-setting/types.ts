export type CustomerInfo = {
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
  mobilePhone: string;
  fax: string;
  disableNumber: boolean;
};

export type BetSetting = {
  v161MinBet: number;
  v161MaxBet: number;
  v161MaxPerMatch: number;
  v161MaxPerBall: number;
  v164MinBet: number;
  v164MaxBet: number;
  v164MaxPerMatch: number;
};

export type AgentPtSetting = {
  v161aPositionTaking_81: number;
  v161aPositionTaking_83: number;
  v161aPositionTaking_88: number;
  v161aPositionTaking_86: number;
  v161aLivePositionTaking_85: number;
  v161aLivePositionTaking_86: number;
  v161aLivePositionTaking_87: number;
  v161aLivePositionTaking_89: number;
  v161aLivePositionTaking_90: number;
};

export type MasterPtSetting = {
  v161mPositionTaking_81: number;
  v161mPositionTaking_83: number;
  v161mPositionTaking_88: number;
  v161mPositionTaking_86: number;
  v161mLivePositionTaking_85: number;
  v161mLivePositionTaking_86: number;
  v161mLivePositionTaking_87: number;
  v161mLivePositionTaking_89: number;
  v161mLivePositionTaking_90: number;
};

export type SuperPtSetting = {
  v161sPositionTaking_81: number;
  v161sPositionTaking_83: number;
  v161sPositionTaking_88: number;
  v161sPositionTaking_86: number;
  v161sLivePositionTaking_85: number;
  v161sLivePositionTaking_86: number;
  v161sLivePositionTaking_87: number;
  v161sLivePositionTaking_89: number;
  v161sLivePositionTaking_90: number;
};
