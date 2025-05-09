export const getStatusStyles = (status: string | boolean) => {
    const styles: Record<string, { textColor: string; bgColor: string }> = {
        pending: { textColor: "text-yellow-600", bgColor: "bg-[#FFF6D4]" },
        approved: { textColor: "text-success-600", bgColor: "bg-[#F8FCF9]" },
        rejected: { textColor: "text-error-400", bgColor: "bg-[#FEEAEA]" },
        confirmed: { textColor: "text-blue-600", bgColor: "bg-[#DBEAFE]" },
        completed: { textColor: "text-green-600", bgColor: "bg-[#DCFCE7]" },
        cancelled: { textColor: "text-red-600", bgColor: "bg-[#FEE2E2]" },
        in_progress: { textColor: "text-indigo-600", bgColor: "bg-[#E0E7FF]" },
        true: { textColor: "text-error-400", bgColor: "bg-[#FEEAEA]" },
        false: { textColor: "text-success-600", bgColor: "bg-[#F8FCF9]" },
        processing: { textColor: "text-orange-600", bgColor: "bg-[#FFF7E6]" },
        successful: { textColor: "text-green-600", bgColor: "bg-[#D4F9D7]" },
        failed: { textColor: "text-red-600", bgColor: "bg-[#FEE2E2]" },
        canceled: { textColor: "text-gray-600", bgColor: "bg-[#E5E7EB]" },
        refunded: { textColor: "text-blue-600", bgColor: "bg-[#DBEAFE]" },
    };

    const key = String(status);
    return styles[key] || { textColor: "text-gray-900", bgColor: "bg-gray-300" };
};
