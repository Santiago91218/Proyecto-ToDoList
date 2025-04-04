import { FC } from "react";
import { ITarea } from "../../../../../types/ITarea";


interface IProps {
  closeModal: () => void;
  tarea: ITarea;
}

const ModalVerTarea: FC<IProps> = ({tarea, closeModal}) => {
  
  return (
    <>
      <div className="fixed inset-0  flex justify-center items-center z-[999]  backdrop-blur-sm backdrop-brightness-90">
        <div className="w-[17rem] h-[15rem] flex flex-col text-xl justify-around shadow-[5px_5px_10px_5px_gray] bg-white rounded">
          <div className="text-center !pt-3">Titulo: {tarea.titulo}</div>
          <div className="!pl-4">
            <h1>Descripcion: {tarea.descripcion}</h1>
            <h1>Fecha Limite: {tarea.fechaLimite}</h1>
          </div>
          <div className="text-center">
            <button onClick={closeModal} className="bg-[#001233] text-white !px-3 rounded hover:cursor-pointer hover:bg-[#042052]">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalVerTarea
