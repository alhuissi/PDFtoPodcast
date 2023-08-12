"use client";
import React from "react";
import signIn from "../src/firebase/auth/signin";
import loginWithGoogle from "../src/firebase/auth/signinWithGoogle";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      return router.push("/generate");
    } catch (e) {
      console.error("Login failed:", e);
    }
  };

  const handleGoToRegister = () => {
    router.push("/signup");
  };

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/generate");
  };
  return (
    <section className="bg-[#171823] dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleForm} className="space-y-4 md:space-y-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <p>Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@mail.com"
                  className="g-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <label htmlFor="password">
                <p>Password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </label>
              <br />
              <button
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="submit"
              >
                Sign in
              </button>
              <br />
            </form>
            {/*<div className="text-center">
              <span className="text-black">or</span>
            </div>
            <button
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={() => handleLoginWithGoogle()}
            >
              Sign in with Google
            </button>*/}
            <div className="text-center">
              <span className="text-black">
                Don't have an account?{" "}
                <span
                  onClick={() => handleGoToRegister()}
                  className="text-black cursor-pointer transition hover:text-gray-500 underline
                  "
                >
                  {" "}
                  Register here
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
