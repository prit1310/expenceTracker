import { Button } from "../components/ui/button"
import TransactionForm from "../components/molecules/transactionForm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
  function handleClick(){
      navigate('/logout')
  }

  return (
   <main>
      <div className="flex justify-between items-center top-2">
        <h1 className="ml-4">Expense Traker</h1>
        <Button onClick={handleClick} className="ml-auto mr-2">Logout</Button>
      </div>
      <Dialog>
        <DialogTrigger><Button className="ml-4">New Transaction</Button></DialogTrigger>
        <DialogContent>
        <DialogHeader>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogDescription>
          Manage your finances , keep update your transaction
        </DialogDescription>
        </DialogHeader>
        <TransactionForm></TransactionForm>
        </DialogContent>
      </Dialog>
   </main>
  )
}

export default Home
