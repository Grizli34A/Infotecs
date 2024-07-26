const API_URL = import.meta.env.VITE_API_URL;

const searchInformation = async ({ key, value }) => {
  try {
    const response = await fetch(`${API_URL}/filter?key=${key}&value=${value}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.users ? data.users.map((user) => user.id) : [];
  } catch (error) {
    console.error("Error searching information:", error);
    return []; 
  }
};
//выдает список id искомых пользователей
export default searchInformation;
