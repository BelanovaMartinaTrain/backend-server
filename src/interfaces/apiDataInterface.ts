type apiDataInterface = {
    apiUrl: string;
    apiKey: string;
    apiRedisKey: string;
    cacheDataKey: string;
    cacheTTL?: number;
};

export default apiDataInterface;
