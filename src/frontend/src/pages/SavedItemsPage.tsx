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
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Edit2, Package, Plus, Search, Trash2 } from "lucide-react";
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
  itemName: string;
  description: string;
  rate: string;
  taxType: Variant_igst_none_cgst_sgst;
  taxRate: string;
}

const defaultForm: ItemFormData = {
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

export default function SavedItemsPage() {
  const { data: items = [], isLoading } = useSavedItems();
  const addItem = useAddSavedItem();
  const updateItem = useUpdateSavedItem();
  const deleteItem = useDeleteSavedItem();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SavedItem | null>(null);
  const [deleteCode, setDeleteCode] = useState<string | null>(null);
  const [form, setForm] = useState<ItemFormData>(defaultForm);

  const filtered = items.filter(
    (i) =>
      i.itemName.toLowerCase().includes(search.toLowerCase()) ||
      i.itemCode.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditingItem(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };

  const openEdit = (item: SavedItem) => {
    setEditingItem(item);
    setForm({
      itemName: item.itemName,
      description: item.description,
      rate: String(Number(item.rate)),
      taxType: item.taxType,
      taxRate: String(Number(item.taxRate)),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rate = BigInt(Math.round(Number.parseFloat(form.rate || "0") * 100));
    const taxRate = BigInt(Math.round(Number.parseFloat(form.taxRate || "0")));

    try {
      if (editingItem) {
        await updateItem.mutateAsync({
          ...editingItem,
          itemName: form.itemName,
          description: form.description,
          rate,
          taxType: form.taxType,
          taxRate,
        });
        toast.success("Item updated");
      } else {
        await addItem.mutateAsync({
          itemCode: "",
          itemName: form.itemName,
          description: form.description,
          rate,
          taxType: form.taxType,
          taxRate,
        });
        toast.success("Item saved");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save item");
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-4.5 h-4.5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-foreground">
              Saved Items
            </h1>
            <p className="text-xs text-muted-foreground">
              Reusable products &amp; services with auto-assigned codes
            </p>
          </div>
        </div>
        <Button
          onClick={openAdd}
          size="sm"
          data-ocid="saved-items.primary_button"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Item
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or code…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="saved-items.search_input"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="saved-items.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-xl bg-muted/30"
          data-ocid="saved-items.empty_state"
        >
          <Package className="w-10 h-10 text-muted-foreground/50 mb-3" />
          <p className="text-base font-medium text-foreground mb-1">
            No saved items yet
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Save your frequently used products &amp; services for faster
            invoicing.
          </p>
          <Button
            onClick={openAdd}
            size="sm"
            variant="outline"
            data-ocid="saved-items.secondary_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add your first item
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item, idx) => (
            <div
              key={item.itemCode}
              className="flex items-center gap-4 bg-card border border-border rounded-xl px-4 py-3 hover:border-primary/30 transition-colors"
              data-ocid={`saved-items.item.${idx + 1}`}
            >
              {/* Code badge */}
              <span className="font-mono text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded shrink-0">
                {item.itemCode || "—"}
              </span>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {item.itemName}
                </p>
                {item.description && (
                  <p className="text-xs text-muted-foreground truncate">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Rate */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-primary">
                  ₹
                  {(Number(item.rate) / 100).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {taxTypeLabel(item.taxType)}
                  {Number(item.taxRate) > 0 ? ` ${item.taxRate}%` : ""}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => openEdit(item)}
                  data-ocid={`saved-items.edit_button.${idx + 1}`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => setDeleteCode(item.itemCode)}
                  data-ocid={`saved-items.delete_button.${idx + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="sm:max-w-md bg-card"
          data-ocid="saved-items.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="itemName">Item Name *</Label>
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

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
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
              <div className="space-y-1">
                <Label htmlFor="rate">Rate (₹) *</Label>
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

              <div className="space-y-1">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
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

            <div className="space-y-1">
              <Label>Tax Type</Label>
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

            <DialogFooter className="gap-2">
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
