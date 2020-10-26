import {statsAPI} from "../API/api";

const SET_STATS_DATA = 'dealCRM/stats/SET_STATS_DATA';
const SET_GENERAL_STATS_DATA = 'dealCRM/stats/SET_GENERAL_STATS_DATA';

export type InitialStateType = {
    statsData: Array<any>
    sumDelta: number
    countDeal: number
    maxDelta: number
    sumDeltaGS: number
    countDealGS: number
    maxDeltaGS: number
    sumAllClientInvoices: number
    sumBNClientInvoices: number
    sumNNClientInvoices: number
}

export type GeneralStatsData = {
    sumAllClientInvoicesBN: number
    sumAllClientInvoicesNN: number
    sumAllClientInvoices: number
    sumDelta: number
    sumDeltaWD: number
    countDeal: number
    maxDeltaGS: MaxDelta

}
export type MaxDelta = {
    clientInvoices: Array<any>
    delta: number
    deltaWD: number
    date: string
}

let initialState: InitialStateType = {
    statsData: [],
    sumDelta: 0,
    countDeal: 0,
    maxDelta: 0,
    sumDeltaGS: 0,
    countDealGS: 0,
    maxDeltaGS: 0,
    sumAllClientInvoices: 0,
    sumBNClientInvoices: 0,
    sumNNClientInvoices: 0
}

const statsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_STATS_DATA:
            return {
                ...state,
                statsData: action.statsData.statsData,
                sumDelta: action.statsData.sumDelta,
                countDeal: action.statsData.countDeal,
                maxDelta: action.statsData.maxDelta.delta,
            };
        case SET_GENERAL_STATS_DATA:
            return {
                ...state,
                sumDeltaGS: action.generalStatsData.sumDelta,
                countDealGS: action.generalStatsData.countDeal,
                maxDeltaGS: action.generalStatsData.maxDelta.delta,
                sumAllClientInvoices: action.generalStatsData.sumAllClientInvoices,
                sumBNClientInvoices: action.generalStatsData.sumAllClientInvoicesBN,
                sumNNClientInvoices: action.generalStatsData.sumAllClientInvoicesNN,
            };
        default:
            return state;
    }
};

// ActionCreators
type SetStatsData = {
    type: typeof SET_STATS_DATA
    statsData: Array<any>
}
export const setStatsData = (statsData: Array<any>): SetStatsData => ({type: SET_STATS_DATA, statsData});
type SetGeneralStatsData = {
    type: typeof SET_GENERAL_STATS_DATA
    generalStatsData: GeneralStatsData
}
export const setGeneralStatsData = (generalStatsData: GeneralStatsData): SetGeneralStatsData => ({type: SET_GENERAL_STATS_DATA, generalStatsData});

// Thunks

export const loadingStatsData = (year: number, month: number) => async (dispatch: any, getState: any) => {
    const id = getState().authBlock._id
    try {
        const data = await statsAPI.getStatsOfManager(id, year, month)
        dispatch(setStatsData(data))
    } catch (e) {
        return Promise
    }
};
export const getGeneralStats = () => async (dispatch: any, getState: any) => {
    const id = getState().authBlock._id
    try {
        const data = await statsAPI.getGeneralStats(id)
        dispatch(setGeneralStatsData(data))
    } catch (e) {
        return Promise
    }
};


export default statsReducer;