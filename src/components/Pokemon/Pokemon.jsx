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
            id: null,
            imgUrl: null,
            showInfo: false,
            isLoaded: false,
            pokeInfo: null
        }
        ;
        this.parseUrl = this.parseUrl.bind(this);
        this.handleImgError = this.handleImgError.bind(this);
        this.showInfoHandler = this.showInfoHandler.bind(this);
        this.loadPokemonDescription = this.loadPokemonDescription.bind(this);
    }

    componentDidMount() {
        this.parseUrl();
    };

    parseUrl() {

        const urlTemplate = /http:\/\/pokeapi\.co\/api\/v2\/pokemon\//;
        const id = parseInt(this.props.pUrl.replace(urlTemplate, ''), 10);
        this.setState({
            id: id,
            imgUrl: `http://pokeapi.co/media/sprites/pokemon/${this.state.id}.png`
        });
    };

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
            axios.get(`http://pokeapi.co/api/v2/pokemon/${this.state.id}`)
                .then((result) => {
                    _this.setState({
                        pokeInfo: result.data,
                        isLoaded: true
                    });
                });
    }

    render() {
        return (
            <div className="Pokemon">
                <h3>{this.props.pName}</h3>
                <img src={this.state.imgUrl} onError={this.handleImgError} alt={this.props.pName}/>
                <a onClick={this.showInfoHandler}>
                    More info
                </a>
                {
                    this.state.showInfo ?

                        ((this.state.isLoaded) ?
                            <PokeTable
                                pHeight={this.state.pokeInfo.height}
                                pWeight={this.state.pokeInfo.weight}
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


