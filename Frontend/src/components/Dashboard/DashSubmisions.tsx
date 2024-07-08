import axios from "axios";
import { useEffect, useState } from "react";
import { BACKENDURL } from "@/api/api";
import { SubmissionData, SubmissionModal } from "./SubmissionModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function DashSubmissions({
  problem,
}: {
  problem: null | string;
}) {
  const [problems, setProblems] = useState<SubmissionData[]>([]);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [submission, setSubmission] = useState<SubmissionData | null>(null);
  const apicall = async () => {
    try {
      const res = await axios.get(
        `${BACKENDURL}/problem/submissions/${problem}`,
        {
          withCredentials: true,
        }
      );
      //console.log(res)
      setProblems(res.data.submissions);
      setMounted(true);
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    if (problems.length == 0) apicall();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">
          Submissions For Problem: {problem}
        </h1>
      </div>
        <div className="flex flex-col">
          {submission && (
            <SubmissionModal
              submission={submission}
              isOpen={open}
              setOpen={setOpen}
            ></SubmissionModal>
          )}
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg md:text-2xl text-black dark:text-white">All Submissions</h1>
            </div>
            <div className="text-black dark:text-white border shadow-sm rounded-lg dark:bg-gray-900">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>id</TableHead>
                    <TableHead>Verdict</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>language</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {problems.map((problem, i) =>{
                    console.log(problem);
                    return(
                      <TableRow key={i} >
                      <TableCell className="font-medium">
                        {mounted ? (
                          <div
                            className="hover:cursor-pointer hover:text-gray-900"
                            onClick={() => {
                              setSubmission(problem);
                              setOpen(true);
                            }}
                          >
                            {problem._id.slice(-10)}
                          </div>
                        ) : (
                          <Skeleton className="w-[60px] h-[20px] rounded-full" />
                        )}
                      </TableCell>

                      
                      <TableCell>
                        {mounted ? (
                          <Badge
                            className={cn(
                              problem.verdict
                                ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-400"
                            )}
                            variant="outline"
                          >
                            {problem.verdict ? "Accepted" : "Failed"}
                          </Badge>
                        ) : (
                          <Skeleton className="w-[60px] h-[20px] rounded-full" />
                        )}
                      </TableCell>
                      <TableCell>
                        {mounted ? (
                          <Badge
                            className={cn(
                              problem.verdict
                                ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-400 ", "w-20 flex justify-center"
                            )}
                            variant="outline"
                          >
                            {problem.execution_time.slice(0,5)} ms
                            
                          </Badge>
                        ) : (
                          <Skeleton className="w-[60px] h-[20px] rounded-full" />
                        )}
                      </TableCell>
                      <TableCell>
                        {mounted ? (
                          problem.language
                        ) : (
                          <Skeleton className="w-[60px] h-[20px] rounded-full" />
                        )}
                      </TableCell>

                      <TableCell>
                        {mounted ? (
                          new Date(problem?.createdAt || "").toLocaleString()
                        ) : (
                          <Skeleton className="w-[60px] h-[20px] rounded-full" />
                        )}
                      </TableCell>
                      <TableCell>
                        {mounted ? (
                          <Button
                            variant={"outline"}
                            onClick={() => {
                              setSubmission(problem);
                              setOpen(true);
                            }}
                            className="h-4"
                          >
                            View
                          </Button>
                        ) : (
                          <Skeleton className="w-[60px] h-[20px] rounded-full" />
                        )}
                      </TableCell>
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
    </main>
  );
}
/*
import { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { SubmissionModal } from "./SubmissionModal";
import { Button } from "../ui/button";
import { Link, useParams } from "react-router-dom";
import { BACKENDURL } from "@/api/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
export interface SubmissionData {
  _id: string;
  code_ref: string;
  comment: string;
  createdAt: string;
  execution_time: string;
  language: string;
  prob_id: string;
  updatedAt: string;
  user_id: string;
  verdict: boolean;
  __v: number;
  casespassed: number;
}
const SubmissionProblemPanel = () => {
 
  return (
 
     
  );
};
*/
