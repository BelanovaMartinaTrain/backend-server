const defaultDataModifier = async (params: Response) => {
    const data = await params.json();
    return data;
};
export default defaultDataModifier;
