import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { insertTransactionSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/select";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmountToMiliunits } from "@/lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: defaultValues?.date ?? new Date(),
      accountId: defaultValues?.accountId ?? "",
      categoryId: defaultValues?.categoryId ?? null,
      payee: defaultValues?.payee ?? "",
      amount: defaultValues?.amount ?? "",
      notes: defaultValues?.notes ?? "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount);
    const amountInMiliunits = convertAmountToMiliunits(amount);

    onSubmit({
      ...values,
      amount: amountInMiliunits,
    });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <div className="px-4">
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="px-4">
          <FormField
            name="accountId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select an account"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="px-4">
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select a category"
                    options={categoryOptions}
                    onCreate={onCreateCategory}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="px-4">
          <FormField
            name="payee"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payee</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Add a payee"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="px-4">
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <AmountInput
                    {...field}
                    disabled={disabled}
                    placeholder="0.00"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="px-4">
          <FormField
            name="notes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    disabled={disabled}
                    placeholder="Optional notes"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full max-w-xs sm:w-3/4 block mx-auto" disabled={disabled}>
          {id ? "Save Changes" : "Create transaction"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full max-w-xs sm:w-3/4 mx-auto flex items-center justify-center gap-2"
            variant="outline"
          >
            <Trash className="size-4" />
            Delete transaction
          </Button>
        )}
      </form>
    </Form>
  );
};
export default TransactionForm;
