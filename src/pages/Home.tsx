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
import { DocumentData, collection, getDocs,query,where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db ,auth} from "../lib/firebase";
import DataTableDemo, { Payment } from "./DataPage"; 
import backGroundImage from "../assets/background1.jpg"
import backGroundImage1 from "../assets/mainBack.jpg"

const Home = () => {
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState<DocumentData[]>([]);

  function handleClick() {
    navigate("/logout");
  }

  async function getData() {
    const querySnapshot = await getDocs(query(collection(db, "transactions"),where("uid","==",auth.currentUser?.uid)));
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
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backGroundImage1})` }}>
    <div className="flex flex-wrap justify-between items-center py-4 bg-white bg-opacity-80 shadow-md" style={{ backgroundImage: `url(${backGroundImage})` }}>
      <h1 className="text-xl font-semibold ml-4">Expense Tracker</h1>
      <Button onClick={handleClick} className="ml-auto mr-4 bg-red-500 font-bold text-white rounded-md shadow-md hover:bg-red-600">
        Logout
      </Button>
    </div>
    <Dialog>
      <DialogTrigger>
        <Button className="ml-4 mt-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 font-bold" >
          New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Transaction</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Manage your finances, keep update your transaction
          </DialogDescription>
        </DialogHeader>
        <TransactionForm />
      </DialogContent>
    </Dialog>
    <div className="w-full py-8">
      <h1 className="flex justify-center text-2xl font-semibold mb-4 text-white">Data Table</h1>
      <div className="w-11/12 mx-auto bg-white bg-opacity-90 rounded-md shadow-md p-4">
        <DataTableDemo data={paymentData} />
      </div>
    </div>
    <div className="flex justify-center">
      <p className="text-white text-2xl">Made By Prit Senjaliya</p>
    </div>
  </main>
  );
};

export default Home;
