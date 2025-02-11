import "../styles/animations.css"; // Adjusted import path

// export const Loading = () => {
//   return (
//     <div className="loading-container">
//       <div className="loading-bar" style={{ width: "80%" }}></div>
//       <div className="loading-bar" style={{ width: "100%" }}></div>
//       <div className="loading-bar" style={{ width: "60%" }}></div>
//     </div>
//   );
// };

export const Loading = () => {
  return (
    <div className="loading-container w-full">
      {" "}
      {/* Added w-full */}
      <div className="loading-bar" style={{ width: "80%" }}></div>
      <div className="loading-bar" style={{ width: "100%" }}></div>
      <div className="loading-bar" style={{ width: "60%" }}></div>
    </div>
  );
};
