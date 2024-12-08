"use client";
import { ChevronDown, RotateCcw, Search, SquareCheckBig } from "lucide-react";
import { useState } from "react";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            My API library 📚
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <GithubUserAPI />
          <DontSwearAPI />
        </div>
      </main>

      <footer className="py-6 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 My API Library. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface UserInfoTypes {
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  following: number;
}

const GithubUserAPI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfoTypes | null>(null);
  // const [contributions, setContributions] = useState<any>(null);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUserInfo(null);
    }
  };

  // const fetchContributions = async () => {
  //   const query = `{
  //     user(login: "${username}") {
  //       contributionsCollection {
  //         contributionCalendar {
  //           totalContributions
  //           weeks {
  //             contributionDays {
  //               contributionCount
  //               weekday
  //               date
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }`;

  //   try {
  //     const response = await fetch("https://api.github.com/graphql", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ query }),
  //     });
  //     const data = await response.json();
  //     setContributions(
  //       data.data.user.contributionsCollection.contributionCalendar
  //     );
  //   } catch (error) {
  //     console.error("Error fetching user contributions:", error);
  //     setContributions(null);
  //   }
  // };

  // const handleSearch = () => {
  //   Promise.all([fetchUserInfo(), fetchContributions()]);
  // };

  const refreshUserInfo = () => {
    setUsername("");
    setUserInfo(null);
    // setContributions(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
      <div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-gray-700 border-gray-300 border text-center p-2 text-white rounded-lg font-bold">
          GET
        </div>
        <h3 className="text-xl font-medium text-gray-800">GitHub User API</h3>
        <ChevronDown
          className={`text-gray-400 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 mb-4">
          Enter a GitHub username to fetch user information and {' '}
          <span className="line-through">display user contributions.</span>
        </p>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={fetchUserInfo}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Search />
          </button>
          <button
            onClick={refreshUserInfo}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            <RotateCcw />
          </button>
        </div>
        <div
          className={`border-2 border-dashed border-gray-300 text-gray-300 rounded-md p-4 ${
            userInfo ? "hidden" : "block"
          }`}
        >
          This is where the user info will appear
        </div>
        {userInfo && (
          <div className="border border-gray-300 rounded-md p-4">
            <img
              src={userInfo.avatar_url}
              alt={userInfo.name}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h4 className="font-bold">{userInfo.name}</h4>
            <p className="text-gray-600">{userInfo.bio}</p>
            <p className="text-sm text-gray-500 mt-2">
              Followers: {userInfo.followers} | Following: {userInfo.following}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const DontSwearAPI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageResponse, setMessageResponse] = useState(null);

  const refreshMessage = () => {
    setMessage("");
    setMessageResponse(null);
  };

  const fetchMessageResponse = async () => {
    const response = await fetch(
      "https://dont-swear-api.dont-swear-api.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: `${message}` }),
      }
    );
    const data = await response.json();
    setMessageResponse(data);
    // console.log(data)
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
      <div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-gray-700 border-gray-300 border text-center p-2 text-white rounded-lg font-bold">
          POST
        </div>
        <h3 className="text-xl font-medium text-gray-800">Don&apos;t Swear API</h3>
        <ChevronDown
          className={`text-gray-400 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 mb-4">
          Enter a message to check if it contains swear words.
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          rows={3}
        />
        <div className="flex space-x-2 mb-4">
          <button
            onClick={fetchMessageResponse}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <SquareCheckBig />
          </button>
          <button
            onClick={refreshMessage}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            <RotateCcw />
          </button>
        </div>
        <div
          className={`border-2 border-dashed border-gray-300 text-gray-300 rounded-md p-4 ${
            messageResponse ? "hidden" : "block"
          }`}
        >
          This is where the check will take place.
        </div>
        {messageResponse ? (
          <div className="border border-gray-300 rounded-md p-4 place-content-center">
            {messageResponse &&
              Object.entries(messageResponse).map(([key, value]) => (
                <h4
                  className={`font-bold mb-2 text-center ${
                    String(value).startsWith("error") ? "text-red-600" : ""
                  }`}
                  key={key}
                >
                  {key}: {String(value)}
                </h4>
              ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
