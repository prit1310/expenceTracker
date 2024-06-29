import { Button } from "../components/ui/button";
import TransactionForm from "../components/molecules/transactionForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import DataTableDemo, { Payment } from "./DataPage"; 

const Home = () => {
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState<DocumentData[]>([]);

  function handleClick() {
    navigate("/logout");
  }

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    let list: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setTransactionList(list);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(transactionList);
  }, [transactionList]);

  const paymentData: Payment[] = transactionList.map((doc) => ({
    uid: doc.uid,
    amount: doc.amount,
    title: doc.title,
    description: doc.description,
    transactionType: doc.transactionType
  }));

  return (
    <main>
      <div className="flex justify-between items-center top-2">
        <h1 className="ml-4">Expense Tracker</h1>
        <Button onClick={handleClick} className="ml-auto mr-2">
          Logout
        </Button>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className="ml-4">New Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Manage your finances, keep update your transaction
            </DialogDescription>
          </DialogHeader>
          <TransactionForm />
        </DialogContent>
      </Dialog>
      <div className="w-full">
        <h1 className="flex justify-center">Data Table</h1>
        <div className="w-full">
          <DataTableDemo data={paymentData} />
        </div>
      </div>
    </main>
  );
};

export default Home;
