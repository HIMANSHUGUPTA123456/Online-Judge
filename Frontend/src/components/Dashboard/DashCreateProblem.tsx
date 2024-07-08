import axios from "axios";
import Problemform from "./Problemform";
import { formSchema } from "@/Schema/CreateProblem";
import { z } from "zod";
import { BACKENDURL } from "@/api/api";
export default function DashCreateProblem() {
  const api = (values: z.infer<typeof formSchema>) => {
    return axios.post(`${BACKENDURL}/problem/create`, values, {
      withCredentials: true,
    });
  };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Create Problem</h1>
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        <Problemform update={false} defaultvalue={null} api={api} />
      </div>
    </main>
  );
}
