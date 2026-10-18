import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { getActiveProducts } from "@/lib/adminData";

interface SearchModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState(getActiveProducts());

    // Refresh products when modal opens to ensure we have latest data
    useEffect(() => {
        if (open) {
            setProducts(getActiveProducts());
        }
    }, [open]);

    const handleSelect = (productId: string) => {
        navigate(`/product/${productId}`);
        onOpenChange(false);
    };

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search fabrics..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Fabrics">
                    {products.map((product) => (
                        <CommandItem
                            key={product.id}
                            onSelect={() => handleSelect(product.id)}
                            className="flex items-center gap-3 p-2 cursor-pointer"
                        >
                            <div className="h-10 w-10 overflow-hidden rounded-md border border-border">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium">{product.name}</span>
                                <span className="text-xs text-muted-foreground">{product.collection} · Rs.${product.price}</span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Links">
                    <CommandItem onSelect={() => { navigate("/shop"); onOpenChange(false); }}>
                        Shop All
                    </CommandItem>
                    <CommandItem onSelect={() => { navigate("/collections"); onOpenChange(false); }}>
                        Collections
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

export default SearchModal;
