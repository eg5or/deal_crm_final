import {releasesAPI} from "../API/api";

const SET_RELEASES_DATA = 'dealCRM/releases/SET_RELEASES_DATA';
const SET_LAST_RELEASE_DATA = 'dealCRM/releases/SET_LAST_RELEASE_DATA';

export type InitialStateType = {
    releasesData: Array<any>
    lastReleaseData: Array<any>
}

let initialState: InitialStateType = {
    releasesData: [],
    lastReleaseData: []
}

const releasesReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_RELEASES_DATA:
            return {
                ...state,
                releasesData: action.releasesData
            };
        case SET_LAST_RELEASE_DATA:
            return {
                ...state,
                lastReleaseData: action.lastReleaseData
            };
        default:
            return state;
    }
};

// ActionCreators
type SetReleasesData = {
    type: typeof SET_RELEASES_DATA
    releasesData: Array<any>
}
export const setReleasesData = (releasesData: Array<any>): SetReleasesData => ({type: SET_RELEASES_DATA, releasesData});
type SetLastReleaseData = {
    type: typeof SET_LAST_RELEASE_DATA
    lastReleaseData: Array<any>
}
export const setLastReleaseData = (lastReleaseData: Array<any>): SetLastReleaseData => ({
    type: SET_LAST_RELEASE_DATA,
    lastReleaseData
});

// Thunks

export const loadingReleasesData = () => async (dispatch: any) => {
    try {
        const data = await releasesAPI.getAllReleases()
        dispatch(setReleasesData(data))
    } catch (e) {
        return Promise
    }
};

export const loadingLastReleaseData = (version: string | null) => async (dispatch: any) => {
    try {
        const release = await releasesAPI.getOneRelease(version)
        dispatch(setLastReleaseData(release))
    } catch (e) {
        return Promise
    }
};
export const addNewRelease = (title: string, text: string, items: Array<string>, version: string, date: string) => async (dispatch: any) => {
    try {
        const release = await releasesAPI.createRelease(title, text, items, version, date)
        dispatch(loadingReleasesData())
    } catch (e) {
        return Promise
    }
};
export const deleteRelease = (id: string) => async (dispatch: any) => {
    try {
        const release = await releasesAPI.deleteRelease(id)
        dispatch(loadingReleasesData())
    } catch (e) {
        return Promise
    }
};


export default releasesReducer;