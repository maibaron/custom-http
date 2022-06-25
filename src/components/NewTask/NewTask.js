import useHttps from "../hooks/use-https";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  console.log("new task is rendered");
  const { isLoading, error, sendRequest } = useHttps();

  const enterTask = (taskText, data) => {
    for (const dataPoint in data) {
      const generatedId = dataPoint.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    }
  };

  const enterTaskHandler = async (taskText) => {
    const myRequest = {
      url: "https://react-http-46d6c-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(myRequest, enterTask.bind(null, taskText));
  };
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
