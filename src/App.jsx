import Manager from "./Components/Manager.jsx";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <>
      <div className="pb-7 h-auto min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <Navbar />
        <Manager />
      </div>
    </>
  );
}

export default App;
