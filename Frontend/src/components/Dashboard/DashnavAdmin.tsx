import { cn } from "@/lib/utils";
import { ListBulletIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { BiCode } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const DashnavAdmin = ({
  active,
  setActive,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="border-r bg-gray-100/40 block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex z-10 bg-white dark:bg-blue-950 h-[40px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" to="#">
            <BiCode
              className={cn(
                "h-6 w-6 transition-all",
                !collapse ? "rotate-90 lg:rotate-0" : "rotate-0"
              )}
              onClick={() => setCollapse(!collapse)}
            />
            <span className="">Admin Menu</span>
          </Link>
        </div>
        <div
          className={cn(
            " overflow-auto py-2 transition-all",
            collapse
              ? "h-1 -translate-y-8 lg:translate-y-0 lg:h-full"
              : "translate-y-0 h-full"
          )}
        >
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900  dark:hover:text-gray-50",
                active == "problem"
                  ? " bg-gray-100 text-gray-900  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  : "  text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
              )}
              to="#"
              onClick={() => setActive("problem")}
            >
              <ListBulletIcon className="h-4 w-4" />
              Problems
            </Link>
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900  dark:hover:text-gray-50",
                active == "create"
                  ? " bg-gray-100 text-gray-900  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  : "  text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
              )}
              onClick={() => setActive("create")}
              to="#"
            >
              <MdAddCircleOutline className="h-4 w-4" />
              Create Problem
            </Link>
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900  dark:hover:text-gray-50",
                active == "edit"
                  ? " bg-gray-100 text-gray-900  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  : "  text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
              )}
              onClick={() => setActive("edit")}
              to="#"
            >
              <MdAddCircleOutline className="h-4 w-4" />
              Edit Problem
            </Link>
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900  dark:hover:text-gray-50",
                active == "submissions"
                  ? " bg-gray-100 text-gray-900  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  : "  text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
              )}
              onClick={() => setActive("submissions")}
              to="#"
            >
              <MdAddCircleOutline className="h-4 w-4" />
              Submissions
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashnavAdmin;
