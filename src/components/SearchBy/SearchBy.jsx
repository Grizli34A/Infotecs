/* eslint-disable react/prop-types */
import validateInput from "../../utils/validateInput";
import "./SearchBy.scss";

const SearchBy = ({ sortType, setSortType, searchInputValue, setIsValid }) => {
  const handleTypeClick = (type) => {
    setSortType(type);
    if (searchInputValue !== "")
      setIsValid(validateInput(type, searchInputValue));
  };
  return (
    <div className="searchBy">
      <p
        className={sortType === "firstName" ? "active" : ""}
        onClick={() => handleTypeClick("firstName")}
      >
        по имени
      </p>
      <p
        className={sortType === "lastName" ? "active" : ""}
        onClick={() => handleTypeClick("lastName")}
      >
        по фамилии
      </p>
      <p
        className={sortType === "age" ? "active" : ""}
        onClick={() => handleTypeClick("age")}
      >
        по возрасту
      </p>
      <p
        className={sortType === "gender" ? "active" : ""}
        onClick={() => handleTypeClick("gender")}
      >
        по полу
      </p>
      <p
        className={sortType === "phone" ? "active" : ""}
        onClick={() => handleTypeClick("phone")}
      >
        по телефону
      </p>
      <p
        className={sortType === "address.city" ? "active" : ""}
        onClick={() => handleTypeClick("address.city")}
      >
        по городу
      </p>
      <p
        className={sortType === "address.address" ? "active" : ""}
        onClick={() => handleTypeClick("address.address")}
      >
        по улице
      </p>
    </div>
  );
};

export default SearchBy;
