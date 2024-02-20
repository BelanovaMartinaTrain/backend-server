import apiDataType from "../interfaces/apiDataType";
import fetchDataFromApi from "./fetchDataFromApi";

const fetchAndModify = async (params: apiDataType): Promise<unknown | null> => {
    const data = await fetchDataFromApi(params);
    const modifiedData = data[data.length - 1].kp_index;
    console.log(modifiedData);

    return modifiedData;
};

export default fetchAndModify;
