import { IconVer } from "../Icons/IconVer";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { ITarea } from "../../../types/ITarea";
import { FC } from "react";

interface IProps {
  tareas: ITarea[];
}

const CardTareaSprint: FC<IProps> = ({ tareas }) => {

  const coloresCard = {
    Pendiente: "bg-[#AEA32A]/60",
    Progreso: "bg-[#1806BA]/40",
    Completado: "bg-[#1F6219]/60",
  };

  return (
    <>
      {tareas.map((tarea) => (
        <div
          key={tarea.id}
          className={`w-[90%] flex flex-col gap-[0.2vh] rounded-[4px] !px-[0.6vw] !pt-[0.6vw] ${
            coloresCard[tarea.estado]
          }`}
        >
          <h1 className="text-[1.5vw]">Titulo: {tarea.titulo}</h1>
          <p>
            <b>Descripcion:</b> {tarea.descripcion}
          </p>
          <p>
            <b>Fecha Límite:</b> {tarea.fechaLimite}
          </p>

          <div className="flex justify-center gap-[3%] !py-2 ">
            <button className="text-[0.9vw] !p-[0.4vw] bg-[#001233]/90 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer">
              Enviar al backlog
            </button>
            <select className="text-[0.9vw] !p-[0.4vw] bg-[#001233]/90 !px-1 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none">
              <option value="Pendiente" selected={tarea.estado === "Pendiente"}>
                pendiente
              </option>
              <option value="Progreso" selected={tarea.estado === "Progreso"}>
                en_progreso
              </option>
              <option
                value="Completado"
                selected={tarea.estado === "Completado"}
              >
                completado
              </option>
            </select>
            <div className="flex gap-[5%] items-center ">
              <IconVer size={"1.5vw"} />
              <IconEditar size={"1.5vw"} />
              <IconEliminar size={"1.5vw"} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardTareaSprint;
