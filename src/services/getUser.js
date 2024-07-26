const API_URL = import.meta.env.VITE_API_URL;

const getUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return null;
  }
};
//получаем конкретного пользователя для вывода данных в модальном окне
export default getUser;
