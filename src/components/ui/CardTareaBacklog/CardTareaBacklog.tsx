import { FC, useState } from "react";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { IconVer } from "../Icons/IconVer";
import ModalTarea from "../PopUps/ModalTarea/ModalTarea";
import { ITarea } from "../../../types/ITarea";
import { tareaStore } from "../../../store/tareaStore";
import { useTareas } from "../../../hooks/useTareas";

type ICardTareaBacklog = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardTareaBacklog: FC<ICardTareaBacklog> = ({tarea,handleOpenModalEdit,}) => {
  const [modalVer, setModalVer] = useState<boolean>(false);
  const setTareaActiva = tareaStore((state)=> state.setTareaActiva)
  const handleCloseModalVer = () => {
    setModalVer(false);
  };

  const editarTarea = () => {
    setTareaActiva(tarea)
    handleOpenModalEdit(tarea);
  };
  const {eliminarTareaById} = useTareas()
  const eliminarTarea=()=>{
    eliminarTareaById(tarea.id!)
  }

  return (
    <div className="bg-[#D9D9D9] flex !p-[0.6vw] w-[90%] justify-between rounded-[0.5rem] shadow-xs">
      <div className="flex flex-col gap-[2vh]">
        <p>
          <b>Titulo: {tarea.titulo}</b>
        </p>
        <p>
          <b>Descripción: {tarea.descripcion}</b>
        </p>
      </div>

      {modalVer && <ModalTarea tarea={tarea} closeModal={handleCloseModalVer} />}

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
          <button
            onClick={() => {
              setModalVer(true);
            }}
          >
            <IconVer size="1.72vw" />
          </button>
          <button
            onClick={editarTarea}
          >
            <IconEditar size="1.72vw" />
          </button>
          <button onClick={eliminarTarea}>
          <IconEliminar size="1.72vw" />
          </button>
          
        </div>
      </div>
    </div>
  );
};
