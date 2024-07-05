import React from "react";

const OtherUsers = () => {
  return (
    <div className="py-2">
      <div className="mx-2 my-1">
        <label className="input flex items-center gap-2 w-full bg-slate-50">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="h-[calc(100vh-50px)] overflow-scroll">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="flex px-4 my-5 items-center gap-4 w-full cursor-pointer hover:bg-slate-300 py-2"
          >
            <div className="avatar online">
              <div className="w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="flex justify-between w-full flex-wrap">
              <div>
                <div className="text-base font-bold">Phan Tiến Huy</div>
                <div className="text-base text-slate-400">
                  Xin chào tất cả các tình yêu
                </div>
              </div>
              <div className="text-base text-slate-400">21:00 PM</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherUsers;
