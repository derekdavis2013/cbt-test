import { ERROR, LOADING, SUCCESS, NOT_STARTED } from './statusTypes';
import { PEOPLE_GET_PENDING, PEOPLE_GET_RESOLVED, PEOPLE_GET_REJECTED } from '../actions/types';
import assign from 'lodash/assign';

const initialState = {
    data: {},
    status: NOT_STARTED,
    error: {}
};

const peopleReducer = function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PEOPLE_GET_PENDING: {
            return assign({}, state, {status: LOADING});
        }

        case PEOPLE_GET_RESOLVED: {
            return assign({}, state, {data: action.payload, status: SUCCESS});
        }

        case PEOPLE_GET_REJECTED: {
            return assign({}, state, {status: ERROR, error: { message: action.payload.message}});
        }

        default: {
            return state;
        }
    }
};

export default peopleReducer;
