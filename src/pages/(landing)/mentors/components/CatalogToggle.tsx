import { Tab, Tabs } from "@heroui/react"

type CatalogToggleProps = {
    value: "pro" | "full"
    onChange: (value: "pro" | "full") => void
}

const CatalogToggle = ({ value, onChange }: CatalogToggleProps) => (
    <Tabs aria-label="Catalog" selectedKey={value} onSelectionChange={(key) => onChange(key as "pro" | "full")} variant="solid" size="sm"
        classNames={{
            base: "w-auto",
            tabList: "gap-0 rounded-full border border-[#DADADA] bg-transparent p-0 h-auto",
            cursor: "rounded-full bg-black text-white shadow-none",
            tab: "h-9 min-w-0 px-4 text-xs font-medium data-[selected=true]:text-white data-[selected=true]:bg-black rounded-full",
            tabContent: "text-black group-data-[selected=true]:text-white",
            panel: "hidden",
        }}>
        <Tab key="pro" title="Pro catalog" />
        <Tab key="full" title="Full catalog" />
    </Tabs>
)

export default CatalogToggle
