export function isJsonObject(strData: any) {
    try {
        JSON.parse(strData);
    } catch (e) {
        return false;
    }
    return true;
}