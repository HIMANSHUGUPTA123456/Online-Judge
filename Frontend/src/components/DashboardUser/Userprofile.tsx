import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { BACKENDURL } from "@/api/api";
interface User {
  username: string;
  fname: string;
  lname: string;
  email: string;
  createdAt: string;
}
interface Problem {
  _id: string;
  title: string;
  difficulty: string;
}
export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const [mounted, setMounted] = useState(false);
  const apicall = async () => {
    try {
      const res = await axios.get(`${BACKENDURL}/user/profile`, {
        withCredentials: true,
      });
      //console.log(res);
      setUser(res.data.user);
      setProblems(res.data.problem);
      setMounted(true);
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    apicall();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="flex flex-col p-6 gap-1">
          {mounted ? (
            <>
              <div className="flex flex-row items-center gap-4 ">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {user?.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1 text-left">
                  <div className="">{user?.username}</div>
                  <div className="text-lg font-medium">
                    {user?.fname} {user?.lname}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Joined on {user?.createdAt}
              </div>
            </>
          ) : (
            <Skeleton className="h-24 w-full"></Skeleton>
          )}
        </Card>
        <Card className="flex flex-col overflow-hidden gap-1">
          {mounted ? (
            <>
              <CardHeader className="bg-gray-600 text-white py-3 px-4">
                <CardTitle>Total Problems Attempted</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-4xl font-bold">{problems?.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Attempted so far
                </div>
              </CardContent>
            </>
          ) : (
            <Skeleton className="h-24 w-full"></Skeleton>
          )}
        </Card>
        <Card className="flex md:col-span-2 flex-col overflow-hidden gap-1">
          {mounted ? (
            <>
              {" "}
              <CardHeader className="bg-gray-600 text-white py-3 px-4">
                <CardTitle>Difficulty Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {
                        problems?.filter((prob) => prob.difficulty == "Easy")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Easy
                    </div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {" "}
                      {
                        problems?.filter((prob) => prob.difficulty == "Medium")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Medium
                    </div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">
                      {" "}
                      {
                        problems?.filter((prob) => prob.difficulty == "Hard")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Hard
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <Skeleton className="h-24 w-full"></Skeleton>
          )}
        </Card>
        <Card className="flex flex-col overflow-hidden gap-1">
          {mounted ? (
            <>
              {" "}
              <CardHeader className="bg-gray-600 text-white py-3 px-4">
                <CardTitle>Recently Attempted</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {problems?.map((prob, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{prob.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {prob.difficulty}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Attempted
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>{" "}
            </>
          ) : (
            <Skeleton className="h-24 w-full"></Skeleton>
          )}
        </Card>
      </div>
    </main>
  );
}
