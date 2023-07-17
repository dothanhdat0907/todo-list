import { Card, Form, Input, Select, Button, DatePicker, Modal } from "antd";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import "./AddTicket.scss";
import { Ticket } from "./App";

type Props = {
  action: string;
  addTicket: (newTicket: Ticket) => void;
  ticket?: Ticket;
  editTicket: (editTicket: Ticket) => void;
};

export const AddTicket: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: Ticket) => {
    props.addTicket(values);
    form.setFieldsValue({
      name: "",
      class: "Vip class",
      date: dayjs(),
      price: "10.000.000",
    });
  };

  const setClass = (value: string) => {
    if (value === "A class") form.setFieldValue("price", "5.000.000");
    else if (value === "B class") form.setFieldValue("price", "3.000.000");
    else if (value === "C class") form.setFieldValue("price", "1.000.000");
    else form.setFieldValue("price", "10.000.000");
  };

  const handleEdit = () => {
    form.submit();
  };

  useEffect(() => {
    form.setFieldsValue({ ...props?.ticket });
  }, [props.ticket]);

  return (
    <Card title={props.action}>
      <Form form={form} initialValues={props.ticket} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="class" label="Class" rules={[{ required: true }]}>
          <Select className="selectClass" onChange={setClass}>
            <Select.Option value="Vip class">Vip</Select.Option>
            <Select.Option value="A class">A</Select.Option>
            <Select.Option value="B class">B</Select.Option>
            <Select.Option value="C class">C</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please input date!" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD-MMMM-YYYY" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input disabled suffix="VND" />
        </Form.Item>
        {props.action === "Add Ticket" ? (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Add Ticket
            </Button>
          </Form.Item>
        ) : (
          ""
        )}
      </Form>
    </Card>
  );
};
