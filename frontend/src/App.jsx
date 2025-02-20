import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import CodeEditor from "./components/CodeEditor";
import Home from "./components/Home";
import Pricing from "./components/Pricing";
import Document from "./components/Document";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/docs" element={<Document />} />
      <Route path="/editor" element={<CodeEditor />} />
    </Routes>
  </Router>
  );
}

export default App;







