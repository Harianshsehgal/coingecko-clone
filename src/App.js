import React from "react";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from "./Containers/HomePage/index";
import GraphPage from "./Containers/GraphPage";

import NavigationBar from "./components/NavigationBar/index";
function App(){

    return(
        <div>
         <Router>
        <NavigationBar/>
                 <Routes>
                     <Route path="/" exact element={<Home />} />
                     <Route path="/graphPage" element={<GraphPage />} />
                 </Routes>
                
         </Router>
        </div>
    )
}
export default App;
