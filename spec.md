# Invoice Generator App

## Current State
Full-stack invoice app with clients, invoices (draft/finalized), templates, PDF download, business profile, and Stripe payment. Line items are entered manually per invoice.

## Requested Changes (Diff)

### Add
- `SavedItem` type in backend: `itemCode (Text)`, `itemName (Text)`, `description (Text)`, `rate (Nat)`, `taxType (Text)`, `taxRate (Nat)`
- Backend CRUD: `addSavedItem`, `listSavedItems`, `updateSavedItem`, `deleteSavedItem`
- Auto-generate sequential item codes like `ITEM-001`, `ITEM-002`
- `SavedItemsPage` — table listing saved items with add/edit/delete, each showing item code
- "Select Saved Item" button in LineItemRow that opens a picker to auto-fill the row from saved items
- Route `/saved-items` in App.tsx
- "Saved Items" nav entry in DesktopSidebar and HamburgerMenu

### Modify
- `LineItemRow` — add a search/select button to pick from saved items
- `DesktopSidebar` — add Saved Items nav link
- `HamburgerMenu` — add Saved Items nav link
- `App.tsx` — add `/saved-items` route

### Remove
- Nothing removed

## Implementation Plan
1. Update `main.mo` — add `SavedItem` type, `savedItems` map, `addSavedItem`/`listSavedItems`/`updateSavedItem`/`deleteSavedItem` functions with auto-incrementing item code
2. Create `SavedItemsPage.tsx` — CRUD page with table, modal form (add/edit), delete confirmation
3. Update `LineItemRow.tsx` — add a small "Library" icon button that opens a popover/dialog to search and pick a saved item
4. Update `App.tsx` — add `/saved-items` route
5. Update `DesktopSidebar.tsx` and `HamburgerMenu.tsx` — add Saved Items entry (BookOpen icon)
