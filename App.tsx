import React from "react";
import { ButtonCounter } from "./components/ButtonCounter";

export const App = () => {
  const name: string = "Hello React Button";

  const onChildClicked = (e: number) => {
    console.warn("callback from parent triggered", e);
  };

  return (
    <div className="p-2">
      <h1>React TSX Starter</h1>
      <div>containing:</div>
      <ul>
        <li>React</li>
        <li>Twitter Bootstrap</li>
        <li>Basic Functional Components App and ButtonCounter</li>
      </ul>
      <ButtonCounter name={name} onClicked={e => onChildClicked(e)} />
    </div>
  );
};
