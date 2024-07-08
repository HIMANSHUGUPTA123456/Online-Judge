import axios from "axios";
import Problemform from "./Problemform";
import { formSchema } from "@/Schema/CreateProblem";
import { z } from "zod";
import { useEffect, useState } from "react";
import { BACKENDURL } from "@/api/api";
interface Testcase {
  testin: string;
  testout: string;
  visible: boolean;
}
interface Problem {
  title: string;
  difficulty: string;
  statement: string;
  active: boolean;
  testCases: [Testcase];
  tags: [{ value: string }];
}
export default function DashUpdateProblem({
  problem,
}: {
  problem: null | string;
}) {
  const [activeproblems, setActiveproblems] = useState<Problem | null>(null);
  const [mounted, setMounted] = useState(false);
  const apicall = async () => {
    try {
      const res = await axios.get(`${BACKENDURL}/problem/read/${problem}`, {
        withCredentials: true,
      });
      //console.log(res);
      setActiveproblems({
        title: res.data.problem.title,
        statement: res.data.problem.description,
        active: res.data.problem.active,
        difficulty: res.data.problem.difficulty,
        testCases: res.data.testcases.map((testcase: Testcase) => {
          return {
            testin: testcase.testin,
            testout: testcase.testout,
            visible: testcase.visible,
          };
        }),
        tags: res.data.problem.tags,
      });
      //console.log(activeproblems);
      setMounted(true);
    } catch (err) {
      //console.log(err);
    }
  };
  const api = (values: z.infer<typeof formSchema>) => {
    return axios.put(`${BACKENDURL}/problem/update/${problem}`, values, {
      withCredentials: true,
    });
  };
  useEffect(() => {
    if (problem) apicall();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">
          Update Problem: {problem}
        </h1>
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        {mounted && activeproblems && (
          <Problemform defaultvalue={activeproblems} update={true} api={api} />
        )}
      </div>
    </main>
  );
}
