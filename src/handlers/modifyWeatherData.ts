export default async function modifyWeatherData(response: Response) {
    const data = await response.json();
    let modifiedData = [];

    for (let i = 0; i < 10; i++) {
        let newObject = {
            ...data.properties.timeseries[i].data.instant.details,
            icon_code: data.properties.timeseries[i].data.next_1_hours.summary.symbol_code,
            time: data.properties.timeseries[i].time,
        };
        modifiedData.push(newObject);
    }

    return { weather: modifiedData };
}
