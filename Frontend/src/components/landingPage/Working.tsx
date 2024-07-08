const Working = () => {
  return (
    <section id={'about'} className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6 max-w-[300px] sm:max-w-[400px]   space-y-4 md:max-w-[600px] lg:max-w-[1000px] ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 py-6  lg:max-w-[600px]">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Key Features
            </div>
            <h2 className="text-2xl sm:text-3xl dark:text-white text-blacktracking-wider md:text-5xl xl:text-6xl/none">
              Unlock Your Coding Potential
            </h2>
            <p className="text-sm text-slate-600 md:text-xl dark:text-slate-200">
              Online Judge offers a comprehensive suite of features to help you
              excel in your coding journey.
            </p>
          </div>
          <div className="mx-auto border-t-2 grid lg:max-w-[600px]  gap-6 py-6 ">
            {/* lg:grid-cols-2 lg:gap-12*/}
            <div className="flex flex-1 flex-col gap-4 lg:p-8">
              <h3 className="text-xl sm:text-2xl dark:text-white text-blacktracking-wider md:text-3xl xl:text-4xl/none">
                Best Problmes
              </h3>
              <p className="text-sm text-slate-600 md:text-xl dark:text-slate-200">
                Tackle a diverse range of coding Problems, from beginner to
                advanced, and sharpen your problem-solving skills.
              </p>
            </div>
            {/*<div className="w-full justify-center flex mt-4">
              <div className=" bg-gray-20 overflow-hidden pb-4 w-fit rounded-lg border  dark:bg-white h-fit">
                <div className="px-4 py-1  bg-gray-300 roun text-sm text-left text-black">
                  AI Assistant
                </div>
                <div className="mx-4  mt-1 md:w-64 md:h-64 w-56 lg:h-80 lg:w-80 h-56 rounded-lg overflow-hidden border dark:border-[0.5px]  relative ">
                  <img
                    src="/reallygreatsite.png"
                    alt="Background Image"
                    className="dark:opacity-85 opacity-65"
                  />
                </div>
              </div>
  </div>*/}
          </div>
          <div className="mx-auto border-t-2 grid lg:max-w-[600px] gap-6 py-6">
            {/** lg:grid-cols-2 lg:gap-12 */}
            <div className="flex flex-1 flex-col gap-4 lg:p-8">
              <h3 className="text-xl sm:text-2xl dark:text-white text-blacktracking-wider md:text-3xl xl:text-4xl/none">
                Coding Challenges
              </h3>
              <p className="text-sm text-slate-600 md:text-xl dark:text-slate-200">
                Tackle a diverse range of coding challenges, from beginner to
                advanced, and sharpen your problem-solving skills.
              </p>
            </div>
            {/* <div className="w-full justify-center flex mt-4">
              <div className=" bg-gray-20 overflow-hidden pb-4 w-fit rounded-lg border  dark:bg-white h-fit">
                <div className="px-4 py-1  bg-gray-300 roun text-sm text-left text-black">
                  AI Assistant
                </div>
                <div className="mx-4  mt-1 md:w-64 md:h-64 w-56 lg:h-80 lg:w-80 h-56 rounded-lg overflow-hidden border dark:border-[0.5px]  relative ">
                  <img
                    src="/reallygreatsite.png"
                    alt="Background Image"
                    className="dark:opacity-85 opacity-65"
                  />
                </div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Working;
