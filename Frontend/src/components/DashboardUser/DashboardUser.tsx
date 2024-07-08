import { useState } from "react";
import DashnavUser from "./DashnavUser";
import DashSubmissionPanel from "./DashProblemPanel";
import DashProfile from "./DashProfile";

export default function Dashboard() {
  const [active, setActive] = useState("profile");
  return (
    <div className="lg:grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashnavUser active={active} setActive={setActive} />
      {active == "profile" && <DashProfile />}
      {active == "submissions" && <DashSubmissionPanel />}
    </div>
  );
}
