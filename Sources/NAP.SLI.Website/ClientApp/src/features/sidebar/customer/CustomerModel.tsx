import { CustomerLevels } from "../../../common/utils/CustomerLevelUtils";

export class Customer {
    constructor() {
        this.generalInformation = new GeneralInformation();
        this.headline = new Headline();

    }

    generalInformation: GeneralInformation;
    headline: Headline;
}

export class GeneralInformation {
    constructor() {
        this.custId = 0;
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.username2 = '';
        this.roleId = CustomerLevels.Member;
        this.enabled = false;
        this.phone = '';
        this.mobilePhone = '';
        this.fax = '';
        this.site = '';
    }

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

export class Headline {
    constructor() {
        this.memberId = 0;
        this.memberName = '';
        this.agentId = 0;
        this.agentName = '';
        this.agentEnabled = false;
        this.masterId = 0;
        this.masterName = '';
        this.masterEnabled = false;
        this.superId = 0;
        this.superName = '';
        this.superEnabled = false;
    }

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