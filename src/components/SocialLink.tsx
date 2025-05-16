import { Button } from "@heroui/react";

interface SocialLinksProps {

    socialLinks: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
}

interface LinkItem {
    id: "linkedin" | "twitter" | "website";
    url?: string;
    icon: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {

    const { twitter, linkedin, website } = socialLinks;

    const links: LinkItem[] = [
        { id: "linkedin", url: linkedin, icon: "ri-linkedin-box-fill" },
        { id: "twitter", url: twitter, icon: "ri-twitter-x-fill" },
        { id: "website", url: website, icon: "ri-global-line" },
    ];

    return (
        <>
            {links.map(({ id, url, icon }) => (
                url ? (
                    <Button
                        key={id}
                        isIconOnly
                        size="sm"
                        aria-label={id}
                        className="bg-white flex items-center justify-center text-base text-black"
                        radius="full"
                        as="a"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className={icon}></i>
                    </Button>
                ) : null
            ))}
        </>
    );
};

export default SocialLinks;
