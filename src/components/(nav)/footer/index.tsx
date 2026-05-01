import { Link } from "react-router-dom";
import { Button } from '@heroui/react'
import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

type FooterSection = {
  title: string;
  links: string[];
};

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Categories",
    links: [
      "Product Design",
      "Digital Marketing",
      "Web Development",
      "Programming & Tech",
      "Data & Business Analytics",
      "Marketing",
    ],
  },
  {
    title: "About",
    links: [
      "Careers",
      "Partnerships",
      "Privacy Policy",
      "Terms of Service",
    ],
  },
  {
    title: "Support",
    links: ["Help & Support"],
  },
  {
    title: "Community",
    links: ["Community Hub", "Blog", "Affiliates", "Community Standards"],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white pb-6 pt-14 border-t border-gray-200 mt-12">

      <div className="container">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.9fr_repeat(4,minmax(0,1fr))] lg:gap-x-14 lg:gap-y-8">
          
          <div>

            <p className="w-full max-w-[500px] text-sm leading-6 text-black">
              Join our weekly newsletter with roundups, video resources and
              upcoming event.
            </p>

            <div className="mt-6 flex max-w-[620px] items-center gap-x-2">
              <input type="email" placeholder="Enter your email" className="h-10 w-full rounded-md border border-[#E6E8EC] px-4 text-[12px] text-[#121624] outline-none placeholder:text-[#98A2B3]"
              />
              <Button color="primary" size="sm" className="h-10 px-6" radius="sm">
                Subscribe us
              </Button>
            </div>

          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-xs font-semibold text-[#404145]">
                {section.title}
              </h4>
              <div className="grid gap-3 text-xs text-[#5E5F6E]">
                {section.links.map((link) => (
                  <Link key={link} to="/" className="transition hover:text-[#74767E]">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>

        <div className="my-8 h-px bg-[#ECEEF2]" />

        <div className="flex flex-wrap items-center justify-between gap-5 text-[#5E5F6E]">

          <p className="text-xs text-[#5E5F6E]">
            © {year} Buddie X | All rights reserved @ buddie-x.com
          </p>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="X (Twitter)" className="transition hover:text-[#121624]">
              <FaXTwitter className="size-4" />
            </a>
            <a href="#" aria-label="Facebook" className="transition hover:text-[#121624]">
              <FaFacebookF className="size-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition hover:text-[#121624]">
              <FaLinkedinIn className="size-4" />
            </a>
            <a href="#" aria-label="Instagram" className="transition hover:text-[#121624]">
              <FaInstagram className="size-4" />
            </a>
            <div className="ml-2 flex items-center gap-2 text-sm">
              <FaGlobe className="size-3.5" />
              <span>English</span>
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
