import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';

class StarshipTable extends Component {
    render() {
        return (
            <div>
                {this.props.status === 'LOADING' ? 
                    <p>DATA IS LOADING</p> :
                    <div>
                        <h4>Starships</h4>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Model
                                    </th>
                                    <th>
                                        Length
                                    </th>
                                    <th>
                                        Cost in Credits
                                    </th>
                                    <th>
                                        Crew
                                    </th>
                                    <th>
                                        Hyperdrive Rating
                                    </th>
                                </tr>
                                {
                                    map(
                                        (this.props.ships),
                                        (ship) => (
                                            <tr key={ship.name}>
                                                <td>{ship.name}</td>
                                                <td>{ship.model}</td>
                                                <td>{ship.length}</td>
                                                <td>{ship.cost_in_credits}</td>
                                                <td>{ship.crew}</td>
                                                <td>{ship.hyperdrive_rating}</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

StarshipTable.propTypes = {
    ships: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired
};

export default StarshipTable;
