import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6 max-w-[300px] sm:max-w-[400px]   space-y-4 md:max-w-[600px] lg:max-w-[1000px] ">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-xl sm:text-2xl text-white text-blacktracking-wider md:text-3xl xl:text-4xl/none ">
            Start Your Coding Journey Today
          </h2>
          <div className="flex w-full  flex-col md:flex-row justify-between">
            <p className="text-sm md:max-w-[300px] lg:max-w-[500px] text-left text-slate-300 md:text-xl dark:text-slate-200">
              Sign up for Online Judge and unlock a world of coding challenges,
              community support, and opportunities to showcase your skills.
            </p>
            <div className="mt-3 flex flex-col gap-2 md:flex-col lg:flex-row sm:flex-row">
              <Link
                className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-8  md:font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
