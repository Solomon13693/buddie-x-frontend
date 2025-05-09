'use client'

import React, { ReactNode, useState } from "react";
import {
  Dropdown as HeroDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@heroui/react";
import { cn } from "../../lib";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/outline";

type DropdownItemType = {
  key: string;
  text: string;
  className?: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "default" | undefined
}

type DropdownProps = {
  label: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "default" | undefined
  variant?: "solid" | "flat" | "shadow" | "bordered" | "light" | "faded" | undefined,
  items?: DropdownItemType[];
  className?: string;
  filter?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  onChange?: (key: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  color = "default",
  variant = "solid",
  items = [],
  className,
  filter = false,
  startContent,
  endContent,
  onChange
}) => {
  const [selectedLabel, setSelectedLabel] = useState(label);

  const handleSelect = (key: string, text: string) => {
    setSelectedLabel(text);
    if (onChange) onChange(key);
  };

  return (
    <HeroDropdown radius="sm">
      <DropdownTrigger>
        <Button
          startContent={startContent ?? (filter ? <FunnelIcon className="size-4" /> : undefined)}
          endContent={endContent ?? <ChevronDownIcon className="size-4" />}
          radius="sm"
          className={cn("border text-xs", className)}
          color={color}
          variant={variant}>
          {selectedLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu hideEmptyContent={false} aria-label="Dropdown Menu" color={color} variant={variant}
        classNames={{
          emptyContent: '!text-xs text-center'
        }}>
        {items.map(({ key, text, className, color }) => (
          <DropdownItem
            key={key}
            className={className}
            color={color}
            classNames={{
              base: "py-1",
              title: "text-xs",
            }}
            onPress={() => handleSelect(key, text)}>
            {text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </HeroDropdown>
  );
};

export default Dropdown;
