import classes from "./UserList.module.css";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import useHttp from "../../hooks/useHttp";
import { cvtStrToDate, serverURL } from "../../utils/global";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

function UserList(props) {
  const [data, setData] = useState([]);
  const { error, sendRequest } = useHttp();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userId = useSelector((state) => state.auth.userId);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "No",
          value: "No",
        },
      ],
      onFilter: (value, record) => record.isAdmin.indexOf(value) === 0,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) =>
        cvtStrToDate(a.createdAt).getTime() -
        cvtStrToDate(b.createdAt).getTime(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Latest Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      ...getColumnSearchProps("updatedAt"),
      sorter: (a, b) =>
        cvtStrToDate(a.updatedAt).getTime() -
        cvtStrToDate(b.updatedAt).getTime(),

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onDeleteHandler = (event) => {
    const id =
      event.target.parentElement.parentElement.getAttribute("data-row-key");
    sendRequest(
      { url: `${serverURL}/v1/user/${id}`, method: "DELETE" },
      (data) => {
        console.log(data);
        if (!isAdmin) {
          dispatch(authActions.logout());
        }
      }
    );
  };

  const goToEditPageHandler = (event) => {
    const id =
      event.target.parentElement.parentElement.getAttribute("data-row-key");
    navigate(`/user/edit/${id}`);
  };

  useEffect(() => {
    sendRequest({ url: `${serverURL}/v1/user` }, (data) => {
      setData(
        data.map((item) => {
          return {
            key: item._id,
            id: item._id,
            username: item.username,
            email: item.email,
            isAdmin: item.isAdmin ? "Yes" : "No",
            createdAt: new Date(item.createdAt).toLocaleString("us"),
            updatedAt: new Date(item.updatedAt).toLocaleString("us"),
            action: (
              <>
                <button
                  className="btn btn-outline-dark"
                  disabled={userId !== item._id}
                  onClick={goToEditPageHandler}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={onDeleteHandler}
                  disabled={isAdmin ? false : userId !== item._id}
                >
                  Delete
                </button>
              </>
            ),
          };
        })
      );
    });
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
      onChange={onChange}
    />
  );
}

export default UserList;
