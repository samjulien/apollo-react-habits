import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_HABIT = gql`
  mutation AddHabit($input: NewHabitInput!) {
    createHabit(input: $input) {
      id
      points
      description
      entries {
        id
      }
    }
  }
`;

const AddHabit = () => {
  const [state, setState] = useState("");
  const [addHabit, { data, loading, error }] = useMutation(ADD_HABIT);

  if (data) console.log({ data });

  return (
    <form>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        type="text"
        placeholder="Add habit"
      />
      <button
        disabled={loading}
        onClick={() =>
          addHabit({
            variables: { input: { description: state } },
            update: (cache, { data }) => {
              cache.modify("ROOT_QUERY", {
                habits: (habits) => {
                  return [...habits, data.createHabit];
                },
              });
            },
          })
        }
        type="button"
      >
        Add
      </button>
    </form>
  );
};

export default AddHabit;

board.on("ready", function () {
  console.log("ready");

  tempSensor = new five.Thermometer({
    controller: "TMP36",
    pin: "A0",
    aref: 1,
  });

  io.on("connection", function (socket) {
    console.log("sockets on connection");

    tempSensor.on("change", function () {
      console.log(this.C); //Celsius
      console.log(this.F); //Fahrenheit
      socket.emit("tempData", this.F);
    });
  });
});
