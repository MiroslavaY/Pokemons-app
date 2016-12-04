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
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    componentDidMount() {
        this.loadData();
        window.addEventListener('scroll', this.scrollHandler);
    };

    componentWillUnmount() {
        this.serverRequest.abort();
        window.removeEventListener('scroll', this.scrollHandler);
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

    scrollHandler() {

        const html = document.documentElement,
            body = document.body,
            scrollTop = html.scrollTop || body && body.scrollTop || 0;
        let inProgress = false;

        if(html.clientHeight + scrollTop >= html.scrollHeight &&! inProgress){
            this.loadData();
            inProgress = true;
        }
        console.log(scrollTop);


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