import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';

import StarshipTable from '../StarshipTable';
import * as personActions from '../../actions/personActions';
import * as starshipActions from '../../actions/starshipActions';
import * as api from '../../util/api';

const mapStateToProps = (state) => ({
    person: state.person.data,
    status: state.person.status,
    ships: state.starship.data.ships,
    shipStatus: state.starship.status
});

const mapDispatchToProps = (dispatch) => ({
    personGetPending: () => {
        dispatch(personActions.personGetPending());
    },
    personGetResolved: (payload) => {
        dispatch(personActions.personGetResolved(payload));
    },
    personGetRejected: (payload) => {
        dispatch(personActions.personGetRejected(payload));
    },
    starshipGetPending: () => {
        dispatch(starshipActions.starshipGetPending());
    },
    starshipGetResolved: (payload) => {
        dispatch(starshipActions.starshipGetResolved(payload));
    },
    starshipGetRejected: (payload) => {
        dispatch(starshipActions.starshipGetRejected(payload));
    }
});

class Person extends Component {
    componentWillMount() {
        this.props.personGetPending();
        api.getPerson(this.props.match.params.id)
        .then((payload) => {
            // Get info for starships before resolving Person data
            let ships = [];
            if(payload.starships.length) {
                forEach(payload.starships,
                (route) => {
                    api.callRoute(route)
                    .then((payload) => {
                        this.props.starshipGetPending();
                        ships.push(payload);
                        this.props.starshipGetResolved(ships);
                    })
                    .catch((e) => {
                        this.props.starshipGetRejected(e);
                    })
                });
            } else {
                this.props.starshipGetPending();
                this.props.starshipGetResolved([]);
            }

            this.props.personGetResolved(payload);
        })
        .catch((e) => {
            this.props.personGetRejected(e);
        });
    }

    render() {
        return (
            <div>
                {this.props.status === 'LOADING' ? 
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p>PERSON DATA IS LOADING</p>
                        </div>
                    </div> :
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h1>{this.props.person.name}</h1>
                                <div className="col-lg-3 col-lg-offset-4 text-left">
                                    <h4 className=""><li>{`Height: ${this.props.person.height}cm`}</li></h4>
                                    <h4 className=""><li>{`Mass: ${this.props.person.mass}kg`}</li></h4>
                                    <h4 className=""><li>{`Hair Color: ${this.props.person.hair_color}`}</li></h4>
                                </div>
                                <div className="col-lg-3 text-left">
                                    <h4 className=""><li>{`Eye Color: ${this.props.person.eye_color}`}</li></h4>
                                    <h4 className=""><li>{`Birth Year: ${this.props.person.birth_year}`}</li></h4>
                                    <h4 className=""><li>{`Gender: ${this.props.person.gender}`}</li></h4>
                                </div>
                        </div>
                        <div className="col-lg-12">
                            <StarshipTable ships={this.props.ships} status={this.props.shipStatus}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Person.propTypes = {
    personGetPending: PropTypes.func.isRequired,
    personGetResolved: PropTypes.func.isRequired,
    personGetRejected: PropTypes.func.isRequired,
    starshipGetPending: PropTypes.func.isRequired,
    starshipGetResolved: PropTypes.func.isRequired,
    starshipGetRejected: PropTypes.func.isRequired,
    person: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    ships: PropTypes.array.isRequired,
    shipStatus: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);