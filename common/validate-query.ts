const filterBy = ["createdAt", "updatedAt", "dueDate"];
const order = ["asc", "desc"];

interface OrderByValidationResult {
  isValid: boolean;
  orderByParsed?: string[];
  error?: string;
}

/**
 * Validates the orderBy parameter.
 * @param {string} orderByStr - The orderBy parameter as a JSON string.
 * @returns {OrderByValidationResult} - Returns an object with isValid boolean and parsed orderBy array.
 */
export const validateOrderBy = (orderByStr: string): OrderByValidationResult => {
  try {
    const orderByArr = JSON.parse(orderByStr);

    if (!Array.isArray(orderByArr) || orderByArr.length !== 2) {
      return {
        isValid: false,
        error: "Invalid orderBy format, see the documentation to fix this.",
      };
    }

    const [field, direction] = orderByArr;

    if (!isValidOrderByField(field) || !isValidOrderByDirection(direction)) {
      return {
        isValid: false,
        error: "Invalid orderBy values!, see the documentation to fix this.",
      };
    }

    return { isValid: true, orderByParsed: orderByArr };
  } catch (error) {
    return { isValid: false, error: "Invalid JSON format, see the documentation to fix this." };
  }
};

/**
 * Checks if the orderBy field is valid.
 * @param {string} field - The orderBy field.
 * @returns {boolean} - Returns true if the field is valid, false otherwise.
 */
const isValidOrderByField = (field: string): boolean => filterBy.includes(field);

/**
 * Checks if the orderBy direction is valid.
 * @param {string} direction - The orderBy direction.
 * @returns {boolean} - Returns true if the direction is valid, false otherwise.
 */
const isValidOrderByDirection = (direction: string): boolean => order.includes(direction);
