import {
  AlertTriangle,
  ChevronDown,
  Download,
  Loader2,
  RotateCcw,
  SquareCheckBig,
} from "lucide-react";
import { useState } from "react";

export const ReadmeApi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [newFile, setNewFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const fileContents = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          content: await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
          }),
        }))
      );

      const totalContent = fileContents.map((f) => f.content).join("\n");
      if (totalContent.length > 10_000) {
        setErrorMessage(
          "Error: Selected files contain more than 10,000 characters."
        );
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/read-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: fileContents }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Unknown error occurred");
      }

      const processedData = await response.json();

      const readmeResponse = await fetch(
        "https://readme-ai.yanait.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: processedData.content }),
        }
      );

      if (!readmeResponse.ok) {
        throw new Error("Failed to fetch from Readme AI API");
      }

      const readmeText = await readmeResponse.text();
      setNewFile(readmeText);
    } catch (error) {
      console.error("Error processing files:", error);
      setErrorMessage("An error occurred while processing files.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadMarkdownFile = () => {
    if (!newFile) return;

    const blob = new Blob([newFile], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center text-gray-500 border border-gray-300 rounded-md p-4">
              <Loader2 className="animate-spin w-5 h-5 mr-2" /> Processing
              files... Please wait.
            </div>
          ) : errorMessage ? (
            <div className="flex items-center justify-center text-red-500 border border-red-400 bg-red-100 rounded-md p-4">
              <AlertTriangle className="w-5 h-5 mr-2" /> {errorMessage}
            </div>
          ) : newFile ? (
            <div className="flex flex-col items-center border border-gray-300 rounded-md p-4">
              <p className="text-gray-700 mb-2">README file is ready!</p>
              <button
                onClick={downloadMarkdownFile}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" /> Download README.md
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 text-gray-300 rounded-md p-4">
              ReadMe file will be created here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
