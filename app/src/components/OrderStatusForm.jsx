import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";

export function OrderStatusForm({
  loading,
  defaultVon = "",
  defaultLastName = "",
}) {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="von"
        label="VON"
        name="von"
        defaultValue={defaultVon}
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="lastName"
        label="Last name"
        id="lastName"
        defaultValue={defaultLastName}
      />
      <LoadingButton
        type="submit"
        loading={loading}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Get my order status
      </LoadingButton>
    </>
  );
}
