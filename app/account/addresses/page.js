"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressFormDialog } from "@/components/AddressFormDialog";
import { EMPTY_ADDRESS } from "@/lib/addresses";
import { toast } from "sonner";
// const INITIAL_ADDRESSES = [
//   {
//     id: "1",
//     name: "Ada Lovelace",
//     phone: "+91 98765 43210",
//     addressLine1: "3-14 Sakuragawa",
//     addressLine2: "",
//     city: "Kyoto",
//     state: "Kyoto",
//     postalCode: "600-0000",
//     isDefault: true,
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     phone: "+91 98765 43210",
//     addressLine1: "Building 7 Floor 2",
//     addressLine2: "",
//     city: "Osaka",
//     state: "Osaka",
//     postalCode: "530-0001",
//     isDefault: false,
//   },
// ];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);


  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("/api/account/addresses/fetch");
        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }
        const data = await response.json();
        setAddresses(data.addresses || []);
      } catch (error) {
        // console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    setDialogOpen(true);
  };

  const handleSave = (form) => {
    let updated;
    if (editingAddress?.id) {
      updated = addresses.map((a) =>
        a.id === editingAddress.id ? { ...form, id: editingAddress.id } : a
      );
    } else {
      const newAddress = {
        ...form,
        id: Date.now().toString(),
      };
      updated = [...addresses, newAddress];
    }

    if (form.isDefault) {
      const targetId = editingAddress?.id || updated[updated.length - 1].id;
      updated = updated.map((a) => ({
        ...a,
        isDefault: a.id === targetId,
      }));
    }

    setAddresses(updated);
    const addressToSave = editingAddress?.id
      ? updated.find((a) => a.id === editingAddress.id)
      : updated[updated.length - 1];

    const saveAddresses = async () => {
      try {
        const response = await fetch("/api/account/addresses/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressToSave),
        });

        if (!response.ok) {
          const errorData = await response.json();

          // console.log("SAVE API ERROR:", errorData);

          throw new Error(
            errorData.message || "Failed to save addresses"
          );
        }
      } catch (error) {
        // console.error("Error saving addresses:", error);
      }
    };

    saveAddresses();
    toast.success("Address saved successfully");
    setDialogOpen(false);

  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Addresses</h2>
        <Button className="rounded-full" onClick={handleOpenAdd}>
          <Plus className="mr-1 h-4 w-4" /> Add address
        </Button>
      </div>

      {addresses.map((a) => (
        <div key={a._id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {a.name}{" "}
                {a.isDefault && (
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    Default
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {a.addressLine1}
                {a.addressLine2 ? `, ${a.addressLine2}` : ""}, {a.city}, {a.state} {a.postalCode}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{a.phone}</p>
            </div>
            <button
              onClick={() => handleOpenEdit(a)}
              className="text-sm text-primary hover:underline"
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      <AddressFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editingAddress || EMPTY_ADDRESS}
        onSave={handleSave}
        title={editingAddress ? "Edit address" : "Add address"}
      />
    </div>
  );
}
