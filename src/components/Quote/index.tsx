"use client";

const Quote = ({ quality, content }: any) => {
  // return null;

  if (quality === 0) {
    return null;
  } else if (quality > 10) {
    return (
      <>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#39D353]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#468A51]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#3E5642]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#434F45]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#5C5B5B]"></li>
      </>
    );
  } else if (quality > 8) {
    return (
      <>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#468A51]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#3E5642]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#434F45]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#5C5B5B]"></li>
      </>
    );
  } else if (quality > 6) {
    return (
      <>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#3E5642]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#434F45]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#5C5B5B]"></li>
      </>
    );
  } else if (quality > 4) {
    return (
      <>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#434F45]"></li>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#5C5B5B]"></li>
      </>
    );
  } else if (quality > 0) {
    return (
      <>
        <li className="w-[100%] my-[1px] h-[20px] rounded-l-[5px] bg-[#5C5B5B]"></li>
      </>
    );
  }
};

export default Quote;
