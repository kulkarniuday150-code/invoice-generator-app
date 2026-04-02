import React from "react";
import { PaymentStatus } from "../backend";

interface PaymentStatusBadgeProps {
  paymentStatus: PaymentStatus;
}

export default function PaymentStatusBadge({
  paymentStatus,
}: PaymentStatusBadgeProps) {
  const config = {
    [PaymentStatus.paid]: {
      label: "Paid",
      className:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    },
    [PaymentStatus.unpaid]: {
      label: "Unpaid",
      className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    },
    [PaymentStatus.partial]: {
      label: "Partial",
      className:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    },
  };

  const { label, className } =
    config[paymentStatus] ?? config[PaymentStatus.unpaid];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
