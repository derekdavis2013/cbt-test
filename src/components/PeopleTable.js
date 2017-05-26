import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Link } from 'react-router-dom';


import * as peopleActions from '../actions/peopleActions';
import * as api from '../util/api';

const BBY = 'BBY';
const ABY = 'ABY';
// According to http://starwars.wikia.com/,
// The Force Awakes takes place in 34 ABY
const CURRENT_YEAR = 34;

class PeopleTable extends Component {
    calculateAge(birthYear) {
        if(birthYear !== 'unknown') {
            const era = birthYear.match('[A-Z]+').toString();
            const age = parseFloat(birthYear.match('[0-9.]+'));
            return era === BBY ? age + CURRENT_YEAR : CURRENT_YEAR - age;
        }
        return birthYear;
    }

    calculateId(personUrl) {
        return parseInt(personUrl.match('[0-9]+')).toString(); 
    }

    render() {
        return (
            <div>
                {this.props.status === 'LOADING' ? 
                    <p>DATA IS LOADING</p> :
                    <div>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Age
                                    </th>
                                    <th>
                                        Birth Year
                                    </th>
                                </tr>
                                {
                                    map(
                                        (this.props.people),
                                        (person) => (
                                            <tr key={person.name}>
                                                <td><Link to={`/person/${this.calculateId(person.url)}`}>{person.name}</Link></td>
                                                <td>{this.calculateAge(person.birth_year)}</td>
                                                <td>{person.birth_year}</td>
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

PeopleTable.propTypes = {
    status: PropTypes.string,
    people: PropTypes.array
};

export default (PeopleTable);
