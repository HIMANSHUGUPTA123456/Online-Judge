import Navbar from "@/components/Commons/Navbar";
import Footer from "@/components/Commons/Footer";
import ProblemsPage from "@/components/Problem/Problemspage";
export default function Problems() {
  return (
    <div className="min-h-screen flex justify-between w-full flex-col">
      <Navbar />
      <div className="h-full w-full flex flex-col justify-center items-center  space-y-6">
        <ProblemsPage />
      </div>
      <Footer />
    </div>
  );
}
