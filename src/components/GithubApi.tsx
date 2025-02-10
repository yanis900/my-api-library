import { ChevronDown, RotateCcw, Search } from "lucide-react";
import { useState } from "react";

interface UserInfoTypes {
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  following: number;
}

export const GithubApi = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfoTypes | null>(null);
  const [contributions, setContributions] = useState<any>(null);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        `https://github-api.yanait.workers.dev/github/${username}`
      );
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUserInfo(null);
    }
  };
  const fetchContributions = async () => {
    const query = `{
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                weekday
                date
              }
            }
          }
        }
      }
    }`;

    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setContributions(
        data.data.user.contributionsCollection.contributionCalendar
      );
    } catch (error) {
      console.error("Error fetching user contributions:", error);
      setContributions(null);
    }
  };

  const handleSearch = () => {
    Promise.all([fetchUserInfo(), fetchContributions()]);
  };

  const refreshUserInfo = () => {
    setUsername("");
    setUserInfo(null);
    setContributions(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
      <div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="border-gray-700 border-dashed border-2 text-center p-2 rounded-lg font-bold">
          GET
        </div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          GitHub API
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
        <div className="flex gap-2">
          <button className="text-green-500 font-extrabold">⦿ active</button>
          <ChevronDown
            className={`text-gray-400 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 mb-4">
          Enter a GitHub username to fetch user information.{" "}
          {/* <span className="line-through">and display user contributions.</span> */}
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
