import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface NeedsHelpOptionProps {
    label: string;
    selected: boolean;
    onSelect: () => void;
}

const NeedsHelpOption = ({ label, selected, onSelect }: NeedsHelpOptionProps) => {
    return (
        <motion.button
            type="button"
            onClick={onSelect}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`w-full flex items-center justify-between rounded-lg px-6 py-4 shadow-[0px_9px_30px_0px_#45589D14] border text-left ${selected
                ? "border-[#FFE9D6] bg-[#FFFBF4]"
                : "border-transparent bg-white"
                }`}
        >
            <p className="text-xs text-[#0E0E0E]">{label}</p>
            {selected && <CheckCircleIcon className="size-4 text-[#0E0E0E]" />}
        </motion.button>
    );
};

export default NeedsHelpOption;
