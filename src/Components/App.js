/**
 * Sample react Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import Game from './Game';
import React from 'react';

class App extends React.Component{
  state = {
    gameId: 1
  };

  reset = () => {
    this.setState((prevState) => ({
      gameId : prevState.gameId + 1
    }));
  }

  render(){
    return (
      <Game 
        key={this.state.gameId}
        onPlayAgain={this.reset}
        randomNumberCount={6} 
        initialTimer={10} />
    );
  } 
}

export default App;
