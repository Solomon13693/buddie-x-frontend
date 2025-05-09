import { useQueryParams } from "../utils";
import { Button, Dropdown } from "./ui";

type FilterItem = {
    key: string;
    text: string;
};

type FilterConfig = {
    label: string;
    param: string;
    items: FilterItem[];
};

type Props = {
    filters: FilterConfig[];
};

const FilterController = ({ filters }: Props) => {
    const { updateQueryParams, resetQueryParams } = useQueryParams();

    const handleFilterChange = (param: string, value: string) => {
        updateQueryParams({ [param]: value });
    };

    return (
        <div className="flex items-center justify-end gap-4 flex-wrap bg-white p-3 rounded-lg">
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-end">

                {filters.map((filter) => (
                    <Dropdown
                        key={filter.param}
                        filter
                        className="!bg-neutral-100 text-[#374151]"
                        label={filter.label}
                        color="default"
                        items={filter.items}
                        onChange={(key) => handleFilterChange(filter.param, key)}
                    />
                ))}

                <Button color="primary" onClick={() => resetQueryParams()}>
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default FilterController;
