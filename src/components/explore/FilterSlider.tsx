import { Button, DrawerComponent } from "../ui";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import CheckboxAccordion from "./CheckboxAccordion";
import { countries, languages, levels } from "../../constant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useQueryParams } from "../../utils";

const FilterSlider = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {

    const { searchParams, updateQueryParams, resetQueryParams } = useQueryParams();

    const { expertises = [], skills = [], industries = [], tools = [] } = useSelector(
        (state: any) => state.general
    );

    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

    useEffect(() => {
        const initialValues: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            initialValues[key] = value;
        });
        setSelectedFilters(initialValues);
    }, [searchParams]);

    const handleSelected = (key: string, selectedCsv: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: selectedCsv,
        }));
    };

    const handleApply = () => {
        updateQueryParams(selectedFilters);
        onClose();
    };

    const handleClearAll = () => {
        resetQueryParams();
        setSelectedFilters({});
        onClose()
    };

    return (
        <DrawerComponent
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            position="right"
            showCloseButton={false}
            header={
                <div className="flex items-center gap-3">
                    <Button
                        onPress={onClose}
                        isIconOnly
                        radius="full"
                        size="sm"
                        className="bg-gray-200 rounded-full text-black"
                    >
                        <ArrowLeftIcon className="size-4" />
                    </Button>

                    <h2 className="text-base md:text-lg font-medium">Filters</h2>
                </div>
            }
            footer={
                <div className="flex items-center justify-between gap-5">
                    <Button variant="light" className="w-full" onPress={handleClearAll}>
                        Clear all
                    </Button>

                    <Button fullWidth className="w-full" onPress={handleApply}>
                        Apply
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-y-5 p-4">
                <hr />

                <CheckboxAccordion
                    title="Country"
                    data={countries.map(({ value, label }) => ({ key: value, label }))}
                    onChange={(selectedCsv) => handleSelected("country", selectedCsv)}
                    initialSelectedKeys={selectedFilters["country"]?.split(",") || []}
                    maxHeight={280}
                />

                <hr />

                <CheckboxAccordion
                    title="Language"
                    data={languages.map(({ name }: { name: string }) => ({ key: name, label: name }))}
                    onChange={(selectedCsv) => handleSelected("language", selectedCsv)}
                    initialSelectedKeys={selectedFilters["language"]?.split(",") || []}
                    maxHeight={280}
                />

                <hr />

                <CheckboxAccordion
                    title="Level"
                    data={levels.map(({ value }) => ({ key: value, label: value }))}
                    onChange={(selectedCsv) => handleSelected("level", selectedCsv)}
                    initialSelectedKeys={selectedFilters["level"]?.split(",") || []}
                    maxHeight={280}
                />

                <hr />

                <CheckboxAccordion
                    title="Industry"
                    data={industries.map(({ name }: { name: string }) => ({ key: name, label: name }))}
                    onChange={(selectedCsv) => handleSelected("industry", selectedCsv)}
                    initialSelectedKeys={selectedFilters["industry"]?.split(",") || []}
                    maxHeight={280}
                />

                <hr />

                <CheckboxAccordion
                    title="Skills"
                    data={skills.map(({ name }: { name: string }) => ({ key: name, label: name }))}
                    onChange={(selectedCsv) => handleSelected("skill", selectedCsv)}
                    initialSelectedKeys={selectedFilters["skill"]?.split(",") || []}
                    maxHeight={280}
                />

                <hr />

                <CheckboxAccordion
                    title="Expertises"
                    data={expertises.map(({ name }: { name: string }) => ({ key: name, label: name }))}
                    onChange={(selectedCsv) => handleSelected("expertise", selectedCsv)}
                    initialSelectedKeys={selectedFilters["expertise"]?.split(",") || []}
                    maxHeight={280}
                />

                <hr />

                <CheckboxAccordion
                    title="Tools"
                    data={tools.map(({ name }: { name: string }) => ({ key: name, label: name }))}
                    onChange={(selectedCsv) => handleSelected("tools", selectedCsv)}
                    initialSelectedKeys={selectedFilters["tools"]?.split(",") || []}
                    maxHeight={280}
                />

            </div>
        </DrawerComponent>
    );
};

export default FilterSlider;
