import React from 'react';
import './PokeTable.css';

export default class PokeTable extends React.Component {
    render() {
        return (
                <table className="PokeTable">

                    <tbody>
                    <tr>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Abilities</th>
                    </tr>
                    <tr>
                        <td>{this.props.pHeight}</td>
                        <td>{this.props.pWeight}</td>
                        <td>{
                            this.props.abilities.map((el)=>{
                                return <p>{el.ability.name}</p>
                            })

                        }</td>
                    </tr>
                    </tbody>

                </table>
        );
    }
}
