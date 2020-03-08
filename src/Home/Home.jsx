import React from "react";
import Button from "../Button/Button";

const Home = ({ history }) => {
  return (
    <div>
      <h1>ホーム</h1>
      <Button
        onClickHandler={() => {
          history.push("/quiz");
        }}
      >
        クイズを始める
      </Button>
    </div>
  );
};
export default Home;
