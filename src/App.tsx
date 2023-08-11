import React, { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import axios from "axios";
import { randomApiUrl } from "./lib/util";
import Spinner from "./components/Spinner";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function App() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getRandomData = async () => {
    setLoader(true);
    try {
      let response = await axios.get(randomApiUrl);
      setData(response.data.results);
      localStorage.setItem("data", JSON.stringify(response.data.results));
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleRefresh = () => {
    // custom refresh btn
    try {
      getRandomData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCard = (item: any) => {
    let filteredData = data.filter((el: any) => el.login.uuid !== item.login.uuid);
    localStorage.setItem("data", JSON.stringify(filteredData));
    setData(filteredData);
  };

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("data");
    // fetching data from local storage
    if (dataFromLocalStorage !== null) {
      if (JSON.parse(dataFromLocalStorage).length > 0) {
        setData(JSON.parse(dataFromLocalStorage));
      }
    } else {
      // calling api to fetch data
      getRandomData();
    }
  }, []);
  return (
    <div style={{ minHeight: "100vh" }} className="App">
      <div style={{ margin: "10px 20px 0px 0px" }}>
        <Stack
          spacing={2}
          sx={{ width: "100%", justifyContent: "flex-end" }}
          direction="row"
        >
          <Button
            style={{ height: "50px", background: "#eaff96", color: "#000" }}
            onClick={() => {
              handleRefresh();
            }}
            variant="contained"
          >
            Refresh
          </Button>
          <div
            style={{
              height: "50px",
              background: "#202124",
              padding: "1px 12px",
              boxShadow: "1px 2px 2px silver"
            }}
          >
            <p style={{ color: "#fff" }}>
              No. of {data.length == 1 ? "Card" : "Cards"} {data.length}
            </p>
          </div>
        </Stack>
      </div>
      <div
        style={{
          margin: "15px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {!loader &&
          data.map((item, ind) => {
            return (
              <CardComponent key={ind} item={item} deleteCard={deleteCard} />
            );
          })}
        {loader && (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
