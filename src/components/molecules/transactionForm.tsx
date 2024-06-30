import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { FormField, FormItem, FormLabel, FormControl,FormMessage,Form } from "../ui/form"
import { Input } from "../ui/input"
import { auth, db } from "../../lib/firebase"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { addDoc, collection } from "firebase/firestore"
import backGroundTransaction from "../../assets/transactionBack.jpg"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    title: z.string().min(2,{
        message:"minimum 2 character required"
    }),
    description: z.string().optional(),
    amount: z.string(),
    transactionType: z.string(),
})

const TransactionForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title:"",
        description:"",
        amount:"",
        transactionType:"",
    },
  })

  const navigate = useNavigate();

 async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values,auth.currentUser)
    const docRef = await addDoc(collection(db, "transactions"), {
      uid: auth.currentUser?.uid,
      title: values.title,
      description: values.description,
      amount: values.amount,
      transactionType: values.transactionType
    });
    console.log(docRef)
    navigate('/')
  }


  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center py-10" style={{ backgroundImage: `url(${backGroundTransaction})`}}>
    <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Transaction</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount" {...field} type="number" className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="Income" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Income
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="Expense" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Expense
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  </div>
  )
}

export default TransactionForm
