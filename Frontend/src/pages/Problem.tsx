import Navbar from "@/components/Commons/Navbar";
import Footer from "@/components/Commons/Footer"; // Ensure this matches the actual file name
import { useParams } from "react-router-dom";
import ProblemSinglePage from "@/components/Problem/Problempage";

export default function Problem() {
  const { problemId } = useParams();
  return (
    <div className="min-h-screen flex justify-between w-full flex-col">
      <Navbar />
      <div className="h-full w-full flex flex-col justify-center items-center space-y-6">
        {problemId && <ProblemSinglePage problemId={problemId} />}
      </div>
      <Footer />
    </div>
  );
}
