export default async function modifyDensityData(response: Response) {
    const data = await response.json();
    let modifiedData = [];

    for (let i = data.length - 1; i >= data.length - 151; i--) {
        modifiedData.push(data[i]);
    }
    return modifiedData.reverse();
}
