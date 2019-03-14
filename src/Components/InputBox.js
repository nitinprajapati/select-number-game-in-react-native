import React from 'react';
import {Input} from 'native-base';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    Input: {
        flex: 1,
        backgroundColor: '#936EF9',
        alignItems: 'center'   
    }
});

const InputBox = ({id, placeholder}) => {
    return (
        <Input id={id} placeholder={placeholder}/>
    );
}

export default InputBox;
