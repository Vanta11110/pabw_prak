import { Link, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [, , removeCookie] = useCookies(["TOKEN"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("TOKEN");
    navigate("/login");
  };
  return (
    <>
      <header className="w-screen px-24 py-8 shadow flex justify-between">
        <Link to={"/"} className="text-xl font-black">
          Dashboard
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="border bg-amber-300 hover:bg-amber-400 active:bg-amber-500 px-2 py-1 rounded-lg font-semibold text-gray-800"
        >
          Log Out
        </button>
      </header>
      <main className="flex flex-col items-center w-screen h-screen">
        <Outlet />
      </main>
    </>
  );
}
