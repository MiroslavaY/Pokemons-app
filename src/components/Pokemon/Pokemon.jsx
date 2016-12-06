import React from 'react';
import PokeTable from '../PokeTable/PokeTable.jsx';
import axios from 'axios';
import './Pokemon.css';
import defaultPhoto from '../../images/pokeball.png';
import LoadingIndicator from 'react-loading-indicator';

export default class Pokemon extends React.Component {

  constructor() {
    super();
    this.state = {
      imgUrl: "",
      showInfo: false,
      pokeInfo: null
    };
    this.showInfoHandler = this.showInfoHandler.bind(this);
    this.handleImgError = this.handleImgError.bind(this);
    this.loadPokemonDescription = this.loadPokemonDescription.bind(this);
  }

  componentDidMount(){
    this.setState({
      imgUrl: `http://pokeapi.co/media/sprites/pokemon/${this.props.id}.png`
    });
  }

  handleImgError() {
    this.setState({
      imgUrl: defaultPhoto
    });
  }


  showInfoHandler() {
    this.setState({
      showInfo: !this.state.showInfo
    });
    if (this.state.pokeInfo === null) {
      this.loadPokemonDescription();
    }

  }

  loadPokemonDescription() {
    let _this = this;
    this.serverRequest =
      axios.get(`http://pokeapi.co/api/v2/pokemon/${this.props.id}`)
        .then((result) => {
          _this.setState({
            pokeInfo: result.data
          });
        });
  }

  render() {


    return (
      <div className="Pokemon">
        <h3>{this.props.name}</h3>
        <img src={this.state.imgUrl} onError={this.handleImgError} alt={this.props.name}/>
        <button onClick={this.showInfoHandler}>
          More info
        </button>
        {
          this.state.showInfo ?

            ((this.state.pokeInfo !== null) ?
              <PokeTable
                name={this.props.name}
                height={this.state.pokeInfo.height}
                weight={this.state.pokeInfo.weight}
                abilities={this.state.pokeInfo.abilities}
              /> :
              <LoadingIndicator
                color={{red: 97, green: 218, blue: 251, alpha: 1}}
              />)
            :
            <p>{""}</p>
        }
      </div>
    );
  }
}


