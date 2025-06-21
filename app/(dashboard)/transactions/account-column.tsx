import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

type Props = {
  id: string;
  account: string | null;
  accountId: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AccountColumn = ({ id, account, accountId }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    if (accountId) {
      onOpenAccount(accountId);
    }
  };
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
};
