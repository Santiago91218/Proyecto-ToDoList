import { useEffect, useState } from "react";
import { getAllTareas } from "../../../http/tarea";
import { CardTareaBacklog } from "../CardTareaBacklog/CardTareaBacklog";
import { tareaStore } from "../../../store/tareaStore";
import { ITarea } from "../../../types/ITarea";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";
import { useTareas } from "../../../hooks/useTareas";


export const ListTareasBacklog = () => {
  const setTareaActiva = tareaStore((state)=> state.setTareaActiva)

  const {getTareas, tareas}= useTareas()


  useEffect(() => {
    getTareas();
  }, []);

  const [openModalTarea, setOpenModalTarea] = useState(false);
  const handleOpenModalEdit = (tarea:ITarea) => {
    setTareaActiva(tarea)
    setOpenModalTarea(true)
  }
  const handleCloseModal = () => {
    setOpenModalTarea(false);
    setTareaActiva(null)
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-[3vh] w-[100%] !mt-[10px] !p-[1vw]">
        {tareas.length > 0 ? (
          tareas.map((el) => <CardTareaBacklog handleOpenModalEdit={handleOpenModalEdit} tarea={el} />)
        ) : (
          <div>
            <h1> No hay tareas</h1>
          </div>
        )}
      </div>
      {openModalTarea && <CrearTarea closeModal={handleCloseModal} />}
    </>
  );
};
