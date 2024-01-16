import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UserAccountForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const resetForm = () => {
    reset();
    toast.success("Form resetted!");
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Edit Account
          </h3>
        </div>
        <form>
          <div className="py-6.5 px-4 lg:pl-20">
            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                First name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("fname", {
                  required: "First name is required",
                })}
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Last name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("lname", {
                  required: "Last name is required",
                })}
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
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
