import { useState } from "react";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { IconVer } from "../Icons/IconVer";
import ModalTarea from "../PopUps/ModalTarea/ModalTarea";

export const CardTareaBacklog = () => {
  const [modalVer, setModalVer] = useState<boolean>(false);

  const handleCloseModalVer = () => {
    setModalVer(false);
  };

  return (
    <div className="bg-[#D9D9D9] flex !p-[0.6vw] w-[90%] justify-between rounded-[0.5rem] shadow-xs">
      <div className="flex flex-col gap-[2vh]">
        <p>
          <b>Titulo:</b> TituloTask
        </p>
        <p>
          <b>Descripción:</b> Esta es una descripcion de la tarea esta
        </p>
      </div>

      {modalVer && <ModalTarea closeModal={handleCloseModalVer} />}

      <div className="flex items-center gap-[1vw] ">
        <button className="bg-[#001233]/90 text-[#CAC0B3] cursor-pointer rounded-md hover:bg-[#001233] flex items-center gap-[0.4vw] !p-[0.3vw]">
          Enviar a <span className="material-symbols-outlined ">send</span>
        </button>

        <select className="!p-[0.5vw] bg-[#001233]/90 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none">
          <option value="" disabled selected>
            Selecciona una sprint
          </option>
          <option>Sprint 1</option>
        </select>
        <div className="flex items-center gap-[0.36vw]">
          <div
            onClick={() => {
              setModalVer(true);
            }}
          >
            <IconVer size="1.72vw" />
          </div>
          <IconEditar size="1.72vw" />
          <IconEliminar size="1.72vw" />
        </div>
      </div>
    </div>
  );
};
