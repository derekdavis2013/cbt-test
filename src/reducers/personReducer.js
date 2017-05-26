import { ERROR, LOADING, SUCCESS, NOT_STARTED } from './statusTypes';
import { PERSON_GET_PENDING, PERSON_GET_RESOLVED, PERSON_GET_REJECTED } from '../actions/types';
import assign from 'lodash/assign';
import * as api from '../util/api';

const initialState = {
    data: {},
    status: NOT_STARTED,
    error: {}
};

const personReducer = function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PERSON_GET_PENDING: {
            return assign({}, state, {status: LOADING});
        }

        case PERSON_GET_RESOLVED: {
            return assign({}, state, {data: action.payload, status: SUCCESS});
        }

        case PERSON_GET_REJECTED: {
            return assign({}, state, {status: ERROR, error: { message: action.payload.message}});
        }

        default: {
            return state;
        }
    }
};

export default personReducer;