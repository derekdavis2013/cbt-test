import {PERSON_GET_PENDING, PERSON_GET_RESOLVED, PERSON_GET_REJECTED} from './types';

export function personGetPending() {
    return {
        type: PERSON_GET_PENDING
    };
}

export function personGetResolved(payload) {
    return {
        type: PERSON_GET_RESOLVED,
        payload
    };
}

export function personGetRejected(payload) {
    return {
        type: PERSON_GET_REJECTED,
        payload
    }
}