import { Link } from "react-router-dom"

interface PopularITCardProps {
    title: string
    description: string
    image: string
}

const PopularITCard = ({ title, description, image }: PopularITCardProps) => {
    return (
        <Link to="#" className="flex flex-col gap-y-4 w-[230px] shrink-0 snap-start">

            <div className="rounded-2xl aspect-[7/7] overflow-hidden bg-gray-100">
                <img src={image} alt={title} className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="space-y-1">

                <h2 className="text-sm font-medium text-[#0E0E0E] line-clamp-2">
                    {title}
                </h2>

                <p className="text-xs text-[#424242] font-light line-clamp-3">
                    {description}
                </p>

            </div>

        </Link>
    )
}

export default PopularITCard