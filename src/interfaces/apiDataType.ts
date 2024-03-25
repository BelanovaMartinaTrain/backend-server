type apiDataType = {
    apiUrl: string;
    apiKey: string;
    apiRedisKey: string;
    timestampRedisKey: string;
    cacheTTL: number;
    source: string;
    dataModifier?: (response: Response) => any;
};

export default apiDataType;
