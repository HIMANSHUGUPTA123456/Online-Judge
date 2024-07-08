import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { RiArchive2Line, RiInboxUnarchiveLine } from "react-icons/ri";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiDelete } from "react-icons/fi";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { BACKENDURL } from "@/api/api";
interface Problem {
  _id: string;
  u_id: string;
  title: string;
  difficulty: string;
  description: string;
  testcasecount: number;
  active: boolean;
}
const DashProblemPanel = ({
  setEditproblem,
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setEditproblem: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const apicall = async () => {
    try {
      const res = await axios.get(`${BACKENDURL}/problem/read`, {
        withCredentials: true,
      });
      //console.log(res);
      setProblems(res.data.problems);
      setMounted(true);
    } catch (err) {
      //console.log(err);
    }
  };
  const disableProblemApiCall = async (problemId: string) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${BACKENDURL}/problem/disable/${problemId}`,
        {}, // Put requests need a body, even if empty
        {
          withCredentials: true,
        }
      );
      const newProblems = problems.map((problem) =>
        problem._id === problemId ? res.data.problems : problem
      );
      //console.log(newProblems, res);
      setProblems(newProblems);
      //console.log(res);
      setLoading(false);
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    if (problems.length == 0) apicall();
  }, []);
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Problems</h1>
        </div>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {mounted ? (
                      problem.title
                    ) : (
                      <Skeleton className="w-[60px] h-[20px] rounded-full" />
                    )}
                  </TableCell>



                  <TableCell>
                    {mounted ? (
                      problem.difficulty
                    ) : (
                      <Skeleton className="w-[60px] h-[20px] rounded-full" />
                    )}
                  </TableCell>

                  <TableCell>
                    {mounted ? (
                      <Badge
                        className={cn(
                          problem.active
                            ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-400"
                        )}
                        variant="outline"
                      >
                        {problem.active ? "Active" : "Disabled"}
                      </Badge>
                    ) : (
                      <Skeleton className="w-[60px] h-[20px] rounded-full" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setActive("submissions")
                          setEditproblem(problem._id);
                        }}
                      >
                        View
                      </Button>

                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setActive("edit");
                          setEditproblem(problem._id);
                        }}
                      >
                        <FiDelete className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        className={cn(
                          problem.active ? "text-red-500" : "text-green-500"
                        )}
                        size="sm"
                        onClick={() => {
                          disableProblemApiCall(problem._id);
                        }}
                        disabled={loading}
                        variant="outline"
                      >
                        {problem.active ? (
                          <RiArchive2Line className="h-4 w-4" />
                        ) : (
                          <RiInboxUnarchiveLine className="h-4 w-4" />
                        )}

                        {problem.active ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default DashProblemPanel;
