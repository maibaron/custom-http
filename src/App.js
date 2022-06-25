import React, { useEffect, useState, useMemo, useCallback } from "react";
import useHttps from "./components/hooks/use-https";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  console.log("app is rendered");
  const { isLoading, error, sendRequest } = useHttps();
  const [tasks, setTasks] = useState([]);

  const insertTasks = useCallback((data) => {
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  }, []);

  const myRequest = useMemo(() => {
    return {
      url: "https://react-http-46d6c-default-rtdb.firebaseio.com/tasks.json",
      method: "GET",
    };
  }, []);

  useEffect(() => {
    sendRequest(myRequest, insertTasks);
  }, [sendRequest, myRequest, insertTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
