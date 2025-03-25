import { Header } from "../../ui/Header/Header";
import { ViewSprints } from "../../ui/ViewSprints/ViewSprints";

export const ScreenBacklog = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-5 h-[95vh]">
        <div className="col-span-1 bg-[#E8E8E8] !p-[7px]">
          <ViewSprints />
        </div>

        <div>
          <h2 className="text-lg font-bold">Tareas en el Backlog</h2>
          {/* aca va la seccion tarea kucka cabrera*/}
        </div>
      </div>
    </div>
  );
};
