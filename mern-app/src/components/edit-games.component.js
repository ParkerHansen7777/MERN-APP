import React, { Component } from 'react';
import axios from 'axios';
import "./component.css";
export default class EditGames extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeGame = this.onChangeGame.bind(this);
        this.onChangeResult = this.onChangeResult.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            gamePlayed: '',
            result: '',
            users: []
        }
    }
    
    componentDidMount() {
        axios.get('https://gametracker-backend.onrender.com/games/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              gamePlayed: response.data.gamePlayed,
              result: response.data.result,
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
        axios.get('https://gametracker-backend.onrender.com/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
              })
            }
          })
          .catch((error) => {
            console.log(error);
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

        axios.post('https://gametracker-backend.onrender.com/games/update/'+this.props.match.params.id, game)
            .then(res => console.log(res.data));
        
    

        window.location = '/';
    }


    render(){
        return(
        <body>
            <h3>Edit Game Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
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
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.gamePlayed}
                        onChange={this.onChangeGame}
                        />
                </div>
                <div className="form-group">
                    <label>Result: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.result}
                        onChange={this.onChangeResult}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Game Log" className="btn btn-primary" />
                </div>
            </form>
        </body>
        )
    }
}