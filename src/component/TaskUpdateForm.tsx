import React, { useEffect } from "react";
import Button from "./Button";
import { FieldValues, useForm } from "react-hook-form";
import Select from "./Select";
import Input from "./Input";
import { updateTask } from "../api/taskApi";
import { toastError, toastSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { Itask } from "../types/types";

function TaskUpdateForm({
  taskDetails,
  setIsFormOpen,
  setUpdateNeed,
}: {
  taskDetails: Itask;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateNeed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      heading: taskDetails.heading,
      description: taskDetails.description,
      status: taskDetails.status,
    },
  });

  //   let focusBoxRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    // if (focusBoxRef.current) focusBoxRef.current.focus();
  }, []);
  const navigate = useNavigate();
  const onsubmit = async (data: FieldValues) => {
    console.log("{  inside ");
    const taskUpdateStatus = await updateTask(data, taskDetails.id);
    console.log(" updat edone ", taskUpdateStatus);
    if (taskUpdateStatus.data.success) {
      toastSuccess("Task Updated Successfully");
      setIsFormOpen(false);
      setUpdateNeed(true);
      navigate("/");
    } else {
      toastError("Task Update Failed");
    }
  };
  return (
    <div className=" m-2 my-4">
      <div className=" w-[80vw]  shadow-lg rounded-lg  flex  justify-between p-3">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" w-[80vw] mx-auto shadow-lg p-5 rounded-2xl flex justify-between  items-end  "
          encType="multipart/form-data"
        >
          <div className="space-y-2 px-3">
            <Input
              placeholder="Heading... "
              className=" text-xl h-7 w-[500px] outline-none "
              {...register("heading", { required: true })}
              //   ref={focusBoxRef}
            />
            <Input
              placeholder="Description"
              className=" outline-none w-[500px] "
              {...register("description", { required: true })}
            />
          </div>

          <Select
            options={["PENDING", "COMPLETED"]}
            className=" text-black"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            className="  hover:bg-yellow-300  bg-yellow-400 text-gray-700 font-semibold mt-2 h-[7vh] w-[7vw] rounded-xl "
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default TaskUpdateForm;
