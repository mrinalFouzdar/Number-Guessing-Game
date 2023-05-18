import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetweeen(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetweeen(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;
const GameScreen = ({ userChosedNumber, onGameOver }) => {
  const initialGuess = generateRandomBetweeen(
    minBoundary,
    maxBoundary,
    userChosedNumber
  );
  const [cureentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const nextGuessHandler = (direction) => {
    // direction ===> 'lower'/'greater'
    if (
      (direction === "lower" && cureentGuess <= userChosedNumber) ||
      (direction === "greater" && cureentGuess >= userChosedNumber)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = cureentGuess;
    } else {
      minBoundary = cureentGuess;
    }
    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetweeen(
      minBoundary,
      maxBoundary,
      cureentGuess
    );

    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  };

  useEffect(() => {
    if (cureentGuess === userChosedNumber) {
      console.log("got it!");
      onGameOver(true,guessRounds.length);
    }
  }, [cureentGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{cureentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        {/* + - */}
        <View style={styles.buttonPosition}>
          <View style={styles.indivisulButtonSize}>
            <PrimaryButton
              onPressbutton={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.indivisulButtonSize}>
            <PrimaryButton onPressbutton={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      {/* <View> */}
        {/* {
          guessRounds.map(guessRounds=><Text key={guessRounds}>{guessRounds}</Text>)
        } */}
        <View style={styles.listContainer}>
          <FlatList
            data={guessRounds}
            renderItem={(itemData) => (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            )}
            keyExtractor={(item) => item}
          />
        </View>
      {/* </View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 37,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonPosition: {
    flexDirection: "row",
  },
  indivisulButtonSize: {
    flex: 1,
  },
  listContainer:{
    flex:1,
    padding:16,

  }
});
