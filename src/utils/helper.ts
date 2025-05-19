import moment from "moment";
import { FrequencyType } from "../types";

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

export function getSessionFrequencyText(
    frequency: FrequencyType,
    date: Date | null,
    time?: string
) {
    if (!date) return "";

    const dayOfWeek = moment(date).format("dddd");
    const formattedTime = time
        ? moment(time).format("h:mm A")
        : "";

    switch (frequency) {
        case "one-time":
            return formattedTime
                ? `This session is a one-time appointment on ${dayOfWeek} at ${formattedTime}.`
                : `This session is a one-time appointment on ${dayOfWeek}.`;

        case "weekly":
            return formattedTime
                ? `This session repeats every ${dayOfWeek} at ${formattedTime} weekly.`
                : `This session repeats every ${dayOfWeek} weekly.`;

        case "fortnightly":
            return formattedTime
                ? `This session repeats every ${dayOfWeek} at ${formattedTime} fortnightly.`
                : `This session repeats every ${dayOfWeek} fortnightly.`;

        case "monthly":
            return formattedTime
                ? `This session repeats every month on ${dayOfWeek} at ${formattedTime}.`
                : `This session repeats every month on ${dayOfWeek}.`;

        default:
            return "";
    }
}
