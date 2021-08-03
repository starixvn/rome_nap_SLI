export type CustomerInfo = {
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  mobilephone: string;
  fax: string;
  disableNumber: boolean;
};

export type BetSetting = {
  minbetv161: number;
  maxbetv161: number;
  maxpermatchv161: number;
  maxperballv161: number;
  minbetv164: number;
  maxbetv164: number;
  maxpermatchv164: number;
};

export type AgentPtSetting = {
  v161apositiontaking_81: number;
  v161apositiontaking_83: number;
  v161apositiontaking_88: number;
  v161apositiontaking_86: number;
  v161alivepositiontaking_85: number;
  v161alivepositiontaking_86: number;
  v161alivepositiontaking_87: number;
  v161alivepositiontaking_89: number;
  v161alivepositiontaking_90: number;
};

export type MasterPtSetting = {
  v161mpositiontaking_81: number;
  v161mpositiontaking_83: number;
  v161mpositiontaking_88: number;
  v161mpositiontaking_86: number;
  v161mlivepositiontaking_85: number;
  v161mlivepositiontaking_86: number;
  v161mlivepositiontaking_87: number;
  v161mlivepositiontaking_89: number;
  v161mlivepositiontaking_90: number;
};

export type SuperPtSetting = {
  v161spositiontaking_81: number;
  v161spositiontaking_83: number;
  v161spositiontaking_88: number;
  v161spositiontaking_86: number;
  v161slivepositiontaking_85: number;
  v161slivepositiontaking_86: number;
  v161slivepositiontaking_87: number;
  v161slivepositiontaking_89: number;
  v161slivepositiontaking_90: number;
};
