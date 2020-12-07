import { CustomerLevels } from "../../../common/utils/CustomerLevelUtils";

export class Customer {
    constructor() {
        this.username = "";
        this.roleId = -1;    
    }

    username: string;
    roleId: number;

}