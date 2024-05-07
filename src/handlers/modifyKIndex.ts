import apiDataType from "../types/apiDataType";
import fetchDataFromApi from "../utils/fetchDataFromApi";

const fetchAndModifyKIndex = async (params: apiDataType): Promise<unknown | null> => {
    const [status, data] = await fetchDataFromApi(params);
    const modifiedData = data[data.length - 1].kp_index;

    return modifiedData;
};

export default fetchAndModifyKIndex;
