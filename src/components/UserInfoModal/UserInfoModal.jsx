import { useEffect, useState } from "react";
import getUser from "../../services/getUser";
import cancelIcon from "../../assets/cancelIcon.svg";
import "./UserInfoModal.scss";

const UserInfoModal = ({ userId, setUserId }) => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null); // Добавляем состояние для обработки ошибок

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUser(userId);
        if (user) {
          setUserInfo(user);
        } else {
          setError("Пользователь не найден");
        }
      } catch (err) {
        setError("Произошла ошибка при загрузке данных пользователя");
      }
    };

    if (userId > 0) {
      getUserInfo();
    }
  }, [userId]);
  return (
    <div className="userInfoModal">
      <div className="userInfoModal__header">
        <img
          src={cancelIcon}
          alt="cancelIcon"
          width={30}
          onClick={() => setUserId(-1)}
        />
      </div>
      <div className="userInfoModal__container">
        {error ? (
          <p>{error}</p>
        ) : Object.keys(userInfo).length > 0 ? (
          <div>
            <h2>
              ФИО: {userInfo.firstName} {userInfo.lastName}
            </h2>
            <p>Возраст: {userInfo.age}</p>
            <p>
              Адрес: {userInfo.address.city}, {userInfo.address.address}
            </p>
            <p>Рост: {userInfo.height}</p>
            <p>Вес: {userInfo.weight}</p>
            <p>Телефон: {userInfo.phone}</p>
            <p>Email: {userInfo.email}</p>
          </div>
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>
    </div>
  );
};

export default UserInfoModal;
