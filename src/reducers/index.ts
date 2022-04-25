import { Launch } from '../types'

export interface LaunchListState {
    launches: Launch[],
    launchError: Error | undefined,
}

const initialState: LaunchListState = {
    launches : [],
    launchError: undefined,
}

const reducer = (state: LaunchListState = initialState, action: any) => {
    switch (action.type) {
        case 'RECEIVED_LAUNCHES':
            return { ...state, launches: action.launches };
        default:
            console.log('we called an action!: ', action.type)
            return state;
    }
};

export default reducer;