const validateInput = (sortType, value) => {
  switch (sortType) {
    case "age":
      return /^\d+$/.test(value); // Только цифры
    case "gender":
      return /^(male|female)$/.test(value.toLowerCase()); // male или female
    case "phone":
      return /^[\d\s+-]+$/.test(value); // Цифры, пробелы, +, -
    case "firstName":
    case "lastName":
    case "address.city":
      return /^[A-Za-zА-Яа-яЁё\s]+$/.test(value); // Только буквы и пробелы
    case "address.address":
      return value.length > 0; // Не пустое значение
    default:
      return true;
  }
};
export default validateInput;
