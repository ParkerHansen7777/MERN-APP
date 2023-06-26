import React, { Component } from 'react';
import axios from 'axios';
import "./component.css";
export default class CreateGames extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeGame = this.onChangeGame.bind(this);
        this.onChangeResult = this.onChangeResult.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            gamePlayed: 'Chess',
            result: 'Win',
            users: []
        }
    }
    
    componentDidMount() {
       axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
    }
    
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeGame(e) {
        this.setState({
            gamePlayed: e.target.value
        });
    }
    
    onChangeResult(e) {
        this.setState({
           result: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const game = {
            username: this.state.username,
            gamePlayed: this.state.gamePlayed,
            result: this.state.result
            
        }

        console.log(game);

        axios.post('http://localhost:5000/games/add', game)
            .then(res => console.log(res.data));
        
    

        window.location = '/';
    }


    render(){
        return(
        <div className="page">
            <h3>Create New Game Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Player: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                                return <option
                                key={user}
                                value={user}>{user}
                                </option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Game Played: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.gamePlayed}
                        on={this.onChangeGame}>
                        <option selected="Chess" value="Chess">Chess</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Result: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.result}
                        onChange={this.onChangeResult}>
                        <option>Win</option>
                        <option value="Draw">Draw</option>
                        <option value="Loss">Loss</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Game Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}