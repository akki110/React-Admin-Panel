import React, { useState } from "react";
import { DataTable } from "../components/common/DataTable";

export const UserList = () => {

  const [userList, setUserList] = useState([]);
  const usercolumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "message", label: "Message" },
  ];

  return (
    <DataTable
      title="User List"
      data={userList}
      columns={usercolumns}
      filterOptions={[]}
      statusColors={{}}
      showFilter={false}
      showSearch={true}
    />
  );
};
