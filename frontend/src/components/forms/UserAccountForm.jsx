import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import baseURL from "@/apiConfig";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserAccountForm = () => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const resetForm = () => {
    reset();
    toast.success("Form resetted!");
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/update-account-information/${user.user_id}/`,
        data
      );
      reset();
      navigate("/confirm-changes");
    } catch (error) {
      toast.error("Error updating user account. Please try again.");
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Edit Account
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6.5 px-4 lg:pl-20">
            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                First name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("first_name", {
                  required: "First name is required",
                })}
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={user.first_name}
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Last name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("last_name", {
                  required: "Last name is required",
                })}
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={user.last_name}
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Username <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                type="text"
                placeholder="Enter your username"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={user.username}
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("email", {
                  required: "email is required",
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={user.email}
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Password <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                })}
                type="password"
                placeholder="Enter your password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2 mb-9">
              <label className="mb-2.5 block text-black dark:text-white">
                Re-type Password <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("confirmPassword", {
                  validate: (defaultValue) =>
                    defaultValue === getValues("password") ||
                    "Passwords do not match",
                })}
                type="password"
                placeholder="Re-type your password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="lg:flex block justify-start mb-7 w-full">
              <button
                type="submit"
                className="btn dark:btn-neutral w-full lg:w-[20%] flex justify-center p-3 bg-primary font-medium text-gray">
                Submit
              </button>
              <div
                onClick={resetForm}
                className="btn-ghost border-graydark w-full mt-3 lg:mt-0 lg:w-[10%] btn">
                Reset
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserAccountForm;
