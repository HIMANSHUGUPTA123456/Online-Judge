import DashCreateProblem from "./DashCreateProblem";
import DashProblemPanel from "./DashProblemPanel";
import DashnavAdmin from "./DashnavAdmin";
import { useState } from "react";
import DashUpdateProblem from "./DashupdateProblem";
import DashSubmisions from "./DashSubmisions";
/**interface Problem {
  _id: string;
  u_id: string;
  title: string;
  difficulty: string;
  description: string;
  testcasecount: number;
  active: boolean;
} */
export default function Dashboard() {
  const [active, setActive] = useState("problem");
  const [editproblem, setEditproblem] = useState<null | string>(null);
  return (
    <div className="lg:grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashnavAdmin active={active} setActive={setActive} />
      {active == "problem" && (
        <DashProblemPanel
          setEditproblem={setEditproblem}
          setActive={setActive}
        />
      )}
      {active == "create" && <DashCreateProblem />}
      {active == "edit" && <DashUpdateProblem problem={editproblem} />}
      {active == "submissions" && <DashSubmisions problem={editproblem} />}
    </div>
  );
}
