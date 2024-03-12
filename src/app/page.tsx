import React from 'react';
import SignupForm from '../components/signup';
// import { fetchTitlesFromAPI } from '../app/api/articles';

const IndexPage: React.FC = () => {
  // const handleFormSubmit = async () => {
  //   // Call the function that fetches titles
  //   const titles = await fetchTitlesFromAPI();
  //   return titles;
  // };

  return (
    <section className="container grid h-full items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col h-full max-w-[980px] items-center justify-center mx-auto">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-5">
          Sign Up for Motortrend Emails!
        </h1>
        <SignupForm />
      </div>
    </section>
  );
};

export default IndexPage;