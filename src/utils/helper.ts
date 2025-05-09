import moment from "moment";

export const formatChatTime = (timestamp: string) => {
    const date = moment(timestamp);
    const now = moment();

    if (date.isSame(now, "day")) {
        return date.format("hh:mm A"); // Same day: Show time
    } 

    if (date.isSame(now.clone().subtract(1, "day"), "day")) {
        return "Yesterday"; 
    }

    // if (date.isAfter(now.clone().subtract(1, "week"))) {
    //     return date.format("dddd"); /
    // }

    return date.format("M/D/YYYY"); 
};
