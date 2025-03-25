import { ListSprints } from "../ListSprints/ListSprints";

export const ViewSprints = () => {
  return (
    <div className="bg-[#E8E8E8] h-full flex justify-center items-center flex-col">
      <div className="flex justify-center">
        <button className="!mb-[15px] !mt-[8px] flex items-center justify-center bg-[#001233]/90 w-[9vw] h-[2.3vw] text-[#CAC0B3] text-[1.12vw] rounded-[0.4rem] hover:bg-[#001233] cursor-pointer">
          Backlog
        </button>
      </div>
      <ListSprints />
    </div>
  );
};
