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
      isLoaded: false
    };

    this.LIMIT = 25;

    this.parseUrl = this.parseUrl.bind(this);
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
          let pokeObj = result.data.results.map((el) =>{
            return Object.assign({}, el, {id: _this.parseUrl(el.url)})
          });


          _this.setState({
            pokemons: this.state.pokemons.concat(pokeObj),
            offset: this.state.offset + this.LIMIT,
            isLoaded: true
          });

        });
  }

  scrollHandler() {

    const html = document.documentElement,
      body = document.body,
      scrollTop = html.scrollTop || (body && body.scrollTop ) || 0;

    if (html.clientHeight + scrollTop >= html.scrollHeight) {
      this.loadData();
    }
  }

   parseUrl(url) {

   const urlTemplate = /http:\/\/pokeapi\.co\/api\/v2\/pokemon\//;
   return parseInt(url.replace(urlTemplate, ''), 10);

   };
  render() {

    return (


      <div  className="App">
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
        <div onScroll={this.scrollHandler}>
          {
            (this.state.isLoaded ) ?
              this.state.pokemons.map((pokemon) => {
                return <Pokemon
                  id={pokemon.id}
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />;
              }) :

              <LoadingIndicator
                color={{red: 97, green: 218, blue: 251, alpha: 1}}
                segmentWidth={10}
                segmentLength={20}
              />
          }
        </div>


      </div>
    );
  }
}

