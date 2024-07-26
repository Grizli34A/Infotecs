import { useState } from "react";
import SearchBy from "../SearchBy/SearchBy";
import searchInformation from "../../services/searchInformation";
import validateInput from "../../utils/validateInput";
import searcIcon from "../../assets/searchIcon.svg";
import "./SearchInput.scss";
const SearchInput = ({ setSearchedUsers }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [sortType, setSortType] = useState("firstName"); //по умолчанию ищем пользователей по имени
  const [isValid, setIsValid] = useState(true);

  const searchUsers = async () => {
    const usersId = await searchInformation({
      key: sortType,
      value: searchInputValue,
    });
    setSearchedUsers(usersId);
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInputValue(value);
    if (value !== "") setIsValid(validateInput(sortType, value)); //проверка на пустое, чтобы в случае стирания полностью не высвечивалась ошибка
  };
  return (
    <div className="searchInputContainer">
      <div>
        {!isValid && <p className="error">Данные для поиска невалидны!</p>}
        <input
          type="text"
          placeholder="Поиск"
          value={searchInputValue}
          onChange={(event) => handleInputChange(event)}
        />
        <img
          src={searcIcon}
          width={"30px"}
          className={!isValid ? "disabled" : ""}
          onClick={() => searchUsers()}
          alt="search"
        />
      </div>
      <SearchBy
        sortType={sortType}
        setSortType={setSortType}
        searchInputValue={searchInputValue}
        setIsValid={setIsValid}
      />
    </div>
  );
};

export default SearchInput;
