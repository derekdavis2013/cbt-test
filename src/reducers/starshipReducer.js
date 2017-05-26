import { ERROR, LOADING, SUCCESS, NOT_STARTED } from './statusTypes';
import { STARSHIP_GET_PENDING, STARSHIP_GET_RESOLVED, STARSHIP_GET_REJECTED } from '../actions/types';
import assign from 'lodash/assign';
import clone from 'lodash/clone';

const initialState = {
    data: {
        ships: []
    },
    status: NOT_STARTED,
    error: {}
};

const starshipReducer = function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case STARSHIP_GET_PENDING: {
            return assign({}, state, {status: LOADING});
        }

        case STARSHIP_GET_RESOLVED: {
            return assign({}, state, {data: {ships: action.payload}, status: SUCCESS});
        }

        case STARSHIP_GET_REJECTED: {
            return assign({}, state, {status: ERROR, error: { message: action.payload.message}});
        }

        default: {
            return state;
        }
    }
};

export default starshipReducer;