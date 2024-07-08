import { useState, useEffect, useCallback } from "react";
import { Problem, TestCase, apicall } from "@/api/problemUser";
import ProblemPanel from "./ProblemPanel";
import CodePanel from "./CodePanel";
import axios from "axios";
import { Model, Layout, TabNode } from "flexlayout-react";
//for darkmode theme
import "flexlayout-react/style/dark.css";
export default function ProblemSinglePage({
  problemId,
}: {
  problemId: string | null;
}) {

  const [problem, setProblem] = useState<Problem | null>(null);
  const [testcase, setTestcase] = useState<TestCase[]>([]);
  const [model] = useState<Model>(
    Model.fromJson({
      global: {},
      borders: [],
      layout: {
        type: "row",
        weight: 100,
        children: [
          {
            type: "tabset",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Problem",
                component: "problem",
              },
            ],
          },
          {
            type: "tabset",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Code",
                component: "code",
              },
            ],
          },
        ],
      },
    })
  );

  useEffect(() => {
    const getData = async () => {
      if (problemId) {
        try {
          const data = await apicall(problemId);
          setProblem(data.problem);
          setTestcase(data.testcases || []);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error("Error fetching problem data:", err.response?.data);
          } else {
            console.error("An unexpected error occurred:", err);
          }
        }
      }
    };

    getData();
  }, [problemId]);

  const factory = useCallback(
    (node: TabNode) => {
      const component = node.getComponent();
      if (component === "problem") {
        return <ProblemPanel problem={problem} testcase={testcase} />;
      }
      if (component === "code") {
        return <CodePanel />;
      }
      return null;
    },
    [problem, testcase]
  );

  return (
    <div className="flex flex-col flex-wrap h-[100vh]">
      <Layout model={model} factory={factory} />
    </div>
  );
}
