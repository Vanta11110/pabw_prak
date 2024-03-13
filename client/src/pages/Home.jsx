// import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [cookies] = useCookies(["TOKEN"]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/user-info", {
          headers: {
            Authorization: `Bearer ${cookies.TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setUserInfo(result.user);
      } catch (error) {
        console.error(error);
      }
    };

    if (cookies.TOKEN) {
      fetchUserInfo();
    }
  }, [cookies.TOKEN]);

  return (
    <section className="w-full px-12 flex flex-col gap-8 py-12">
      {userInfo && (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <table className="table-auto">
            <tbody className="text-left">
              <tr>
                <td className="font-bold">User ID</td>
                <td className="font-bold"> : </td>
                <td>{userInfo.id}</td>
              </tr>
              <tr>
                <td className="font-bold">Name</td>
                <td className="font-bold"> : </td>
                <td>{userInfo.name}</td>
              </tr>
              <tr>
                <td className="font-bold">Email</td>
                <td className="font-bold"> : </td>
                <td>{userInfo.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
