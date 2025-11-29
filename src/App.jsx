import {BrowserRouter,Routes,Route} from "react-router-dom";
import Web from "./Page/Web/Web";
import { SmoothCursor } from "./Magic/SmoothCursor.jsx";
function App() {
    return (
    <>
      <SmoothCursor />
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Web/>}/>
  
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
