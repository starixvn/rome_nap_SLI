export type Ticket = {
  AgentPTComHtml: string;
  ChoiceHtml: string;
  MasterPTComHtml: string;
  OddHtml: string;
  PlayerComm: number;
  StakeHtml: string;
  Status: string;
  StatusHtml: string;
  SuperPTComHtml: string;
  TransDateHtml: string;
  WinLossHtml: string;
  Winlost: number;
};

export type QueryData = {
  Tickets: Ticket[];
  SumCommHtml: string;
  SumWinLossHtml: string;
  TotalHtml: string;
};
