import React from 'react';

const Skeleton = () => {
  return (
    <main className="flex flex-col items-center overflow-hidden bg-[#FCF3EB] animate-pulse">
      <div className="w-full">
        <div className="bg-[#D0EF65] mx-24 rounded-2xl flex flex-col items-center py-16 my-2">
          <div className="h-10 w-[28rem] max-w-[80%] bg-black/10 rounded-lg" />
          <div className="h-10 w-72 max-w-[60%] bg-black/10 rounded-lg mt-3" />
          <div className="h-4 w-[32rem] max-w-[80%] bg-black/5 rounded mt-6" />
          <div className="h-4 w-64 max-w-[50%] bg-black/5 rounded mt-2" />
          <div className="mt-12 w-[60%] h-14 bg-white rounded-2xl" />
        </div>
      </div>

      <div className="w-full px-24 mt-10 mb-12 flex flex-col gap-12">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col gap-5">
            <div className="h-8 w-48 bg-gray-200 rounded-lg" />
            <div className="flex gap-5">
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="flex-shrink-0 rounded-3xl bg-gray-200"
                  style={{ width: 280, height: 360 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Skeleton;
