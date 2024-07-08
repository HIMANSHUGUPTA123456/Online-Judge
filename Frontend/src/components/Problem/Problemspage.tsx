"use Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import apicalls, { apicalltags, tags } from "@/api/problemUser";
import { Problem } from "@/api/problemUser";
import { FaArrowRight, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Tagactivity from "./Tagactivity";
import { TagFilterModal } from "./TagFilterModal";

export default function ProblemsPage() {
  const [pagenumber, setPagenumber] = useState(1);
  const [tags, setTags] = useState<tags[] | null>();
  const [activetags, setActiveTags] = useState<tags[] | null>();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isopen, setIsopen] = useState<boolean>(false);
  const getproblems = async () => {
    const res = await apicalls(pagenumber);
    if (res) setProblems(res?.problems);
  };
  const gettags = async () => {
    const tagary = await apicalltags();
    //console.log("problempag", tagary);
    if (tagary) setTags(tagary);
  };
  useEffect(() => {
    gettags();
    getproblems();
  }, [pagenumber]);

  return (
    <main className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <div className="grid gap-6 md:gap-8 lg:gap-10">
        {tags && (
          <TagFilterModal
            pagenumber={pagenumber}
            setProblems={setProblems}
            isOpen={isopen}
            setOpen={setIsopen}
            tags={tags}
            setTags={setTags}
            activetags={activetags}
            setActiveTags={setActiveTags}
          ></TagFilterModal>
        )}
        <div className="grid gap-4 md:gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Coding Problems
            </h1>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsopen(true)}
              >
                <FaFilter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              {/* <Button size="sm" variant="outline">
                <CiBoxList className="w-4 h-4 mr-2" />
                Sort
              </Button> */}
            </div>
          </div>
          <Tagactivity
            setIsopen={setIsopen}
            activetags={activetags}
          ></Tagactivity>
          <div className="grid gap-4 md:gap-6">
            {problems.map((problem, i) => (
              <Link
              className=""
              to={`/problems/${problem._id}` }  key={i}
            >
              <Card
               
                className="p-2  md:p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#55efc4] rounded-lg w-12 h-12 flex items-center justify-center text-2xl">
                    {(pagenumber - 1) * 4 + i + 1}
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-semibold">{problem.title}</h3>
                   
                    <div className="text-gray-500 flex-wrap flex gap-2 dark:text-gray-400 text-sm">
                      <Badge className=" px-1 md:px-2 md:py-1 text-xs md:text-sm  " variant="secondary">
                        {problem.difficulty}
                      </Badge>
                        {problem.tags.map((tag) => {
                          return (
                            <Badge
                              className="px-1 md:px-2 md:py-1 text-xs md:text-sm cursor-pointer  bg-green-300/20 "
                              variant="outline"
                            >
                              {tag.value}
                            </Badge>
                          );
                        })}
                      </div>
                  </div>
                </div>
                <Link
                  className="sm:inline-flex hidden  items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                  to={`/problems/${problem._id}`}
                >
                  
                  View Problem
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </Card>
              </Link>
            ))}
          </div>
        </div>
        {(!activetags || activetags.length == 0) && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                {pagenumber > 1 && (
                  <>
                    <PaginationItem
                      onClick={() => {
                        setPagenumber(pagenumber - 1);
                      }}
                    >
                      <PaginationPrevious to="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink to="#">{pagenumber - 1}</PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationLink to="#" isActive>
                    {pagenumber}
                  </PaginationLink>
                </PaginationItem>
                {problems.length == 4 && (
                  <>
                    <PaginationItem>
                      <PaginationLink to="#">{pagenumber + 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem
                      onClick={() => {
                        setPagenumber(pagenumber + 1);
                      }}
                    >
                      <PaginationNext to="#" />
                    </PaginationItem>
                  </>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
}
