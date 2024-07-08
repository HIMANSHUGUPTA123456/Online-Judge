import LoginFrom from "@/components/AuthenticationPages/LoginFrom";
import LoginHeader from "@/components/AuthenticationPages/LoginHeader";
import Footer from "@/components/Commons/Footer";
import Navbar from "@/components/Commons/Navbar";

export default function Login() {
  return (
    <div className="min-h-screen flex justify-between w-full flex-col">
      <Navbar />
      <div className="mx-auto h-full w-full flex flex-col justify-center items-center max-w-md space-y-6">
        <LoginHeader />
        <LoginFrom />
      </div>
      <Footer />
    </div>
  );
}
