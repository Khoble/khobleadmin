// Takes an array of objects as well as the keys it should complementize, sorts these by value, and then *complementizes them:
// (By "complementizing", we refer to the process of making each value in the object the difference of itself and the previous value (or the complement of the previous value to the next))
// (Complementizing helps us create percentage bar charts with recharts, since there is currently no other way)
export default function complementizeArray(
    array: any[],
    selectedKeys: string[]
) {
    if (!array) return null; // guard for null arrays

    // Iterate through each object and sort selected numeric key-value pairs
    const complementarizedArray = array.map(obj => {
        // Get the keys of the object
        const keys = Object.keys(obj);

        // Filter the keys that have numeric values and are present in selectedKeys
        const numericKeys = keys.filter(key => selectedKeys.includes(key) && typeof obj[key] === 'number');

        // Sort the numeric keys based on their corresponding values
        numericKeys.sort((a, b) => (obj[a] as number) - (obj[b] as number)); // Type assertion is used here

        // Create a new object with sorted key-value pairs
        const sortedObj: { [key: string]: number | string } = {};

        // Add the sorted numeric key-value pairs to the sorted object
        for (let i = 0; i < numericKeys.length; i++) {
            const key = numericKeys[i];
            const prevKey = numericKeys[i - 1];

            if (prevKey) {
                sortedObj[key] = (obj[key] as number) - (obj[prevKey] as number);
            } else {
                sortedObj[key] = obj[key];
            }
        }

        // Copy the remaining non-numeric key-value pairs to the sorted object
        for (const key of keys) {
            if (!numericKeys.includes(key)) {
                sortedObj[key] = obj[key];
            }
        }

        return sortedObj;
    });

    return complementarizedArray
}