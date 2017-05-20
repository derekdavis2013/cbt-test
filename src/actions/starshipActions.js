import {STARSHIP_GET_PENDING, STARSHIP_GET_RESOLVED, STARSHIP_GET_REJECTED} from './types';

export function starshipGetPending() {
    return {
        type: STARSHIP_GET_PENDING
    };
}

export function starshipGetResolved(payload) {
    return {
        type: STARSHIP_GET_RESOLVED,
        payload
    };
}

export function starshipGetRejected(payload) {
    return {
        type: STARSHIP_GET_REJECTED,
        payload
    }
}