import Profile from "./Userprofile";
export default function DashProfile() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">User Profile</h1>
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        <Profile />
      </div>
    </main>
  );
}
