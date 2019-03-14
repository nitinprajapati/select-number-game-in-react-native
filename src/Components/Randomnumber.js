import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import {PropTypes} from 'prop-types';

const Randomnumbers = ({id, isDisabled, onpress, number }) => {
  return (
    <TouchableOpacity key={id} >
      <Text 
        style={[styles.randomNumbers, isDisabled && styles.selected]} 
        onPress={() => onpress(id)}
      >
        {number}
      </Text>
    </TouchableOpacity>
  );
};

Randomnumbers.propTypes = {
  id: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  onpress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  randomNumbers: {
    fontSize: 40,
    backgroundColor: '#ddd',
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    width: 100
  },
  selected: {
    opacity: 0.3
  }
});
export default Randomnumbers;
