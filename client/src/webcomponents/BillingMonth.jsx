import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const BillingMonth = ({ rec }) => {
  const getBadgeClass = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500 text-green-50";
      case "Not Paid":
        return "bg-red-500 text-red-50";
      case "Pending":
        return "bg-yellow-500 text-yellow-50";
      default:
        return "";
    }
  };
  return (
    <TableRow>
      <TableCell>{rec?.period}</TableCell>
      <TableCell>
        <Badge variant="outline" className={getBadgeClass(rec?.status)}>
          {rec?.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">₹ {rec?.amount}</TableCell>
    </TableRow>
  );
};

export default BillingMonth;
