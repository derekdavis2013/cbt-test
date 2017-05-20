import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PeopleTable from '../PeopleTable';
import * as peopleActions from '../../actions/peopleActions';
import * as api from '../../util/api';

const mapStateToProps = (state) => ({
    status: state.people.status,
    peopleData: state.people.data
});

const mapDispatchToProps = (dispatch) => ({
    peopleGetPending: () => {
        dispatch(peopleActions.peopleGetPending());
    },
    peopleGetResolved: (payload) => {
        dispatch(peopleActions.peopleGetResolved(payload));
    },
    peopleGetRejected: (payload) => {
        dispatch(peopleActions.peopleGetRejected(payload));
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {searchValue: ''};

        this.props.peopleGetPending();
        api.getPeople()
        .then((payload) => {
            this.props.peopleGetResolved(payload);
        })
        .catch((e) => {
            this.props.peopleGetRejected(e);
        });
    }

    handleSearch(e) {
        name = e.target.value;
        this.setState({searchValue: name});
        this.props.peopleGetPending();
        api.searchPeople(name)
        .then((payload) => {
            this.props.peopleGetResolved(payload);
        })
        .catch((e) => {
            this.props.peopleGetRejected(e);
        });
    }

    handleSubmit() {
        this.props.peopleGetPending();
        api.searchPeople(this.state.searchValue)
        .then((payload) => {
            this.props.peopleGetResolved(payload);
        })
        .catch((e) => {
            this.props.peopleGetRejected(e);
        });
    }

    buildPreviousButton() {
        if(this.props.peopleData.previous) {
            return (
                <button onClick={() => {
                    this.props.peopleGetPending();
                    api.callRoute(this.props.peopleData.previous)
                    .then((payload) => {
                        this.props.peopleGetResolved(payload);
                    })
                    .catch((e) => {
                        this.props.peopleGetRejected(e);
                    });
                }}>
                    Previous
                </button>
            );
        }
        return <span />;
    }

    buildNextButton() {
        if(this.props.peopleData.next) {
            return (
                <button onClick={() => {
                    this.props.peopleGetPending();
                    api.callRoute(this.props.peopleData.next)
                    .then((payload) => {
                        this.props.peopleGetResolved(payload);
                    })
                    .catch((e) => {
                        this.props.peopleGetRejected(e);
                    });
                }}>
                    Next
                </button>
            );
        }
        return <span />;
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 padding-top-20">
                    <div>
                        <form>
                            <input
                                type="text"
                                placeholder="Filter by name"
                                value={this.state.searchValue}
                                onChange={(e) => {
                                    this.handleSearch(e);
                                }}
                            />
                        </form>
                    </div>
                    <PeopleTable 
                        people={this.props.peopleData.results}
                        status={this.props.status}
                    />
                    <div className="row">
                        <div className="col-lg-2">
                            {this.buildPreviousButton()}
                        </div>
                        <div className="col-lg-2 col-lg-offset-8 text-right">
                            {this.buildNextButton()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    peopleGetPending: PropTypes.func.isRequired,
    peopleGetResolved: PropTypes.func.isRequired,
    peopleGetRejected: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
