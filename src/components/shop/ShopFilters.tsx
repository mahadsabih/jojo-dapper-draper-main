import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ShopFiltersProps {
    selectedCollections: string[];
    collections: string[];
    toggleCollection: (collection: string) => void;
    selectedMaterials: string[];
    materials: string[];
    toggleMaterial: (material: string) => void;
    priceRange: number[];
    localPriceRange: number[];
    setLocalPriceRange: (range: number[]) => void;
    setPriceRange: (range: number[]) => void;
    clearFilters: () => void;
}

export const ShopFilters = ({
    selectedCollections,
    collections,
    toggleCollection,
    selectedMaterials,
    materials,
    toggleMaterial,
    priceRange,
    localPriceRange,
    setLocalPriceRange,
    setPriceRange,
    clearFilters,
}: ShopFiltersProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-medium">Filters</h3>
                {(selectedCollections.length > 0 ||
                    selectedMaterials.length > 0 ||
                    priceRange[0] > 0 ||
                    priceRange[1] < 500) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-muted-foreground hover:text-foreground h-auto p-0"
                        >
                            Clear all
                        </Button>
                    )}
            </div>

            <Accordion
                type="multiple"
                defaultValue={["collection", "price", "material"]}
                className="w-full"
            >
                {/* Collection Filter */}
                <AccordionItem value="collection">
                    <AccordionTrigger>Collection</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {collections.map((collection) => (
                                <div key={collection} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`collection-${collection}`}
                                        checked={selectedCollections.includes(collection)}
                                        onCheckedChange={() => toggleCollection(collection)}
                                    />
                                    <Label
                                        htmlFor={`collection-${collection}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {collection}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Filter */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-4 px-2 space-y-4">
                            <Slider
                                defaultValue={[0, 500]}
                                value={localPriceRange}
                                max={500}
                                step={10}
                                onValueChange={setLocalPriceRange}
                                onValueCommit={setPriceRange}
                                className="my-4"
                            />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Rs.${localPriceRange[0]}</span>
                                <span>Rs.${localPriceRange[1]}+</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Material Filter */}
                <AccordionItem value="material">
                    <AccordionTrigger>Material</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {materials.map((material) => (
                                <div key={material} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`material-${material}`}
                                        checked={selectedMaterials.includes(material)}
                                        onCheckedChange={() => toggleMaterial(material)}
                                    />
                                    <Label
                                        htmlFor={`material-${material}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {material}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
