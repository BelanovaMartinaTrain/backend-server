const formatTimestamp24hFormat = (date: Date) => {
    const modifiedDate = date.toLocaleTimeString([], { hourCycle: "h23", hour: "2-digit", minute: "2-digit" });
    return modifiedDate;
};

export default formatTimestamp24hFormat;
