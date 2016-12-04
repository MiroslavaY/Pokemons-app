import React  from 'react';
import Pokemon from '../Pokemon/Pokemon.js';
import axios from 'axios';
import './App.css';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            pokemons: [],
            offset: 0,
            limit: 25
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    };

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    loadData() {

        let _this = this;
        this.serverRequest =
            axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`)
                .then((result) => {

                    _this.setState({
                        pokemons: this.state.pokemons.concat(result.data.results),
                        offset: this.state.offset + this.state.limit
                    });

                });
    }

    render() {

        return (
            <div className="App">
                <h1>Pokemons App</h1>
                <button onClick={this.loadData}>add</button>
                {this.state.pokemons.map((pokemon) => {
                    return <Pokemon key={pokemon.url} pName={pokemon.name} pUrl={pokemon.url}/>;
                })}

            </div>
        );
    }
}

export default App;