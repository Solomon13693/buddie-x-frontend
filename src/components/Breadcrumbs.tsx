import { Breadcrumbs as HeroBreadcrumbs, BreadcrumbItem } from "@heroui/react";

interface BreadcrumbItemProps {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItemProps[];
    isDisabled?: boolean;
}

const Breadcrumbs = ({ items, isDisabled = false }: BreadcrumbsProps) => {
    return (
        <div className="pb-5">
            <HeroBreadcrumbs isDisabled={isDisabled}>
                {items.map((item, index) => (
                    <BreadcrumbItem key={index} isDisabled={isDisabled}>
                        {item.href ? (
                            <a href={item.href} className="text-blue-500 hover:underline">
                                {item.label}
                            </a>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </BreadcrumbItem>
                ))}
            </HeroBreadcrumbs>
        </div>
    );
};

export default Breadcrumbs;
