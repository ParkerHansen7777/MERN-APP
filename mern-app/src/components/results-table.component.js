/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import axios from 'axios';
import "./component.css";

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

export default class ResultsTable extends Component {
    constructor(props){
        super(props);

        this.state = {games: [], results: []};

    }

    componentDidMount() {
        axios.get('https://gametracker-backend.onrender.com/games/')
            .then(response => {
                this.setState({ games: response.data })
            })
            .catch((error) => {
                console.log(error);
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
        );
    }


}