import React, {Component} from 'react';
import './Pokemon.css';

class Pokemon extends React.Component {

    constructor() {
        super();
        this.state = {
            id: null
        };
        this.parseUrl = this.parseUrl.bind(this);
    }

    componentDidMount() {
        this.parseUrl();
    };

    parseUrl() {

        const urlTemplate = /http:\/\/pokeapi\.co\/api\/v2\/pokemon\//;
        const id = parseInt(this.props.pUrl.replace(urlTemplate, ''));
        this.setState({id: id});
    };

    render() {
        return (
            <div className="Pokemon">
                <h3>Name {this.props.pName}</h3>
                <img src={`http://pokeapi.co/media/sprites/pokemon/${this.state.id}.png`}/>
                <div>
                    some info
                    {this.props.pUrl}
                </div>
            </div>
        );
    }
}

export default Pokemon;
