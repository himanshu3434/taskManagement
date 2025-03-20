import { useEffect, useState } from "react";

import { Itask } from "../types/types";

import { getTasks } from "../api/taskApi";
import Task from "./Task";
import TaskForm from "./TaskForm";

function Products() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateNeed, setUpdateNeed] = useState(true);

  const getAllTasks = async () => {
    const allTasks = await getTasks();

    if (allTasks.data.success) {
      setTasks(allTasks.data.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("useEffect");
    if (updateNeed) {
      console.log("useEffect if");
      setLoading(true);
      getAllTasks();
      setUpdateNeed(false);
    }
  }, [updateNeed]);

  return (
    <div>
      <div className="sm:flex sm:space-x-3 ">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="text-3xl font-bold">Loading ...</div>
          </div>
        ) : (
          <div className="sm:mt-14  p-4 ">
            <div className="text-center text-4xl  font-bold"> Tasks</div>
            <TaskForm setUpdateNeed={setUpdateNeed} />
            <div className="flex  flex-wrap justify-center ">
              {tasks.map((task: Itask) => {
                return (
                  <Task
                    key={task.id}
                    taskDetails={task}
                    setUpdateNeed={setUpdateNeed}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
