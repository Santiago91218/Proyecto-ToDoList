import { useState } from "react";
import { CrearSprint } from "../PopUps/CrearSprint/CrearSprint";
import { CardSprint } from "../CardSprint/CardSprint";

export const ListSprints = () => {
  const [modal, setModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div className=" !p-[8px] bg-white w-[100%] h-full flex flex-col items-center rounded-[0.4rem]">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[1.22vw] font-semibold">Lista de Sprints</h3>
        <button
          onClick={() => {
            setModal(true);
          }}
          className="cursor-pointer hover:text-[#C2C2C2] flex"
        >
          <span className="material-symbols-outlined !text-[1.5vw]">
            add_circle
          </span>
        </button>
      </div>

      {modal && <CrearSprint closeModal={handleCloseModal} />}
      <span className="inline-block w-full h-[2px] bg-[#001233] !mt-[5px]"></span>
      <div>
        <CardSprint />
        <CardSprint />
      </div>
    </div>
  );
};
