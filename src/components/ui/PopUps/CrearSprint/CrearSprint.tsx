import { FC, FormEvent } from "react";

interface IProps {
  closeModal: () => void;
}

export const CrearSprint: FC<IProps> = ({ closeModal }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999] backdrop-blur-sm backdrop-brightness-90">
      <div className="bg-[#fff] shadow-[5px_5px_10px_5px_gray] w-[30%] !p-[12px] flex flex-col gap-8 items-center justify-center p-1 rounded">
        <div className="w-[100%] flex justify-center items-center !mb-[20px]">
          <h3 className="text-[40px]">Crear Sprint</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-7 w-[100%] relative"
        >
          <input
            type="text"
            placeholder="Ingrese el nombre"
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />
          <label
            htmlFor="fechaInicio"
            className="text-[#696666] absolute top-[45px] left-[75px] text-sm"
          >
            Fecha Inicio
          </label>
          <input
            type="date"
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />
          <label
            htmlFor="fechaCierre"
            className="text-[#696666] absolute top-[112px] left-[75px] text-sm"
          >
            Fecha Cierre
          </label>
          <input
            type="date"
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />
          <div className="flex gap-[4vw] !mt-[30px]">
            <button
              onClick={closeModal}
              className="!p-[0.3rem] w-[6vw] text-[#CAC0B3] bg-[#001233]/95 hover:bg-[#042052] text-[1vw]  rounded-[0.4rem] cursor-pointer mt-[30px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="!p-[0.3rem] w-[6vw] text-[#CAC0B3] bg-[#001233]/95 hover:bg-[#042052] text-[1vw]  rounded-[0.4rem]  cursor-pointer mt-[30px]"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
