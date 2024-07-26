import { useRef, useEffect, useState } from "react";
import getNestedValue from "../../utils/getNestedValue";
import initResize from "../../utils/initResize";
import "./Table.scss";

const Table = ({ data, searchedUsers, setUserId }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortState, setSortState] = useState({
    key: null,
    direction: "none",
  });
  const tableRef = useRef();

  useEffect(() => {
    // Инициализация ресайзеров для колонок
    const columns = tableRef.current.querySelectorAll("th");
    columns.forEach((col) => {
      const resizer = document.createElement("div");
      resizer.className = "resizer";
      resizer.addEventListener("mousedown", initResize);
      col.appendChild(resizer);
    });
  }, []);

  useEffect(() => {
    const { key, direction } = sortState;
    if (!key || direction === "none") {
      setSortedData(data);
      return;
    }
    const sorted = [...data].sort((a, b) => {
      const aValue = getNestedValue(a, key);
      const bValue = getNestedValue(b, key);
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    //сортируем всю таблицу и кидаем новую в стейт
    setSortedData(sorted);
  }, [data, sortState]);

  const handleSort = (key) => {
    setSortState((prev) => {
      const newDirection =
        prev.key === key
          ? prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? "none"
            : "asc"
          : "asc";
      return { key, direction: newDirection };
    });
  };

  const getSortIndicator = (key) => {
    if (sortState.key === key) {
      // для отображения вида сортировки
      if (sortState.direction === "asc") return "↑";
      if (sortState.direction === "desc") return "↓";
    }
    return "";
  };
  return (
    <table ref={tableRef}>
      <thead>
        <tr>
          <th onClick={() => handleSort("firstName")}>
            ФИО {getSortIndicator("firstName")}
          </th>
          <th onClick={() => handleSort("age")}>
            Возраст {getSortIndicator("age")}
          </th>
          <th onClick={() => handleSort("gender")}>
            Пол {getSortIndicator("gender")}
          </th>
          <th>Номер телефона</th>
          <th onClick={() => handleSort("address.city")}>
            Адрес {getSortIndicator("address.city")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((user, index) => (
          <tr
            key={index}
            className={searchedUsers.includes(user.id) ? "searched" : ""}
            onClick={() => setUserId(user.id)}
          >
            <td>{`${user.firstName} ${user.lastName} ${
              user.maidenName ? `(${user.maidenName})` : ""
            }`}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>{`${user.address.city}, ${user.address.address}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
