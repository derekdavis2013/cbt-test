import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import peopleReducer from './peopleReducer';
import personReducer from './personReducer';
import starshipReducer from './starshipReducer';

const rootReducer = combineReducers({
    people: peopleReducer,
    person: personReducer,
    starship: starshipReducer,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;
