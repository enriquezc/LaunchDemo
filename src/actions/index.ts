import { GET_LAUNCHES_ACTION, RECEIVED_LAUNCHES_ACTION, FAILED_GET_ACTION, ADD_LAUNCH_ACTION } from "../constants.ts";
import { Launch, NewLaunch } from "../types";

export const getLaunchesAction = () => {
    console.log('we called the get launches action!');
    return { type: GET_LAUNCHES_ACTION }
};


export const receivedLaunchesAction = (launches: Launch[]) => ({
    type: RECEIVED_LAUNCHES_ACTION,
    launches: launches,
});

export const getLaunchesFailedAction = (error: Error) => ({
    type: FAILED_GET_ACTION,
    error: error,
});

export const addLaunchAction = (launch: NewLaunch) => ({
    type: ADD_LAUNCH_ACTION,
    launch: launch,
})