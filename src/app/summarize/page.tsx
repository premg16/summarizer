"use client";
import { useState } from "react";

const Summarize = () => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue.trim() !== "") {
      setUrl(inputValue.trim());
      // Regular expression to check if the input is a valid YouTube URL
      const youtubeUrlPattern =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w\-_]+(?!.*\bvi?=)(\S+)?$/;
      setIsValidUrl(
        URL.canParse(inputValue.trim()) &&
          youtubeUrlPattern.test(inputValue.trim())
      );
    } else {
      setUrl("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <div className="flex p-2 mx-auto">
        {/* center this input box */}
        <input
          className={`outline-none p-2 w-[32rem] rounded-l-md shadow-md  placeholder:text-sm ${
            isValidUrl || url === "" ? "" : "border border-red-500" // Add red border if URL is not valid
          }`}
          placeholder="Enter your URL here"
          value={url}
          onChange={handleInputChange}
        />
        <button
          className={`${
            isValidUrl && url !== "" ? "bg-blue-500" : "bg-slate-300"
          }  rounded-r-md p-2 shadow-md text-white font-medium cursor-auto`}
          disabled={!(isValidUrl && url !== "")}
        >
          Generate Summary
        </button>
      </div>
      {!isValidUrl && url !== "" && (
        <span className="text-xs text-red-500 italic w-full text-center">
          {" "}
          Please Enter a valid URL
        </span>
      )}
      {isValidUrl && url !== "" && (
        <div className="flex-1 flex">
          <div className="w-2/5 flex flex-col gap-2">
            {" "}
            <div className="p-1 h-1/2 w-full">
              <iframe
                className="rounded-xl shadow-sm w-full h-full"
                src={
                  url.includes("youtube.com")
                    ? url.replace("watch?v=", "embed/")
                    : url
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex-1 flex">
                {/* Transcript Here */}
                <span className="w-full text-center m-auto font-bold text-xl">Transcript</span>
            </div>
          </div>
          <div className="w-3/5 bg-purple-100 flex">
          <span className="w-full text-center m-auto font-bold text-xl">Summary/ChatWindow</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summarize;
