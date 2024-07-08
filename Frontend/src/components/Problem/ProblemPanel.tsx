import Markdown from "react-markdown";
import { Problem } from "@/api/problemUser";
import remarkGfm from "remark-gfm";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SubmissionProblemPanel from "./SubmissionProblemPanel";

type TestCase = {
  testin: string;
  testout: string;
};

const ProblemPanel = ({
  problem,
  testcase,
}: {
  problem: Problem | null;
  testcase: TestCase[];
}) => {
  const [val, setVal] = useState<string>("problem");
  return (
    <div className="dark:bg-transparent px-2 no-scrollbar overflow-y-scroll bg-white h-full">
      <Tabs
        value={val}
        onValueChange={(value) => {
          setVal(value);
        }}
        className="w-full "
      >
        <TabsList className="grid w-full mt-3 md:mt-8 grid-cols-2 ">
          <TabsTrigger value="problem">Problem</TabsTrigger>
        <TabsTrigger value="submissions">Submissions</TabsTrigger>
      
        </TabsList>
        <TabsContent value="problem" className="">
          <div className="overflow-y-scroll no-scrollbar space-y-6">
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-800  p-6 space-y-4">
              <h1 className="text-2xl dark:text-white text-black font-bold">{problem?.title}</h1>
              <div className="text-gray-500 flex-wrap flex gap-2 dark:text-gray-400 text-sm">
                <Badge className="bg-yellow-100 text-yellow-800 py-1 rounded-md font-medium dark:bg-yellow-900 dark:text-yellow-200 px-1 md:px-2 md:py-1 text-xs md:text-sm" variant="secondary">
                  {problem?.difficulty}
                </Badge>
                {problem?.tags.map((tag) => (
                  <Badge className="px-1 md:px-2 md:py-1 text-xs md:text-sm cursor-pointer bg-green-300/20" variant="outline">
                    {tag.value}
                  </Badge>
                ))}
              </div>

              <div className="text-gray-600 relative flex dark:text-gray-400 w-full">
                <Markdown className="markdown " remarkPlugins={[remarkGfm]}>
                  {problem?.description || ""}
                </Markdown>
              </div>

              {testcase.length > 0 && (
                <div className="text-black dark:text-gray-400  space-y-2 w-full">
                  <h3 className="text-lg font-semibold">Test Cases</h3>
                  <div className="space-y-1">
                    {testcase.map((test, i) => (
                      <div key={`${test.testin}-${i}`} className="bg-gray-100 px-4 py-2 rounded-md text-sm font-mono dark:bg-gray-900">
                        <span className=" dark:text-gray-400">Input:</span>
                        <div className="whitespace-pre-line break-words">{test.testin}</div>
                        <br />
                        <span className=" dark:text-gray-400">Output:</span>
                        <div className="whitespace-pre-line break-words">{test.testout}</div>
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="submissions">
          <div className="md:h-[90vh] overflow-y-scroll no-scrollbar space-y-6">
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 px-3 space-y-4">
              <SubmissionProblemPanel></SubmissionProblemPanel>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProblemPanel;
