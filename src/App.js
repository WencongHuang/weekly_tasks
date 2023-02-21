import React, { useState, useEffect } from "react";
import "./App.css";

const WEEKLY_TASKS = [
  "Sweep Living Room Floor",
  "Mob Living Room Floor",
  "Sweep Kitchen Floor",
  "Mob Kitchen Floor",
  "Clean Kitchen Desktop",
  "Wash Stove Desktop",
  "Take out Trash",
  "TBD",
];

const MEMBERS = [
  "Anna",
  "Maeve",
  "Shaun",
  "Edmond",
  "Jefferson",
  "Nathan",
  "Alex",
  "Amelia",
];

function App() {
  const [numOfWeekInput, setNumOfWeekInput] = useState("");
  const [taskTable, setTaskTable] = useState(null);

  const handleNumOfWeekInput = (e) => {
    // Not allow user to enter input that is less than 0
    if (Number(e.target.value) < 0) {
      alert("Please enter a number that is not less than 0!");
      setNumOfWeekInput("");
    } else {
      setNumOfWeekInput(e.target.value);
    }
  };

  const handleGenerateClick = (numOfWeek) => {
    const newTable = MEMBERS.map((member) => {
      const newTask = WEEKLY_TASKS.map((task) => {
        return { task: task, todo: false };
      });
      return {
        member: member,
        weeklyTasks: newTask,
      };
    });

    // Display an table that has no "Todo" when input is empty or 0
    if (numOfWeek && numOfWeek !== "0") {
      for (let row = 0; row < newTable.length; row++) {
        newTable[row].weeklyTasks[
          (row + Number(numOfWeek) - 1) % MEMBERS.length
        ].todo = true;
      }
    }

    setTaskTable(newTable);
  };

  useEffect(() => {
    // Display an table that has no "Todo" for initial load
    handleGenerateClick(0);
  }, []);

  return (
    <div className="App">
      <input
        type="number"
        min={0}
        value={numOfWeekInput}
        onChange={handleNumOfWeekInput}
        placeholder={`What week should I generate?`}
      />

      <button onClick={() => handleGenerateClick(numOfWeekInput)}>
        Generate Table
      </button>

      <table>
        <thead>
          <tr>
            <th></th>
            {WEEKLY_TASKS.map((task) => {
              return <th key={`${task}`}>{`${task}`}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {taskTable &&
            taskTable.map((member, memberIndex) => {
              return (
                <tr key={`${member.member}+${memberIndex}`}>
                  <td style={{ fontWeight: "bold" }}>{member.member}</td>
                  {member.weeklyTasks.map((task, taskIndex) => {
                    return (
                      <td key={`${task.task}+${taskIndex}`}>
                        {task.todo ? "Todo" : null}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
