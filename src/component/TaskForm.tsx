import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toastError, toastSuccess } from "../utils/toast";
import Button from "./Button";
import Input from "./Input";

import { FaPlus } from "react-icons/fa";
import { createTaskApi } from "../api/taskApi";

function TaskForm({
  setUpdateNeed,
}: {
  setUpdateNeed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  console.log("focusBoxRef");
  const onsubmit = async (data: FieldValues) => {
    console.log("data", data);
    const createTaskStatus = await createTaskApi(data);

    if (createTaskStatus.data.success) {
      toastSuccess("Task Created Successfully");
      setUpdateNeed(true);
      navigate("/");
    } else {
      toastError("Task Creation Failed");
    }
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className=" w-[80vw] mx-auto shadow-lg p-5 rounded-2xl flex justify-between  items-end  "
        encType="multipart/form-data"
      >
        <div className={"space-y-2 "}>
          <Input
            placeholder="Heading... "
            className=" text-xl h-7 w-[600px] outline-none "
            {...register("heading", { required: true })}
          />
          <Input
            placeholder="Description"
            className=" outline-none w-[600px] "
            {...register("description", { required: true })}
          />
        </div>

        <Button
          type="submit"
          className=" hover:bg-red-300 rounded-full  h-[40px]  p-3 bg-red-400  cursor-pointer  "
        >
          <FaPlus color="white" />
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;
