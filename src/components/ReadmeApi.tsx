import { ChevronDown, RotateCcw, SquareCheckBig } from "lucide-react";
import { useState } from "react";

export const ReadmeApi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [newFile, setNewFile] = useState<string | null>(null);

  const refreshMessage = () => {
    setFiles([]);
    setNewFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || []);
    const filteredFiles = fileList.filter((file) =>
      file.webkitRelativePath.startsWith("src/")
    );

    if (filteredFiles.length === 0) {
      alert("Please select a src folder from a project");
      setFiles([]);
    } else {
      setFiles(filteredFiles);
    }

    console.log(
      filteredFiles.map((file) => console.log(file.webkitRelativePath))
    );
  };

  const readFiles = async () => {
    try {
      const response = await fetch("/api/read-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: files.map((file) => ({
            webkitRelativePath: file.webkitRelativePath,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Unknown error occurred");
      }

      const data = await response.json();
      setNewFile(data.content);
    } catch (error) {
      console.error("Error reading files:", error);
    }
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
          Readme API
        </h3>
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
          Drag and drop or select the /src directory of your project
        </p>
        <input
          onChange={handleChange}
          type="file"
          // @ts-ignore
          webkitdirectory="true"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex space-x-2 mb-4 justify-end">
          <button
            onClick={readFiles}
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
        {newFile ? (
          <div className="border border-gray-300 rounded-md p-4">
            <pre>{newFile}</pre>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 text-gray-300 rounded-md p-4">
            ReadMe file will be created here.
          </div>
        )}
      </div>
    </div>
  );
};
