import { Box } from "@mui/material";
import { UserEntity } from "../../types";
import { UserInvoicesTable } from "../../components/client/UserInvoicesTable";

export const UserInvoices: React.FC<{ user: UserEntity | null }> = ({
  user,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <UserInvoicesTable
        codClient={user && user.codClient ? user.codClient : 0}
      />
    </Box>
  );
};
