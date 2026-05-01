import { motion } from "framer-motion"

type RevealOnScrollProps = {
    children: React.ReactNode
    delay?: number
    className?: string
}

const sectionReveal = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
}

const RevealOnScroll = ({ children, delay = 0, className }: RevealOnScrollProps) => (
    <motion.div
        className={className}
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
        {children}
    </motion.div>
)

export default RevealOnScroll
