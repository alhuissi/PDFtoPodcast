import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Upload({fileList, setFileList}: any) {
  const [message, setMessage] = useState<string>();

  const handleChange = (e: any) => {
    setMessage("");
    fileList?.length > 0 ? setFileList([...fileList, ...e.target.files]) : setFileList(e.target.files);
  };

  const removeImage = (i: any) => {
    setFileList(files.filter((x: any) => x.name !== i));
  };

  const files = fileList?.length > 0 ? [...fileList] : [];

  return (
    <>
      <div className="justify-center items-center bg-gray-900 px-2 text-black">
        <div className="p-3 w-[360px] rounded-md">
          <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
            {message}
          </span>
          <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted">
            <input
              type="file"
              onChange={handleChange}
              className="h-full w-full opacity-0 z-10 absolute left-0 top-0 cursor-pointer "
              multiple={true}
              accept="application/pdf"
              name="files[]"
            />
            <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
              <div className="flex flex-col">
                <span className="font-medium">{`Drag Files or Click to Browse`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {files.map((file: any, key: any) => {
              return (
                <div
                  key={key}
                  className="w-full h-16 flex items-center justify-between rounded p-3 bg-white"
                >
                  <div className="flex flex-row items-center gap-2">
                    <span className="truncate max-w-[280px]">{file.name}</span>
                  </div>
                  <div
                    onClick={() => {
                      removeImage(file.name);
                    }}
                    className="h-6 w-6 bg-red-400 flex cursor-pointer justify-center rounded-sm"
                  >
                    <XMarkIcon
                      className="p-1 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
