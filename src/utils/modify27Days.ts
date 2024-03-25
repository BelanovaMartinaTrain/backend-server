export type TLineData = {
    date: string;
    flux: string;
    AKp: string;
    Kp: string;
};

const changeData27days = async (params: Response) => {
    const data = await params.text();
    const newLines: TLineData[] = [];

    data.split("\n").forEach((line, index) => {
        if (index > 10 && index < 38)
            newLines.push({
                date: `${line.slice(0, 15).trim()}`,
                flux: `${line.slice(16, 25).trim()}`,
                AKp: `${line.slice(26, 38).trim()}`,
                Kp: `${line.slice(39, line.length).trim()}`,
            });
    });

    return newLines;
};
export default changeData27days;
