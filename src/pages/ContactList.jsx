import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from "../components/common/DataTable";
import { FaGalacticSenate } from "react-icons/fa6";
import { useAuthContext } from "../context/AuthContext";

export const ContactList = () => {
  const [list, setList] = useState([]);
  const { setLoading } = useAuthContext();

  const contactsColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "message", label: "Message" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("your_contacts_api");
        setList(res.data.contacts);
      } catch (e) {
        console.log("Error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DataTable
        title="Contact List"
        data={list}
        columns={contactsColumns}
        filterOptions={[]}
        statusColors={{}}
        showFilter={false}
        showSearch={true}
      />
    </>
  );
};
