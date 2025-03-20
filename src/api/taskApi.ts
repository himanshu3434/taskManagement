import axios from "axios";
import { FieldValues } from "react-hook-form";

export const getTasks = async () => {
  axios.defaults.withCredentials = true;
  const getTaskUrl = `${import.meta.env.VITE_SERVER_URL}/api/v1/task/all`;
  const options = {
    method: "GET",
    url: getTaskUrl,
    withCredentials: true,
  };

  const tasks = await axios.request(options);

  return tasks;
};
export const deleteTask = async (taskId: number) => {
  axios.defaults.withCredentials = true;
  const deleteTaskUrl = `${import.meta.env.VITE_SERVER_URL}/api/v1/task/delete`;
  const options = {
    method: "DELETE",
    url: deleteTaskUrl,
    data: {
      taskId: taskId,
    },
    withCredentials: true,
  };

  const deleteTaskStatus = await axios.request(options);

  return deleteTaskStatus;
};

export const updateTask = async (data: FieldValues, taskId: number) => {
  const updateTaskUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/api/v1/task/update/${taskId}`;
  const createOptions = {
    method: "POST",
    url: updateTaskUrl,
    data: {
      ...data,
    },
  };

  const updateTaskStatus = await axios.request(createOptions);

  return updateTaskStatus;
};

export const createTaskApi = async (data: FieldValues) => {
  const createTaslUrl = `${import.meta.env.VITE_SERVER_URL}/api/v1/task/add`;
  const createOptions = {
    method: "POST",
    url: createTaslUrl,
    data: {
      ...data,
    },
  };

  const createTaskStatus = await axios.request(createOptions);

  return createTaskStatus;
};
