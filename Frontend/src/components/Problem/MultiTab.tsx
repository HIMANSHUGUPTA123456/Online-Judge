import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "../ui/textarea";
import { Dispatch, SetStateAction } from "react";

export function MultiTab({
  setVal,
  val,
  error,
  output,
  loading,
  inputValue,
  setInputValue,
  casepassed,
  lastwa,
}: {
  casepassed: number;
  lastwa: number;
  setVal: Dispatch<SetStateAction<string>>;
  val: string;
  error: string | null;
  output: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValue: string;
  loading: boolean;
}) {
  return (
    <Tabs
      value={val}
      onValueChange={(value) => {
        setVal(value);
      }}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="input">Input</TabsTrigger>
        <TabsTrigger value="output">Output</TabsTrigger>
        <TabsTrigger value="console">Console</TabsTrigger>
      </TabsList>
      <TabsContent value="input">
        <Textarea
          disabled={loading}
           className="resize-none text-black font-semibold rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          id="input"
          placeholder="Enter your input here..."
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </TabsContent>
      <TabsContent value="output">
        <Textarea
          aria-readonly
          className="resize-none text-black font-semibold rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          id="result"
          placeholder="Your result will be displayed here..."
          readOnly
          rows={4}
          value={output}
        />
      </TabsContent>
      <TabsContent value="console">
        {casepassed == -1 ? (
          <Textarea
            aria-readonly
            className=" resize-none text-red-600 font-semibold dark:text-red-300 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 "
            id="result"
            placeholder="Your Console will be displayed here..."
            readOnly
            rows={4}
            value={error || ""}
          />
        ) : (
          <div className=" resize-none h-[97.45px] text-red-600 font-semibold dark:text-red-300 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 grid grid-cols-5 overflow-scroll ">
            {Array.from({ length: casepassed }, (_, i) => i).map((i) => (
              <div className="flex h-fit justify-center" key={i}>
                <div className="border max-w-[100px] border-green-700  rounded-md m-1 px-2 text-green-700  text-xs">
                  Case {i + 1} passed
                </div>
              </div>
            ))}

            {lastwa == 2 && (
              <div className="flex h-fit justify-center">
                <div className="border border-red-700  rounded-md m-1 px-2 text-red-700  text-xs">
                  Case {casepassed + 1} TLE
                </div>
              </div>
            )}
            {lastwa == 1 && (
              <div className="flex h-fit justify-center">
                <div className="border border-red-700  rounded-md m-1 px-2 text-red-700  text-xs">
                  Case {casepassed + 1} WA
                </div>
              </div>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
