import RegisterFrom from "@/components/AuthenticationPages/RegisterFrom";
import RegisterHeader from "@/components/AuthenticationPages/RegisterHeader";
import Footer from "@/components/Commons/Footer";
import Navbar from "@/components/Commons/Navbar";

export default function Register() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-md space-y-6">
        <RegisterHeader />
        <RegisterFrom />
      </div>
      <Footer />
    </>
  );
}
