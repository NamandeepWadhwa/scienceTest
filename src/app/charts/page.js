import Pie from "./pie"
import Scatter from './scatter'
export default function Page()
{
  return (
    <>
      <div className="flex flex-wrap justify-between w-full h-1/2">
        {/* Scatter Chart */}

        <Scatter />

        {/* Pie Chart */}

        <Pie />
      </div>
    </>
  );
}