import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Layers, Package, Plus, Search, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { type SavedItem, Variant_igst_none_cgst_sgst } from "../backend";
import {
  useAddSavedItem,
  useDeleteSavedItem,
  useSavedItems,
  useUpdateSavedItem,
} from "../hooks/useQueries";

interface ItemFormData {
  itemCode: string;
  itemName: string;
  description: string;
  rate: string;
  taxType: Variant_igst_none_cgst_sgst;
  taxRate: string;
}

const defaultForm: ItemFormData = {
  itemCode: "",
  itemName: "",
  description: "",
  rate: "",
  taxType: Variant_igst_none_cgst_sgst.none,
  taxRate: "0",
};

function taxTypeLabel(t: Variant_igst_none_cgst_sgst): string {
  if (t === Variant_igst_none_cgst_sgst.cgst_sgst) return "CGST/SGST";
  if (t === Variant_igst_none_cgst_sgst.igst) return "IGST";
  return "None";
}

function taxBadgeColor(t: Variant_igst_none_cgst_sgst): string {
  if (t === Variant_igst_none_cgst_sgst.cgst_sgst)
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  if (t === Variant_igst_none_cgst_sgst.igst)
    return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
  return "bg-muted text-muted-foreground";
}

function isService(name: string): boolean {
  const svcKeywords = [
    "service",
    "consult",
    "design",
    "develop",
    "support",
    "manage",
    "advise",
    "audit",
    "training",
    "coaching",
  ];
  return svcKeywords.some((k) => name.toLowerCase().includes(k));
}

type CategoryFilter = "all" | "products" | "services";

export default function SavedItemsPage() {
  const { data: items = [], isLoading } = useSavedItems();
  const addItem = useAddSavedItem();
  const updateItem = useUpdateSavedItem();
  const deleteItem = useDeleteSavedItem();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SavedItem | null>(null);
  const [deleteCode, setDeleteCode] = useState<string | null>(null);
  const [form, setForm] = useState<ItemFormData>(defaultForm);

  const filtered = items.filter((i) => {
    const matchSearch =
      i.itemName.toLowerCase().includes(search.toLowerCase()) ||
      i.itemCode.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "all" ||
      (category === "services" && isService(i.itemName)) ||
      (category === "products" && !isService(i.itemName));
    return matchSearch && matchCategory;
  });

  const openAdd = () => {
    setEditingItem(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };

  const openEdit = (item: SavedItem) => {
    setEditingItem(item);
    setForm({
      itemCode: item.itemCode,
      itemName: item.itemName,
      description: item.description,
      rate: String(Number(item.rate) / 100),
      taxType: item.taxType,
      taxRate: String(Number(item.taxRate)),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!form.itemName.trim()) {
      toast.error("Item name is required");
      return;
    }
    const rateNum = Number.parseFloat(form.rate);
    if (!form.rate || Number.isNaN(rateNum) || rateNum < 0) {
      toast.error("Please enter a valid rate");
      return;
    }

    try {
      const rate = BigInt(Math.round(rateNum * 100));
      const taxRateNum = Number.parseFloat(form.taxRate || "0");
      const taxRate = BigInt(
        Number.isNaN(taxRateNum) ? 0 : Math.round(taxRateNum),
      );

      if (editingItem) {
        await updateItem.mutateAsync({
          ...editingItem,
          itemCode: form.itemCode || editingItem.itemCode,
          itemName: form.itemName.trim(),
          description: form.description.trim(),
          rate,
          taxType: form.taxType,
          taxRate,
        });
        toast.success("Item updated");
      } else {
        await addItem.mutateAsync({
          itemCode: form.itemCode.trim(),
          itemName: form.itemName.trim(),
          description: form.description.trim(),
          rate,
          taxType: form.taxType,
          taxRate,
        });
        toast.success("Item saved");
      }
      setDialogOpen(false);
    } catch (err: unknown) {
      console.error("Save item error:", err);
      const msg = err instanceof Error ? err.message : "Unknown error occurred";
      // Show a friendlier message for common ICP errors
      if (msg.includes("Actor not available")) {
        toast.error("Not logged in. Please refresh and try again.");
      } else if (msg.includes("Unauthorized")) {
        toast.error("Session expired. Please log out and log back in.");
      } else {
        toast.error("Failed to save item. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteCode) return;
    try {
      await deleteItem.mutateAsync(deleteCode);
      toast.success("Item deleted");
      setDeleteCode(null);
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const isPending = addItem.isPending || updateItem.isPending;

  const productCount = items.filter((i) => !isService(i.itemName)).length;
  const serviceCount = items.filter((i) => isService(i.itemName)).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground tracking-tight">
              Item Master
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your product &amp; service catalog
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
              <Package className="w-3 h-3" />
              {items.length} Items
            </span>
          </div>
          <Button
            onClick={openAdd}
            className="gap-1.5 shadow-sm font-semibold"
            data-ocid="saved-items.primary_button"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, code, or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="saved-items.search_input"
          />
        </div>
        <Tabs
          value={category}
          onValueChange={(v) => setCategory(v as CategoryFilter)}
        >
          <TabsList className="h-10">
            <TabsTrigger
              value="all"
              className="text-xs px-3"
              data-ocid="saved-items.tab"
            >
              All ({items.length})
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="text-xs px-3"
              data-ocid="saved-items.tab"
            >
              Products ({productCount})
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="text-xs px-3"
              data-ocid="saved-items.tab"
            >
              Services ({serviceCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="saved-items.loading_state">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl bg-muted/20"
          data-ocid="saved-items.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <p className="text-base font-semibold text-foreground mb-1">
            No items in your catalog
          </p>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Save frequently used products &amp; services with ERP-style codes
            for instant invoice insertion.
          </p>
          <Button
            onClick={openAdd}
            variant="outline"
            className="gap-1.5"
            data-ocid="saved-items.secondary_button"
          >
            <Plus className="w-4 h-4" />
            Add your first item
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div
            className="hidden md:block rounded-xl border border-border overflow-hidden shadow-card"
            data-ocid="saved-items.table"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[140px]">
                    Item Code
                  </TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Item Name
                  </TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right w-[120px]">
                    Rate
                  </TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[120px]">
                    Tax
                  </TableHead>
                  <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[80px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item, idx) => (
                  <TableRow
                    key={item.itemCode}
                    className="hover:bg-muted/30 transition-colors group"
                    data-ocid={`saved-items.row.${idx + 1}`}
                  >
                    <TableCell>
                      <span className="inline-flex items-center font-mono text-xs font-bold bg-accent/15 text-accent-foreground border border-accent/25 px-2.5 py-1 rounded-md tracking-wider">
                        {item.itemCode || "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-sm text-foreground">
                        {item.itemName}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {item.description || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-sm text-foreground">
                        ₹
                        {(Number(item.rate) / 100).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${taxBadgeColor(item.taxType)}`}
                      >
                        {taxTypeLabel(item.taxType)}
                        {Number(item.taxRate) > 0 ? ` ${item.taxRate}%` : ""}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          onClick={() => openEdit(item)}
                          data-ocid={`saved-items.edit_button.${idx + 1}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteCode(item.itemCode)}
                          data-ocid={`saved-items.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((item, idx) => (
              <div
                key={item.itemCode}
                className="bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-card-hover transition-shadow"
                data-ocid={`saved-items.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground">
                      {item.itemName}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-[11px] font-bold bg-accent/15 text-accent-foreground border border-accent/25 px-2 py-0.5 rounded-md tracking-wider shrink-0">
                    {item.itemCode || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-foreground">
                      ₹
                      {(Number(item.rate) / 100).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span
                      className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${taxBadgeColor(item.taxType)}`}
                    >
                      {taxTypeLabel(item.taxType)}
                      {Number(item.taxRate) > 0 ? ` ${item.taxRate}%` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => openEdit(item)}
                      data-ocid={`saved-items.edit_button.${idx + 1}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteCode(item.itemCode)}
                      data-ocid={`saved-items.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md" data-ocid="saved-items.dialog">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              {editingItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Item Code field */}
            <div className="space-y-1.5">
              <Label htmlFor="itemCode" className="font-semibold">
                Item Code
                <span className="ml-1 text-xs text-muted-foreground font-normal">
                  (ERP)
                </span>
              </Label>
              <Input
                id="itemCode"
                value={form.itemCode}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    itemCode: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="e.g. PROD-001, SVC-002"
                className="font-mono tracking-wider uppercase"
                disabled={!!editingItem}
                data-ocid="saved-items.input"
              />
              {!editingItem && !form.itemCode && (
                <p className="text-[11px] text-muted-foreground">
                  Will auto-generate as ITEM-XXXXX if left blank
                </p>
              )}
              {editingItem && (
                <p className="text-[11px] text-muted-foreground">
                  Item code cannot be changed after creation.
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="itemName" className="font-semibold">
                Item Name *
              </Label>
              <Input
                id="itemName"
                value={form.itemName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, itemName: e.target.value }))
                }
                placeholder="e.g. Web Design Services"
                required
                data-ocid="saved-items.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Optional description"
                rows={2}
                className="resize-none"
                data-ocid="saved-items.textarea"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="rate" className="font-semibold">
                  Rate (₹) *
                </Label>
                <Input
                  id="rate"
                  type="number"
                  min={0}
                  step={0.01}
                  value={form.rate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rate: e.target.value }))
                  }
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="taxRate" className="font-semibold">
                  Tax Rate (%)
                </Label>
                <Input
                  id="taxRate"
                  type="number"
                  min={0}
                  max={100}
                  value={form.taxRate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, taxRate: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold">Tax Type</Label>
              <Select
                value={form.taxType}
                onValueChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    taxType: v as Variant_igst_none_cgst_sgst,
                  }))
                }
              >
                <SelectTrigger data-ocid="saved-items.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Variant_igst_none_cgst_sgst.none}>
                    None
                  </SelectItem>
                  <SelectItem value={Variant_igst_none_cgst_sgst.cgst_sgst}>
                    CGST/SGST
                  </SelectItem>
                  <SelectItem value={Variant_igst_none_cgst_sgst.igst}>
                    IGST
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="saved-items.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="font-semibold"
                data-ocid="saved-items.submit_button"
              >
                {isPending
                  ? "Saving…"
                  : editingItem
                    ? "Save Changes"
                    : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteCode}
        onOpenChange={(o) => !o && setDeleteCode(null)}
      >
        <AlertDialogContent data-ocid="saved-items.modal">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the saved item. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="saved-items.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="saved-items.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
