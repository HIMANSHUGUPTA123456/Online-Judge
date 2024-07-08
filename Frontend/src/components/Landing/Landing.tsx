import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SVGProps } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main>
      <section className="bg-gray-900 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Conquer Coding Challenges, Elevate Your Skills
            </h1>
            <p className="text-gray-400 text-lg">
              Online Judge is your ultimate platform for honing your
              problem-solving abilities and mastering coding concepts. Dive into
              a vast collection of challenges, compete with a thriving
              community, and unlock your full potential as a developer.
            </p>
            <div className="flex space-x-4">
              <Link
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                to="/problems"
              >
                Start Coding
              </Link>
              <Link
                className="text-gray-400 hover:text-white px-6 py-3 rounded-md"
                to="#"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              alt="Hero Image"
              className="rounded-lg"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width="600"
            />
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6">
            <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full">
              Key Features
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Unlock Your Coding Potential
            </h2>
            <p className="text-gray-600 text-lg">
              Online Judge offers a comprehensive suite of features to help you
              excel in your coding journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <PuzzleIcon className="h-8 w-8 text-blue-500" />
              <h3 className="text-xl font-bold">Coding Challenges</h3>
              <p className="text-gray-600">
                Tackle a diverse range of coding challenges, from beginner to
                advanced, and sharpen your problem-solving skills.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <TrophyIcon className="h-8 w-8 text-blue-500" />
              <h3 className="text-xl font-bold">Leaderboard</h3>
              <p className="text-gray-600">
                Compete with a thriving community of coders, track your
                progress, and climb the leaderboard to showcase your expertise.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <UsersIcon className="h-8 w-8 text-blue-500" />
              <h3 className="text-xl font-bold">Community Support</h3>
              <p className="text-gray-600">
                Connect with fellow coders, share insights, and collaborate on
                solutions to accelerate your learning and growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-900 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                What Our Users Say
              </h2>
              <p className="text-gray-400 text-lg">
                Hear from our satisfied users and learn how Online Judge has
                transformed their coding journey.
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-avatar.svg" />

                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-bold">John Doe</h4>
                      <p className="text-gray-500">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Online Judge has been a game-changer for me. The diverse
                    collection of coding challenges and the supportive community
                    have helped me improve my problem-solving skills and land my
                    dream job."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-avatar.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-bold">Jane Smith</h4>
                      <p className="text-gray-500">Data Scientist</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "I've been using Online Judge for the past year, and it's
                    been an invaluable resource for me. The platform's
                    comprehensive problem-solving challenges and the
                    knowledgeable community have helped me stay ahead of the
                    curve in my field."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6">
            <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full">
              Platform Statistics
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Powering the Coding Community
            </h2>
            <p className="text-gray-600 text-lg">
              Discover the impressive numbers behind Online Judge's impact on
              the coding community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-center">
              <CodeIcon className="h-8 w-8 text-blue-500" />
              <h3 className="text-3xl font-bold">10,000+</h3>
              <p className="text-gray-600">Coding Challenges</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-center">
              <UsersIcon className="h-8 w-8 text-blue-500" />
              <h3 className="text-3xl font-bold">500,000+</h3>
              <p className="text-gray-600">Registered Users</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-center">
              <TrophyIcon className="h-8 w-8 text-blue-500" />
              <h3 className="text-3xl font-bold">1,000,000+</h3>
              <p className="text-gray-600">Problems Solved</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-900 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                alt="Call to Action"
                className="rounded-lg"
                height="400"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width="600"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full">
                Join the Community
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Start Your Coding Journey Today
              </h2>
              <p className="text-gray-400 text-lg">
                Sign up for Online Judge and unlock a world of coding
                challenges, community support, and opportunities to showcase
                your skills.
              </p>
              <div className="flex space-x-4">
                <Link
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                  to="#"
                >
                  Sign Up
                </Link>
                <Link
                  className="text-gray-400 hover:text-white px-6 py-3 rounded-md"
                  to="#"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;

const CodeIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};

const PuzzleIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  );
};
const TrophyIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
};
const UsersIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};
