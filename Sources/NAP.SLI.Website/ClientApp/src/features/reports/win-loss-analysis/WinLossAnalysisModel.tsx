import { ReportType } from "./reducer";

export class WinLossAnalysisState {
    constructor() {
        this.fromDate = new Date();
        this.toDate = new Date();
        this.customer = null;
        this.reportType = ReportType.Daily;
        this.data = new WinLossAnalysisQueryResponse();
    }

    fromDate: Date;
    toDate: Date;
    customer: object;
    reportType: number;
    data: WinLossAnalysisQueryResponse;
}

export class WinLossAnalysisQueryResponse {
    constructor() {
        this.records = [];
        this.total = new WinLossAnalysisDetail();
    }

    records: WinLossAnalysisDetail[];
    total: WinLossAnalysisDetail;
}

export class WinLossAnalysisDetail {
    constructor() {
        this.sportType = "";
        this.rollupKey = "";
        this.betCount = 0;
        this.turnover = 0;
        this.memberWinLoss = 0;
        this.agentWinLoss = 0;
        this.masterWinLoss = 0;
        this.superWinLoss = 0;
        this.companyWinLoss = 0;
    }

    sportType: string;

    rollupKey: string;

    betCount: number;

    turnover: number;

    memberWinLoss: number;

    agentWinLoss: number;

    masterWinLoss: number;

    superWinLoss: number;

    companyWinLoss: number;
}