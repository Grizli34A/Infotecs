import { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import SearchInput from "../../components/SearchInput/SearchInput";
import UserInfoModal from "../../components/UserInfoModal/UserInfoModal";
import getAllUsers from "../../services/getAllUsers";
const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [userId, setUserId] = useState(-1);
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <SearchInput setSearchedUsers={setSearchedUsers} />
      {users && (
        <Table
          data={users}
          searchedUsers={searchedUsers}
          setUserId={setUserId}
        />
      )}
      {userId > 0 && <UserInfoModal userId={userId} setUserId={setUserId} />}
    </>
  );
};

export default MainPage;
