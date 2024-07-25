const API_URL = import.meta.env.VITE_API_URL;

const getAllUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.users || [];
  } catch (error) {
    console.error("Error fetching all users:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};

export default getAllUsers;
