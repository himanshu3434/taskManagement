import { Itask } from "../types/types";
import { toastError, toastSuccess } from "../utils/toast";
import Button from "./Button";
import { useState } from "react";
import TaskUpdateForm from "./TaskUpdateForm";
import { deleteTask } from "../api/taskApi";

function Task({
  taskDetails,
  setUpdateNeed,
}: {
  taskDetails: Itask;
  setUpdateNeed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const updateTaskHandler = () => {
    setIsFormOpen(true);
  };
  const deleteTaskHandler = async () => {
    const deleteTaskStatus = await deleteTask(taskDetails.id);
    if (deleteTaskStatus.data.success) {
      toastSuccess("Task Deleted Successfully");
      setUpdateNeed(true);
    } else {
      toastError("Task Delete Failed");
    }
  };

  return isFormOpen ? (
    <TaskUpdateForm
      key={taskDetails.id}
      taskDetails={taskDetails}
      setIsFormOpen={setIsFormOpen}
      setUpdateNeed={setUpdateNeed}
    />
  ) : (
    <div className=" m-2 my-4">
      <div className=" w-[80vw]  shadow-lg rounded-lg  flex  justify-between p-3">
        <div className="space-y-2 px-3">
          <div className=" text-xl   h-7  ">{taskDetails.heading}</div>
          <div className="  h-6  pl-1">{taskDetails.description}</div>
          <div className="flex gap-2 items-center"></div>
        </div>

        <div className="space-x-1">
          <Button
            className="  hover:bg-yellow-300  bg-yellow-400 text-gray-700 font-semibold mt-2 h-[7vh] w-[7vw] rounded-xl"
            onClick={updateTaskHandler}
          >
            Update
          </Button>
          <Button
            className="  hover:bg-red-300  bg-red-400 text-white font-semibold mt-2 h-[7vh] w-[7vw] rounded-xl"
            onClick={deleteTaskHandler}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Task;
