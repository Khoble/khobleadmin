// Get sum of values of a data set given a key:
export default function getSumOfValues(data: any, key: any) {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        sum += obj[key];
    }

    return sum;
}