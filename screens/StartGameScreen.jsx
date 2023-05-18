import React, { useState } from "react";
import { Alert, StyleSheet,  TextInput, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/color";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({onConfirmNumber}) => {

  const [enteredNumber,SetEnteredNumber] = useState('')

  const numberInputHandler=(enteredText)=>{
    SetEnteredNumber(enteredText)
  }

  const resetInputHandler=()=>{
    SetEnteredNumber('')
  }

  const confirmInputHandler=()=>{
    const choseNumber = Number(enteredNumber)
    if(isNaN(choseNumber)||choseNumber<=0 || choseNumber>100){
      // show alert...
      Alert.alert('Invalid number' , 'Number has to be a number between 1 and 99.',
      [{text:"Okay", style:"destructive", onPress:resetInputHandler}]
      
      )

      return;
    }
    
    onConfirmNumber(choseNumber)
    // console.log("validNumber", choseNumber)
  }

  return (
    <View style={styles.rootContainer}>

      <Title>
        Guess My Number
      </Title>
    <Card >
      <InstructionText>
        Enter a Number
      </InstructionText>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={numberInputHandler}
        value={enteredNumber}
      />
      <View style={styles.buttonPosition}>
        <View style={styles.indivisulButtonSize}>
          <PrimaryButton onPressbutton={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.indivisulButtonSize}>
          <PrimaryButton onPressbutton ={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer:{
    flex:1,
    marginTop:100,
    alignItems:'center'
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonPosition: {
    flexDirection: "row",
  },
  indivisulButtonSize: {
    flex: 1,
  },
});

export default StartGameScreen;
