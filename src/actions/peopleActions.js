import {PEOPLE_GET_PENDING, PEOPLE_GET_RESOLVED, PEOPLE_GET_REJECTED} from './types';

export function peopleGetPending() {
    return {
        type: PEOPLE_GET_PENDING
    };
}

export function peopleGetResolved(payload) {
    return {
        type: PEOPLE_GET_RESOLVED,
        payload
    };
}

export function peopleGetRejected(payload) {
    return {
        type: PEOPLE_GET_REJECTED,
        payload
    }
}
