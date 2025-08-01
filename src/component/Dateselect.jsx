import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useState } from "react";

function Dateselect({ datetime, id }) {
 

  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  
  const onBookhandler = () => {
    if (!selected){
        return toast.error("Please select a date before booking.");
    }
    navigate(`/movies/${id}/date/${selected}`)
       scrollTo(0,0);
  }



  return (
    <div id="date-select" className="w-full my-6">
      <h2 className="text-2xl font-bold text-orange-100 mb-4 text-center">
         Select Date
      </h2>

      <div className="flex overflow-x-auto justify-center gap-4">
        {Object.keys(datetime).map((dateKey) => {
          const dateObj = new Date(dateKey);
          const day = dateObj.getDate();
          const month = dateObj.toLocaleDateString("en-us", {
            month: "short",
          });

          return (
            <button
              key={dateKey}
              className={`w-20 h-20 ${selected === dateKey ? "bg-orange-500 text-white" : "bg-white border-2 border-orange-400 text-orange-500"} rounded-xl shadow-sm
               hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out flex flex-col items-center justify-center font-semibold text-sm`}
              onClick={() => setSelected(dateKey)}
            >
              <span className="text-lg">{day}</span>
              <span className="uppercase">{month}</span>
            </button>
          );
        })}
      </div>
      <button className="mt-4 bg-orange-500 text-white py-2 px-2 rounded-md hover:bg-orange-600 transition duration-200"
       onClick={onBookhandler}>
        Confirm Selection
      </button>
    </div>
  );
}

export default Dateselect;
