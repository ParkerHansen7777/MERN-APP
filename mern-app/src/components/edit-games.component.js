import React, { Component } from 'react';
import axios from 'axios';
export default class EditGames extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeResult = this.onChangeResult.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            result: '',
            duration: 0,
            users: []
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/games/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              result: response.data.result,
              duration: response.data.duration,
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
        axios.get('http://localhost:5000/users/')
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

    onChangeResult(e) {
        this.setState({
           result: e.target.value
        });
    }
    
    onChangeDuration(e) {
        this.setState({
           duration: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const game = {
            username: this.state.username,
            result: this.state.result,
            duration: this.state.duration
            
        }

        console.log(game);

        axios.post('http://localhost:5000/games/update/'+this.props.match.params.id, game)
            .then(res => console.log(res.data));
        
    

        window.location = '/';
    }


    render(){
        return(
        <div>
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
                    <label>Result: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.result}
                        onChange={this.onChangeResult}
                        />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Game Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}