import { useRef, useEffect, useState } from "react";
import "./Table.scss";

// Функция для доступа к вложенным свойствам объекта
const getNestedValue = (obj, key) => {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const Table = ({ data, searchedUsers, setUserId }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortState, setSortState] = useState({
    key: null,
    direction: "none",
  });

  const tableRef = useRef();

  useEffect(() => {
    // Инициализация резизеров колонок
    const initResize = (event) => {
      const col = event.target.parentElement;
      const startX = event.pageX;
      const startWidth = col.offsetWidth;

      const doResize = (e) => {
        col.style.width = `${Math.max(startWidth + e.pageX - startX, 50)}px`;
      };

      const stopResize = () => {
        document.removeEventListener("mousemove", doResize);
        document.removeEventListener("mouseup", stopResize);
      };

      document.addEventListener("mousemove", doResize);
      document.addEventListener("mouseup", stopResize);
    };

    const columns = tableRef.current.querySelectorAll("th");
    columns.forEach((col) => {
      const resizer = document.createElement("div");
      resizer.className = "resizer";
      resizer.addEventListener("mousedown", initResize);
      col.appendChild(resizer);
    });
  }, []);

  useEffect(() => {
    // Сортировка данных
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

  const showUserInfoModal = (id) => {
    setUserId(id);
  };

  return (
    <table ref={tableRef}>
      <thead>
        <tr>
          <th onClick={() => handleSort("firstName")}>
            ФИО{" "}
            {sortState.key === "firstName" &&
              (sortState.direction === "asc"
                ? "🔼"
                : sortState.direction === "desc"
                ? "🔽"
                : "")}
          </th>
          <th onClick={() => handleSort("age")}>
            Возраст{" "}
            {sortState.key === "age" &&
              (sortState.direction === "asc"
                ? "🔼"
                : sortState.direction === "desc"
                ? "🔽"
                : "")}
          </th>
          <th onClick={() => handleSort("gender")}>
            Пол{" "}
            {sortState.key === "gender" &&
              (sortState.direction === "asc"
                ? "🔼"
                : sortState.direction === "desc"
                ? "🔽"
                : "")}
          </th>
          <th>Номер телефона</th>
          <th onClick={() => handleSort("address.city")}>
            Адрес{" "}
            {sortState.key === "address.city" &&
              (sortState.direction === "asc"
                ? "🔼"
                : sortState.direction === "desc"
                ? "🔽"
                : "")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((user, index) => (
          <tr
            key={index}
            className={searchedUsers.includes(user.id) ? "searched" : ""}
            onClick={() => showUserInfoModal(user.id)}
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
