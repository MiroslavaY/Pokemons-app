import React, {Component} from 'react';
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

    }

    componentDidMount() {
        let _this = this;
        this.serverRequest =
            axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`)
                .then(function (result) {
                    _this.setState({
                        pokemons: result.data.results
                    });

                });
    };

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {

        return (
            <div className="App">
                <h1>Pokemons App</h1>
                {this.state.pokemons.map((pokemon) => {
                    return <Pokemon key={pokemon.url} pName={pokemon.name} pUrl={pokemon.url}/>;
                })}

            </div>
        );
    }
}

export default App;