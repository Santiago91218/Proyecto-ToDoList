import { useState } from "react";
import { IconVer } from "../Icons/IconVer";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import ModalTarea from "../PopUps/ModalTarea/ModalTarea";

const CardTareaSprint = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="bg-white w-[97%] flex flex-col gap-[0.2vh] rounded-[4px] !p-[0.3vw]">
        <h1 className="text-[1.5vw]">Titulo:</h1>
        <p>
          <b>Descripcion:</b>
        </p>
        <p>
          <b>Fecha Limite:</b>
        </p>

        <div className="flex justify-center gap-[3%] !py-2 ">
          <button className="text-[0.9vw] !p-[0.4vw] bg-[#001233]/90 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer">
            {" "}
            Enviar al backlog
          </button>
          <select className="text-[0.9vw] !p-[0.4vw] bg-[#001233]/90 !px-1 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none">
            <option value="">En Progreso</option>
            <option value="">Pendiente</option>
            <option value="">Completado</option>
          </select>
          <div className="flex gap-[5%] items-center ">
            <div onClick={() => setIsModalOpen(true)}>
              <IconVer size={"1.5vw"} />
            </div>
            <IconEditar size={"1.5vw"} />
            <IconEliminar size={"1.5vw"} />
          </div>
          {isModalOpen && <ModalTarea closeModal={handleCloseModal} />}
        </div>
      </div>
    </>
  );
};

export default CardTareaSprint;
