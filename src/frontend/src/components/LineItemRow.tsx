import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Trash2, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Variant_igst_none_cgst_sgst } from "../backend";
import { useSavedItems } from "../hooks/useQueries";

export interface FormLineItem {
  itemName: string;
  quantity: number;
  rate: number;
  discount: number;
  taxType: string;
  taxRate: number;
}

interface LineItemRowProps {
  lineItem: FormLineItem;
  index: number;
  onChange: (updated: FormLineItem) => void;
  onRemove: () => void;
}

function calcLineTotal(item: FormLineItem): number {
  const base = item.quantity * item.rate;
  const discountAmt = (base * item.discount) / 100;
  const taxable = base - discountAmt;
  const taxAmt = (taxable * item.taxRate) / 100;
  return taxable + taxAmt;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

function taxTypeLabel(t: Variant_igst_none_cgst_sgst | string): string {
  if (t === Variant_igst_none_cgst_sgst.cgst_sgst || t === "CGST/SGST")
    return "CGST/SGST";
  if (t === Variant_igst_none_cgst_sgst.igst || t === "IGST") return "IGST";
  return "None";
}

function toFormTaxType(t: Variant_igst_none_cgst_sgst): string {
  if (t === Variant_igst_none_cgst_sgst.cgst_sgst) return "CGST/SGST";
  if (t === Variant_igst_none_cgst_sgst.igst) return "IGST";
  return "None";
}

function ItemLibraryDialog({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (item: {
    itemName: string;
    rate: number;
    taxType: string;
    taxRate: number;
  }) => void;
}) {
  const { data: items = [], isLoading } = useSavedItems();
  const [search, setSearch] = useState("");

  const filtered = items.filter(
    (i) =>
      i.itemName.toLowerCase().includes(search.toLowerCase()) ||
      i.itemCode.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md bg-card" data-ocid="library.dialog">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            Item Library
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-9"
            data-ocid="library.search_input"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
          {isLoading && (
            <p
              className="text-sm text-muted-foreground text-center py-6"
              data-ocid="library.loading_state"
            >
              Loading…
            </p>
          )}
          {!isLoading && filtered.length === 0 && (
            <p
              className="text-sm text-muted-foreground text-center py-6"
              data-ocid="library.empty_state"
            >
              No items found.
            </p>
          )}
          {filtered.map((item, idx) => (
            <div
              key={item.itemCode}
              className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-accent/30 transition-colors"
              data-ocid={`library.item.${idx + 1}`}
            >
              <span className="font-mono text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded shrink-0">
                {item.itemCode || "—"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.itemName}
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹
                  {(Number(item.rate) / 100).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  &bull; {taxTypeLabel(item.taxType)}
                  {Number(item.taxRate) > 0 ? ` ${item.taxRate}%` : ""}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs shrink-0"
                onClick={() => {
                  onSelect({
                    itemName: item.itemName,
                    rate: Number(item.rate) / 100,
                    taxType: toFormTaxType(item.taxType),
                    taxRate: Number(item.taxRate),
                  });
                  onClose();
                }}
                data-ocid={`library.button.${idx + 1}`}
              >
                Use
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-ocid="library.close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LineItemRow({
  lineItem,
  index,
  onChange,
  onRemove,
}: LineItemRowProps) {
  const [rateInput, setRateInput] = useState<string>(String(lineItem.rate));
  const [libraryOpen, setLibraryOpen] = useState(false);

  useEffect(() => {
    setRateInput(String(lineItem.rate));
  }, [lineItem.rate]);

  const update = (field: keyof FormLineItem, value: string | number) => {
    onChange({ ...lineItem, [field]: value });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") {
      setRateInput(raw);
      return;
    }
    const parsed = Number.parseFloat(raw);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      setRateInput(raw);
      onChange({ ...lineItem, rate: parsed });
    }
  };

  const handleRateBlur = () => {
    const parsed = Number.parseFloat(rateInput);
    const finalValue = Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
    setRateInput(String(finalValue));
    onChange({ ...lineItem, rate: finalValue });
  };

  const handleRateFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleLibrarySelect = (item: {
    itemName: string;
    rate: number;
    taxType: string;
    taxRate: number;
  }) => {
    setRateInput(String(item.rate));
    onChange({
      ...lineItem,
      itemName: item.itemName,
      rate: item.rate,
      taxType: item.taxType,
      taxRate: item.taxRate,
    });
  };

  const lineTotal = calcLineTotal(lineItem);
  const itemNameId = `item-name-${index}`;
  const quantityId = `item-qty-${index}`;
  const rateId = `item-rate-${index}`;
  const discountId = `item-discount-${index}`;
  const taxTypeId = `item-taxtype-${index}`;
  const taxRateId = `item-taxrate-${index}`;

  return (
    <div className="border border-border rounded-lg p-3 space-y-3 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Item #{index + 1}
          </span>
          <button
            type="button"
            onClick={() => setLibraryOpen(true)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors px-1.5 py-0.5 rounded-md hover:bg-primary/10"
            title="Pick from item library"
            data-ocid={`line-item.open_modal_button.${index + 1}`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Library</span>
          </button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          data-ocid={`line-item.delete_button.${index + 1}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="sm:col-span-2">
          <label
            htmlFor={itemNameId}
            className="text-xs text-muted-foreground mb-1 block"
          >
            Item Name
          </label>
          <Input
            id={itemNameId}
            value={lineItem.itemName}
            onChange={(e) => update("itemName", e.target.value)}
            placeholder="Item description"
            className="h-8 text-sm"
            data-ocid={`line-item.input.${index + 1}`}
          />
        </div>

        <div>
          <label
            htmlFor={quantityId}
            className="text-xs text-muted-foreground mb-1 block"
          >
            Quantity
          </label>
          <Input
            id={quantityId}
            type="number"
            min={1}
            value={lineItem.quantity}
            onChange={(e) =>
              update("quantity", Math.max(1, Number(e.target.value)))
            }
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor={rateId}
            className="text-xs text-muted-foreground mb-1 block"
          >
            Rate (₹)
          </label>
          <Input
            id={rateId}
            type="number"
            min={0}
            value={rateInput}
            onChange={handleRateChange}
            onBlur={handleRateBlur}
            onFocus={handleRateFocus}
            placeholder="0"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor={discountId}
            className="text-xs text-muted-foreground mb-1 block"
          >
            Discount (%)
          </label>
          <Input
            id={discountId}
            type="number"
            min={0}
            max={100}
            value={lineItem.discount}
            onChange={(e) =>
              update(
                "discount",
                Math.min(100, Math.max(0, Number(e.target.value))),
              )
            }
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor={taxTypeId}
            className="text-xs text-muted-foreground mb-1 block"
          >
            Tax Type
          </label>
          <select
            id={taxTypeId}
            value={lineItem.taxType}
            onChange={(e) => update("taxType", e.target.value)}
            className="w-full h-8 text-sm rounded-md border border-input bg-background px-2 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="None">None</option>
            <option value="CGST/SGST">CGST/SGST</option>
            <option value="IGST">IGST</option>
          </select>
        </div>

        {lineItem.taxType !== "None" && (
          <div>
            <label
              htmlFor={taxRateId}
              className="text-xs text-muted-foreground mb-1 block"
            >
              Tax Rate (%)
            </label>
            <Input
              id={taxRateId}
              type="number"
              min={0}
              max={100}
              value={lineItem.taxRate}
              onChange={(e) =>
                update(
                  "taxRate",
                  Math.min(100, Math.max(0, Number(e.target.value))),
                )
              }
              className="h-8 text-sm"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <span className="text-sm font-semibold text-primary">
          Line Total: {formatCurrency(lineTotal)}
        </span>
      </div>

      <ItemLibraryDialog
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={handleLibrarySelect}
      />
    </div>
  );
}
