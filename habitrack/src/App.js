import React from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import AddHabit from "./AddHabit";

const HABITS_QUERY = gql`
  query HABITS_QUERY {
    habits {
      id
      description
      points
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(HABITS_QUERY);
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Ruh roh! {error.message}</p>;
  }
  return (
    <>
      <h2>Habits</h2>
      <AddHabit />
      <ul>
        {data.habits.map((habit) => {
          return <li key={habit.id}>{habit.description}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
