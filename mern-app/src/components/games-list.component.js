/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./component.css";

const Game = props => (
    <tr>
        <td>{props.game.username}</td>
        <td>{props.game.gamePlayed}</td>
        <td>{props.game.result}</td>
        <td>
        <Link to={"/edit/"+props.game._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGame(props.game._id) }}>delete</a>
        </td>  
    </tr>
)


export default class GamesList extends Component {
    constructor(props){
        super(props);

        this.deleteGame = this.deleteGame.bind(this);
        this.state = {games: []};

    }

    componentDidMount() {
        axios.get('http://localhost:5000/games/')
            .then(response => {
                this.setState({ games: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteGame(id) {
        axios.delete('http://localhost:5000/games/'+id)
            .then(res => console.log(res.data));

        this.setState({
            games: this.state.games.filter(el => el._id !== id)
        })
    }   
    
    gameList() {
        return this.state.games.map(currentgame => {
            return <Game game={currentgame} deleteGame={this.deleteGame} key={currentgame._id}/>;
        })
    }   
    
    render(){
        return(
            <body>
                <h3>Logged Games</h3>
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th>Player</th>
                            <th>Game Played</th>
                            <th>Result</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        { this.gameList() }
                    </tbody>
                </table>
            </body>
        )
    }
}