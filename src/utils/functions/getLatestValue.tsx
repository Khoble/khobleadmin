// Get latest value of a data set given a key:
export default function getLatestValue(data: any, key: any) {
    if (data.length > 0) {
        let object = data[data.length - 1];
        return object[key]
    }else{
        return 0
    }
    return null; // (if data is null)
}