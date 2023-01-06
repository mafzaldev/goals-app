import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goalsList, setGoalsList] = useState([]);

  function modalHandler() {
    setModalIsVisible((prev) => !prev);
  }

  function addGoalHandler(enteredGoalText) {
    setGoalsList((currentGoalsList) => [
      ...currentGoalsList,
      { id: Math.random().toString(), text: enteredGoalText },
    ]);
    setModalIsVisible(false);
  }

  function deleteGoalHandler(goalId) {
    setGoalsList((currentGoalsList) => {
      return currentGoalsList.filter((goal) => goal.id !== goalId);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color="#5e0acc" onPress={modalHandler} />
        <GoalInput
          isVisible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={modalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goalsList}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  id={itemData.item.id}
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
    marginTop: 16,
  },
});
