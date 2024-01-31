import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";

const ReLogin = () => {
  let { loginUser } = useContext(AuthContext);
  const { formState, handleSubmit, register } = useForm();
  const { isSubmitting } = formState;

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Confirm Changes
              </h1>
              <form
                onSubmit={handleSubmit(loginUser)}
                className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your username
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter a username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter a password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full btn btn-primary transition bg-opacity-100 hover:bg-opacity-80">
                  {isSubmitting && (
                    <span className="w-fit animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></span>
                  )}
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReLogin;
