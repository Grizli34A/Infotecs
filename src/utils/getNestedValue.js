const getNestedValue = (obj, key) => {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj); //чтобы получить св-ва для сортировки
};
export default getNestedValue;
