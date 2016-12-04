import React  from 'react';
import Pokemon from '../Pokemon/Pokemon.jsx';
import axios from 'axios';
import './App.css';
import logo from '../../images/logo.svg';
import LoadingIndicator from 'react-loading-indicator';



export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            pokemons: [],
            offset: 0,
            limit: 25,
            isLoaded: false
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
                        offset: this.state.offset + this.state.limit,
                        isLoaded: true
                    });

                });
    }

    scrollHandler() {

        const html = document.documentElement,
            body = document.body,
            scrollTop = html.scrollTop || body && body.scrollTop || 0;

        let inProgress = false;

        if (html.clientHeight + scrollTop >= html.scrollHeight && !inProgress) {
            this.loadData();
            inProgress = true;
        }

    }

    render() {

        return (


            <div className="App">
                <div className="App-header">
                    <img
                        src={logo}
                        className="App-indicator"
                        alt="indicator"/>
                    <h1>Pokemons App</h1>
                </div>
                <p className="App-intro">
                    List of pokemons
                </p>
                {
                    (this.state.isLoaded ) ?
                        this.state.pokemons.map((pokemon) => {
                            return <Pokemon key={pokemon.url} pName={pokemon.name} pUrl={pokemon.url}/>;
                        }) :

                        <LoadingIndicator
                            color={{red: 97, green: 218, blue: 251, alpha:1}}
                            segmentWidth={10}
                            segmentLength={20}
                        />
                }

            </div>
        );
    }
}

