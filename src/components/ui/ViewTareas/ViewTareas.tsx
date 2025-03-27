import { useState } from "react";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";

export const ViewTareas = () => {
  const [modal, setModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModal(false);
  };
  return (
    <div className="col-span-4 p-8 flex flex-col items-center relative">
      <h2 className="text-4xl font-bold absolute top-5 left-6">
        {" "}
        Tareas del Backlog{" "}
      </h2>
      <button
        onClick={() => {
          setModal(true);
        }}
        className="bg-[#001233]/90 w-36 h-10 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer absolute top-5 right-6"
      >
        Añadir tarea
      </button>
      {modal && <CrearTarea closeModal={handleCloseModal} />}
      <hr
        className="border-t-2 border-[#001233] relative top-16 mb-4 mx-auto"
        style={{ width: "98%" }}
      />
    </div>
  );
};
