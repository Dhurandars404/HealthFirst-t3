import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../common/validation/auth";
import type { ILogin } from "../common/validation/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import loadingImage from "./loading.svg";
const Home: NextPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: ILogin) => {
      if (data.password.length < 5 || data.password.length > 20) {
        setError("Password should be between 5-20 characters");
      } else {
        setisLoading(true);
        try {
          setError("");
          const result = await signIn("credentials", {
            ...data,
            redirect: false,
          });
          if (result.ok) {
            router.push("/dashboard");
          } else {
            setError("Incorrect Email or Password");
            setisLoading(false);
          }
        } catch (err) {
          console.log(err);
          reset();
        }
        // setisLoading(false);
      }
    },
    [reset, router]
  );

  return (
    <div>
      <Head>
        <title>HealthFirst - Login</title>
        <meta
          name="description"
          content="HealthFirst - A platform for your medical documentation."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          className="box-border flex h-screen items-center justify-center bg-white font-montserrat"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card bg-base-100 w-96 text-center shadow-xl">
            <div className="card-body">
              <h1 className="m-4 text-3xl font-semibold">Login</h1>
              <p
                className="bg-red-300 font-bold text-white"
                aria-live="assertive"
              >
                {error}
              </p>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="Email..."
                    className="m-4 border-b-2 border-black p-2 outline-none"
                    {...field}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    placeholder="Password..."
                    className="m-4 border-b-2 border-black p-2 outline-none"
                    {...field}
                  />
                )}
              />
              <div className="card-actions items-center justify-between">
                <button
                  className="relative m-4 h-10 w-1/2 rounded-3xl bg-violet-800  p-2 font-bold text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Image
                      src={loadingImage}
                      alt="loading"
                      width={25}
                      height={25}
                      className="m-auto"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <br />
                <p className="m-4 font-semibold text-gray-400">
                  Not registered?
                  <span className="text-violet-800">
                    <Link href="/sign-up"> Sign Up</Link>
                  </span>
                </p>
                {/* <Link href="/sign-up" className="link">
                  Go to sign up
                </Link> */}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
