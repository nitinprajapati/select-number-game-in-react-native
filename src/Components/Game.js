import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import Randomnumbers from './Randomnumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialTimer: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired
  }

  state = {
    selectedIndex: [],
    remainingTimer: this.props.initialTimer
  }

  gameStatus = 'PLAYING';

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        remainingTimer: prevState.remainingTimer - 1
      }), () => {
        if (this.state.remainingTimer === 0) {
          clearInterval(this.intervalID);
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  randomNumbers = shuffle(this.randomNumbers);
  
  isSelected = (index) => {
    return this.state.selectedIndex.indexOf(index) >= 0;
  }

  onPress = (index) => {
    if (this.state.selectedIndex.indexOf(index) === -1) {
      this.setState((prevState) => ({
        selectedIndex: [...prevState.selectedIndex, index]
      }));
    }
  }

  calcGameStatus = (newState) => {
    let selectedSum = newState.selectedIndex.reduce(
      (sum, curr) => {
        return sum + this.randomNumbers[curr];
      }, 0);

    if (newState.remainingTimer === 0) {
      return 'LOST';
    }
    if (selectedSum > this.target) {
      return 'LOST';
    }

    if (selectedSum < this.target) {
      return 'PLAYING';
    }

    if (selectedSum === this.target) {
      return 'WON';
    }

  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedIndex !== this.state.selectedIndex || nextState.remainingTimer === 0) {
      this.gameStatus = this.calcGameStatus(nextState);
      if(this.gameStatus !== 'PLAYING'){
        clearInterval(this.intervalID);
      }
    }
  }

  render() {
    let gameStatus = this.gameStatus;
  
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[gameStatus]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((number, index) =>
            <Randomnumbers
              key={index}
              id={index}
              isDisabled={this.isSelected(index) || gameStatus !== 'PLAYING'}
              number={number}
              onpress={this.onPress} />
          )}
        </View>
        <Text style={styles.timeLeft}>Remaining time: {this.state.remainingTimer}</Text>

        {this.gameStatus !== 'PLAYING' && (<TouchableOpacity>
          <Text 
            style={styles.btn} 
            onPress={this.props.onPlayAgain}
          >
            Play Again
          </Text>
        </TouchableOpacity>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  target: {
    fontSize: 50,
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  PLAYING: {
    backgroundColor: '#aaa'
  },
  WON: {
    backgroundColor: 'green'
  },
  LOST: {
    backgroundColor: 'red'
  },
  btn: {
    color: 'white',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    textAlign: 'center',
    padding: 10,
    marginHorizontal: 60,
    marginVertical: 40
  },
  timeLeft: {
    color: 'red',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 10,
    marginHorizontal: 60,
    marginVertical: 40
  }
});

export default Game;
