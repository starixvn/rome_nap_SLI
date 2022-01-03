export type ResultArg = {
  eventDate: string;
  leagueId: number;
  sportType: number;
};

export type ExcelArg = ResultArg & {
  leagueName: string;
  sportName: string;
};

export type SportArg = {
  eventDate: string;
};

export type LeagueArg = {
  eventDate: string;
  sportType: number;
};

export type Soccer5Arg = {
  matchId: number;
  balls: string;
  isDesktop: boolean;
};

export type Match = {
  matchId: number;
  noMatch: string;
  leagueId: number;
  kickOffTime: string;
  eventStatus: string;
};

export type NumberGame = Match & {
  firstBall: Ball;
  secondBall: Ball;
  thirdBall: Ball;
  oeft: string;
};

export type Happy5 = Match & {
  firstBall: Ball;
  secondBall: Ball;
  thirdBall: Ball;
  fourthBall: Ball;
  fifthBall: Ball;
  totalBall: string;
  bigSmall: string;
  oddEven: string;
  fourSeason: string;
  moreOddMoreEven: string;
  soccer5: string;
  soccer5Class: string;
  combo: string;
  balls: string;
  eventStatusIsRefund: boolean;
};

export type ResultRecord = {
  leagueName: string;
  matches: Array<NumberGame | Happy5>;
};

export type Ball = {
  number: string;
  color: string;
};

export type Sport = {
  sportType: number;
  sportName: string;
};

export type League = {
  leagueId: number;
  leagueName: string;
};

export type State = {
  sports: Sport[];
  leagues: League[];
  results: ResultRecord[];
  selectedSportType: number;
  isSportLoading: boolean;
  isLeagueLoading: boolean;
  isResultLoading: boolean;
  isSoccer5Loading: boolean;
  isExcelLoading: boolean;
};

export type QuerySubmitResponse = {
  sports: Sport[];
  leagues: League[];
  results: ResultRecord[];
};

export type QuerySubmitArg = {
  eventDate: string;
};

export type QueryLeaguesAndResultsResponse = {
  leagues: League[];
  results: ResultRecord[];
};

export type QueryLeaguesAndResultsArg = {
  eventDate: string;
  sportType: number;
};
