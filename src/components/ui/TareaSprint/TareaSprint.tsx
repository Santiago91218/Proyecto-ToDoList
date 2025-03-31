import CardTareaSprint from "../../CardTareaSprint/CardTareaSprint";

const TareaSprint = () => {
  return (
    <>
      <div className="flex gap-4   ">
        <div className="bg-[#D9D9D9] flex-1  h-max rounded-[7px] flex flex-col items-center  gap-4">
          <div className="!pt-3 mx-auto w-[90%] border-b-2 border-[#001233] text-xl font-bold text-center ">
            <h1 className="">Pendiente</h1>
          </div>
          <div className="flex flex-col items-center gap-4 w-[100%] !pb-4">
            <CardTareaSprint />
            
          </div>
        </div>
        <div className="bg-[#D9D9D9] flex-1  h-max rounded-[7px] flex flex-col items-center gap-4">
          <div className="!pt-3 mx-auto w-[90%] border-b-2 border-[#001233] text-xl font-bold text-center ">
            <h1 className="">En Progreso</h1>
          </div>
          <div className="flex flex-col items-center gap-4 w-[100%] !pb-4">
            <CardTareaSprint />
            
          </div>
        </div>
        <div className="bg-[#D9D9D9] flex-1  h-max rounded-[7px] flex flex-col items-center gap-4">
          <div className="!pt-3 w-[90%] border-b-2 border-[#001233] text-xl font-bold text-center ">
            <h1 className="">Completado</h1>
          </div>
          <div className="flex flex-col items-center gap-4 w-[100%] !pb-4">
            <CardTareaSprint />
            <CardTareaSprint />
            <CardTareaSprint />
          </div>
        </div>
      </div>
    </>
  );
};

export default TareaSprint;
