import { useState } from "react";
import { IconEditar } from "../ui/Icons/IconEditar";
import { IconEliminar } from "../ui/Icons/IconEliminar";
import { IconVer } from "../ui/Icons/IconVer";
import ModalSprint from "../ui/PopUps/ModalSprint/ModalSprint";
import ModalTarea from "../ui/PopUps/ModalTarea/ModalTarea";

const CardTareaSprint = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="bg-white w-[90%] flex flex-col gap-[0.2vh] rounded-[4px] !pl-4">
        <h1 className=" text-[1.5vw] ">Titulo:</h1>
        <p>
          <b>Descripcion:</b>
        </p>
        <p>
          <b>Fecha Limite:</b>
        </p>

        <div className="flex flex-raw gap-1 !py-2  ">
          <button className="text-[10px] bg-[#001233]/90 !px-1  text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer"> Enviar al backlog</button>
          <select className="text-[10px] bg-[#001233]/90 !px-1 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none">
            <option value="">En Progreso</option>
            <option value="">Pendiente</option>
            <option value="">Completado</option>
          </select>
          <div className="flex gap-1 items-center !pl-3">
            <div onClick={() => setIsModalOpen(true)}>
              <IconVer size={"1.6vw"} />
            </div>
            <IconEditar size={"1.6vw"} />
            <IconEliminar size={"1.6vw"} />
          </div>
          {isModalOpen && <ModalTarea closeModal={handleCloseModal} />}
        </div>
      </div>
    </>
  );
};

export default CardTareaSprint;
