import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";

import { requireAuth } from "../../common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="HealthFirst - A platform for your medical documentation."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero-content">
        <div className="max-w-lg">
          <h1 className="text-center text-5xl font-bold leading-snug text-gray-400">
            You are logged in!
          </h1>
          <p className="my-4 text-center leading-loose">
            You are allowed to visit this page because you have a session,
            otherwise you would be redirected to the login page.
          </p>
          <div className="my-4 rounded-lg bg-gray-700 p-4">
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
          <div className="text-center">
            <button
              className="btn btn-secondary"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
