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
          <td>{this.props.height}</td>
          <td>{this.props.weight}</td>
          <td>
            {
              this.props.abilities.map((el)=> {
                return <p key={`${el.ability.name}-for-${this.props.name}`}>{el.ability.name}</p>
              })
            }
          </td>
        </tr>
        </tbody>

      </table>
    );
  }
}
