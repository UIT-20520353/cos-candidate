import "./styles.css";
import Header from "~/components/Header";

function NotFound() {
  return (
    <div className={"flex h-screen w-full flex-col items-center bg-[#2f3242]"}>
      <Header />

      <div className={"my-8 w-4/5"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="380" height="500" viewBox="0 0 837 1045">
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="6" id={"Page-1"}>
            <path id="Polygon-1" stroke="#007FB2" d="M353 9l273.664 161v317L353 642 79.336 487V170L353 9z"></path>
            <path
              id="Polygon-2"
              stroke="#EF4A5B"
              d="M78.5 529l68.5 40.186v79.125L78.5 687 10 648.311v-79.125L78.5 529z"
            ></path>
            <path
              id="Polygon-3"
              stroke="#795D9C"
              d="M773 186l54 31.539v62.098L773 310l-54-30.363v-62.098L773 186z"
            ></path>
            <path
              id="Polygon-4"
              stroke="#F2773F"
              d="M639 529l134 78.847v155.245L639 839l-134-75.908V607.847L639 529z"
            ></path>
            <path
              id="Polygon-5"
              stroke="#36B455"
              d="M281 801l102 60.025v118.187L281 1037l-102-57.788V861.025L281 801z"
            ></path>
          </g>
        </svg>
        <div className="message-box">
          <h1>404</h1>
          <p>Page not found</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
