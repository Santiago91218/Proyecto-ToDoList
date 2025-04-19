import { ChangeEvent, useEffect, useState } from "react";
import { CardTareaBacklog } from "../CardTareaBacklog/CardTareaBacklog";
import { tareaStore } from "../../../store/tareaStore";
import { ITarea } from "../../../types/ITarea";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";
import { useTareas } from "../../../hooks/useTareas";

export const ListTareasBacklog = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const [tareasProximasVencer, setTareasProximasVencer] = useState<ITarea[]>(
    []
  );
  const [filtroTareas, setFiltroTareas] = useState<string>("todas");
  const { getTareas, tareas } = useTareas();

  useEffect(() => {
    getTareas();
  }, [tareas]);

  const [openModalTarea, setOpenModalTarea] = useState(false);
  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
    setTareaActiva(null);
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    setFiltroTareas(valor);

    if (valor === "tareasFiltradas") {
      filtrarTareasVencer();
    }
  };

  const filtrarTareasVencer = () => {
    const fechaActual = new Date();
    const fechaVencimiento = new Date(fechaActual);

    fechaVencimiento.setDate(fechaActual.getDate() + 3);

    const tareasProximasVencer = tareas.filter((tarea) => {
      const fechaTarea = new Date(tarea.fechaLimite);
      return fechaTarea >= fechaActual && fechaTarea <= fechaVencimiento;
    });

    setTareasProximasVencer(tareasProximasVencer);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-[3vh] w-[100%] !mt-[10px] !p-[1vw]">
        <select
          className="text-[0.9vw] !ml-[59vw] !p-[0.4vw] bg-[#001233]/90 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none"
          value={filtroTareas}
          onChange={handleChangeSelect}
        >
          <option value="todas">Todas las tareas</option>
          <option value="tareasFiltradas">Tareas a vencer (3dias)</option>
        </select>
        {filtroTareas === "tareasFiltradas" ? (
          tareasProximasVencer.length > 0 ? (
            tareasProximasVencer.map((el) => (
              <CardTareaBacklog
                handleOpenModalEdit={handleOpenModalEdit}
                tarea={el}
              />
            ))
          ) : (
            <p>No hay tareas a vencer en los proximos 3 dias</p>
          )
        ) : tareas.length > 0 ? (
          tareas.map((el) => (
            <CardTareaBacklog
              handleOpenModalEdit={handleOpenModalEdit}
              tarea={el}
            />
          ))
        ) : (
          <p className="text-gray-600 mt-4">No hay tareas</p>
        )}
      </div>
      {openModalTarea && <CrearTarea closeModal={handleCloseModal} />}
    </>
  );
};
