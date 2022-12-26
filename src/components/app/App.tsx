import React from "react";
import Home from "@components/home/Home";
import Header from "@components/header/Header";
import "./app.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Home />
    </div>
  );
};

export default App;
