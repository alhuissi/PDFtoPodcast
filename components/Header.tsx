//'use client'
import { useRouter } from "next/navigation";
//import Image from "next/image";
import Link from "next/link";
import { getAuth } from "firebase/auth";

export default function Header({ user }: any) {
  const router = useRouter();
  const auth = getAuth();

  const goToLogin = () => {
    console.log("login");
    return router.push("/signin");
  };

  const goToBuyCredits = () => {
    console.log("credits");
    //return router.push("/buy-credits");
  };

  const logout = () => {
    console.log("logout");
    auth.signOut().then(() => {
      setTimeout(() => {
        router.push("/");
      }, 500);
    });
  };
  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        {/*<Image
          alt="header text"
          src="/vercelLogo.svg"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        />*/}
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          PDF to Podcast
        </h1>
      </Link>
      {!user && (
        <button
          className="bg-primary-600 rounded-xl text-white font-medium px-4 py-2 hover:bg-primary-700 transition"
          onClick={goToLogin}
        >
          Login
        </button>
      )}
      {user && (
        <span className="justify-end">
          <button
            className="bg-transparent rounded-xl text-white font-medium px-4 py-2 mr-4 border border-gray-500 hover:bg-primary-700 transition"
            onClick={goToBuyCredits}
          >
            {user.credits} credits
          </button>
          <button
            className="bg-primary-600 rounded-xl text-white font-medium px-4 py-2 hover:bg-primary-700 transition"
            onClick={logout}
          >
            Logout
          </button>
        </span>
      )}
    </header>
  );
}
