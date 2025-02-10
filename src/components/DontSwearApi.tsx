import { ChevronDown, RotateCcw, SquareCheckBig } from "lucide-react";
import { useState } from "react";

export const DontSwearApi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageResponse, setMessageResponse] = useState(null);

  const refreshMessage = () => {
    setMessage("");
    setMessageResponse(null);
  };

  const fetchMessageResponse = async () => {
    const response = await fetch(
      "https://dont-swear-api.yanait.workers.dev",
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
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
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
