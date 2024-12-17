"use client";
import {
  ChevronDown,
  Loader,
  RotateCcw,
  Search,
  SquareCheckBig,
} from "lucide-react";
import { useState } from "react";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            My API library 📚
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <GithubUserAPI />
          <DontSwearAPI />
          <ReadmeAPI />
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
        <div className="border-gray-700 border-dashed border-2 text-center p-2 rounded-lg font-bold">
          GET
        </div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          GitHub User API
        </h3>
        {/* <div
          className="border-gray-200 border-2 bg  rounded-full lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center overflow-hidden"
          style={{
            transform: "translateX(-5px)",
          }}
        >
          <img
            src="./icons/express.svg"
            alt="icon5"
            className="p-2 rounded-lg"
          />
        </div> */}
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
          Enter a GitHub username to fetch user information and{" "}
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
            userInfo ? "hidden" : "flex items-center justify-center"
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
            {/* <a href={`https://${username}.github.io/`}>github pages</a> */}
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
        <div className="border-gray-700 border-dashed border-2 text-center p-2 rounded-lg font-bold">
          POST
        </div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Don&apos;t Swear API
        </h3>
        {/* <div
          className="border-gray-200 border-2 bg  rounded-full lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center overflow-hidden"
          style={{
            transform: "translateX(-5px)",
          }}
        >
          <img src="./icons/hono.svg" alt="icon5" className="p-2 rounded-lg" />
        </div> */}
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
        <div className="flex space-x-2 mb-4 justify-end">
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
            messageResponse ? "hidden" : "flex items-center justify-center"
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

const ReadmeAPI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const [newFile, setNewFile] = useState(null);

  const refreshMessage = () => {
    setFile("");
    setNewFile(null);
  };

  const fetchMessageResponse = async () => {
    const response = await fetch("https://readme-ai.yanait.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: file }),
    });
    const data = await response.json();
    setNewFile(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
      <div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(false)}
      >
        <div className="border-gray-700 border-dashed border-2 text-center p-2 rounded-lg font-bold">
          POST
        </div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Readme API
        </h3>
        {/* <div
          className="border-gray-200 border-2 bg  rounded-full lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center overflow-hidden"
          style={{
            transform: "translateX(-5px)",
          }}
        >
          <img src="./icons/hono.svg" alt="icon5" className="p-2 rounded-lg" />
        </div> */}
        <Loader
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
          Drag and drop or select the /src directory of your project
        </p>
        <input
          value={file}
          onChange={(e) => setFile(e.target.value)}
          type="file"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex space-x-2 mb-4 justify-end">
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
            newFile ? "hidden" : "flex items-center justify-center"
          }`}
        >
          ReadMe file will be created here.
        </div>
        {/* {messageResponse ? (
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
        )} */}
      </div>
    </div>
  );
};
