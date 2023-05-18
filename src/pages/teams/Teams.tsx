import Header from "../../components/Header";
import { useState } from "react";

function Teams() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleClick = () => {
    console.log(date + " " + time);
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <form>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <button type={"button"} onClick={handleClick}>
            Click
          </button>
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </form>
      </div>
    </div>
  );
}

export default Teams;
