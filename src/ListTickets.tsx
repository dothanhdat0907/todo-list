import React, { useState, useEffect } from "react";
import { Table, Card, Space, Tag, Modal, Button } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AddTicket } from "./AddTicket";
import { Ticket } from "./App";
import dayjs from "dayjs";

type Props = {
  data: Ticket[];
  delete: (deleteTicket: Ticket) => void;
  edit: (editTicket: Ticket) => void;
};

export const ListTickets: React.FC<Props> = (props: Props) => {
  const columns: ColumnsType<Ticket> = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Class Ticket",
      dataIndex: "class",
      align: "center",
      render: (value: string) => {
        return <Tag color="magenta">{value}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: (value: string) => {
        return <>{dayjs(value).format("DD-MMMM-YYYY")}</>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_: any, record: Ticket) => {
        return (
          <Space>
            <EditOutlined
              onClick={() => {
                showModal(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                props.delete(record);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curRecord, setCurRecord] = useState<Ticket>();

  const showModal = (record: Ticket) => {
    record.date = dayjs(dayjs(record.date).format("DD-MMMM-YYYY"));
    setCurRecord(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Card title="List Ticket">
      <Table
        columns={columns}
        dataSource={props.data}
        bordered
        pagination={false}
      />
      <Modal
        title="Edit Ticket"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddTicket
          action=""
          addTicket={() => {}}
          ticket={curRecord}
          editTicket={handleOk}
        />
      </Modal>
    </Card>
  );
};
