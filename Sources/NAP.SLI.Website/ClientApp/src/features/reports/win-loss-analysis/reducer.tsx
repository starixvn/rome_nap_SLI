// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../../common/utils/DateUtils';
import axios from 'axios';

export const ReportType = {
    Daily: 1,
    Monthly: 2,
    Sport: 3
};

const slice = createSlice({
    name: "win-loss-analysis",
    initialState: {
        fromDate: undefined,
        toDate: undefined,
        customer: undefined,
        productIds: undefined,
        reportType: ReportType.Daily,
        data: undefined
    },
    reducers: {
        queryRequest: (state, action) => {
            const { fromDate, toDate, customer, productIds, reportType } = action.payload;
            state.fromDate = fromDate;
            state.toDate = toDate;
            state.customer = customer;
            state.productIds = productIds;
            state.reportType = reportType;
            state.data = undefined;
        },
        querySuccess: (state, action) => {
            state.data = action.payload.data;
        }
    }
});

export const { queryRequest, querySuccess } = slice.actions;

const calculateCompanyWinLoss = (winLoss) => {
    winLoss.companyWinLoss = winLoss.memberWinLoss + winLoss.agentWinLoss + winLoss.masterWinLoss || 0 + winLoss.superWinLoss || 0;
};

export const query = (data, callback) => async (dispatch) => {
    try {
        dispatch(queryRequest({
            fromDate: formatDate(data.fromDate),
            toDate: formatDate(data.toDate),
            customer: {
                custId: data.custId,
                roleId: data.roleId
            },
            productIds: data.productIds,
            reportType: data.reportType
        }));

        const response = await axios.post('/api/winlossanalysis/query', data);
        const { records, total } = response.data;
        records.forEach((record) => calculateCompanyWinLoss(record));
        calculateCompanyWinLoss(total);
        dispatch(querySuccess({ data: response.data }));
    }
    finally {
        callback();
    }
}

export default slice.reducer;