import React, { useEffect, useState } from "react";
import UserNavbar from "@/webcomponents/UserNavbar";
import BillingMonth from "@/webcomponents/BillingMonth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const BillingStatus = () => {
  const [record, setRecord] = useState([]);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  async function getRecord() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/getBillingRecords`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRecord(res.data.record.records);
      const unpaidAmount = res.data.record.records
        .filter((rec) => rec.status !== "Paid")
        .reduce((total, rec) => total + rec.amount, 0);

      setTotalUnpaid(unpaidAmount);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getRecord();
  }, []);
  return (
    <>
      <UserNavbar />
      <div className="flex justify-center mt-14 p-5">
        <Card className="mt-14 w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Review your monthly payment history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {record.map((rec, key) => (
                  <>
                    <BillingMonth rec={rec} key={rec._id} />
                  </>
                ))}
              </TableBody>
            </Table>
            {
              <div className="mt-4">
                <span className="font-bold">
                  Amount to be Paid: ₹ {totalUnpaid}
                </span>
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BillingStatus;
