import React from 'react';
import SignupForm from '../components/signup';
import { authOptions } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';

export default async function IndexPage(): Promise<React.ReactNode> {
  const session = await getServerSession(authOptions);

  return (
    <section className="container grid h-full items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col h-full max-w-[980px] items-center justify-center mx-auto">
        {session ? (
          <>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-5">
              Sign Up form to receive Motortrend Emails from template
            </h1>
            <p className="text-lg mb-5">Welcome back! Use the MT Email template tool below:</p>
            <SignupForm />
          </>
        ) : (
          <p className="text-lg mb-5">Sign in to use the MT Email template tool.</p>
        )}
      </div>
    </section>
  );
};
