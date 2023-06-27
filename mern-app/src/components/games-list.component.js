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


const Result = props => (
    <tr>
        <td>{props.result.name}</td>
        <td>{props.result.value[0]}</td>
        <td>{props.result.value[1]}</td>
        <td>{props.result.value[2]}</td>
        <td>{props.result.value[3]}</td>
        <td>{props.result.value[4]}</td>
    </tr>
)


export default class GamesList extends Component {
    constructor(props){
        super(props);

        this.deleteGame = this.deleteGame.bind(this);
        this.state = {games: [], results: []};

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

    resultsTable() {

        const gamesMap = this.state.games.map(currentgame => 
            [currentgame.username, currentgame.result]
        )
    
        const resultsMap = new Map();
       //[games played, wins, draws, losses, points(3 for win, 1 for a draw)]
        let results_arr = [0, 0, 0, 0, 0]
        for (let it of gamesMap.entries()){
            
           
           
            if (!resultsMap.has(it[1][0])){
                results_arr = [0, 0, 0, 0, 0]
                resultsMap.set(it[1][0], results_arr)
               
            } 
          
           results_arr = resultsMap.get(it[1][0]); 
           
           if(it[1][1] === 'Win'){
                results_arr[0]++
                results_arr[1]++
                results_arr[4]+=3
                resultsMap.set(it[1][0], results_arr)
              
            }
            else if(it[1][1] === 'Draw'){
                results_arr[0]++
                results_arr[2]++
                results_arr[4]++
                resultsMap.set(it[1][0], results_arr)
               
            }
            else if(it[1][1] === 'Loss'){
                results_arr[0]++
                results_arr[3]++
                resultsMap.set(it[1][0], results_arr)
               
            }             
        }

        //console.log(resultsMap);
        
        let results = Array.from(resultsMap, ([name, value]) => ({ name, value})) 
        //console.log(results);
        
        return results.map(currentresult => {
            return <Result result={currentresult} key={currentresult.name}/>
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
                 <h3>Results Table</h3>
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th>Player</th>
                            <th>Games Played</th>
                            <th>Wins</th>
                            <th>Draws</th>
                            <th>Loses</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {this.resultsTable()}
                    </tbody>
                </table> 
            </body>
        )
    }
}