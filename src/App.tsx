import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import "./App.css";
import { AddTicket } from "./AddTicket";
import { ListTickets } from "./ListTickets";
import dayjs from "dayjs";

export interface Ticket {
  key?: number;
  name: string;
  class: string;
  date: any;
  price: string;
}

function App() {
  const storeData = JSON.parse(localStorage.getItem("dataKey") || "[]");
  const [data, setData] = useState<Ticket[]>(storeData);

  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(data));
  }, [data]);

  const addTicket = (newTicket: Ticket) => {
    let key = data.length;
    newTicket = { ...newTicket, key };
    setData((data) => [...data, newTicket]);
  };

  const editTicket = (editTicket: Ticket) => {
    let newData = data.filter((ele) => ele.key !== editTicket.key);
    setData([...newData, editTicket]);
  };

  const deleteTicket = (deleteTicket: Ticket) => {
    setData(data.filter((ele) => ele.key !== deleteTicket.key));
  };

  return (
    <div style={{ width: "1200px", margin: "auto" }} className="App">
      <h2>Black Pink Booking Center</h2>
      <Row>
        <Col span={10}>
          <AddTicket
            action="Add Ticket"
            addTicket={addTicket}
            ticket={{
              name: "",
              class: "Vip class",
              date: dayjs(),
              price: "10.000.000",
            }}
            editTicket={() => {}}
          />
        </Col>
        <Col span={14}>
          <ListTickets data={data} delete={deleteTicket} edit={editTicket} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
