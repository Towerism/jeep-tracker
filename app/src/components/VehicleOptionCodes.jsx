import {
  Box,
  Typography,
  Tooltip,
  Skeleton,
  ButtonGroup,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useIsScreenshot } from "~/src/hooks/useIsScreenshot";
import { Switch } from "./Switch";

function OptionChip({ decoded, showDecoded, code, isSubOption }) {
  const color =
    isSubOption && decoded ? "neutral" : decoded ? "neutral2" : "inherit";
  return (
    <ButtonGroup color={color} size="small" variant="contained">
      <Button>{code}</Button>
      {showDecoded && (
        <Button
          color={isSubOption ? "neutral3" : "neutral4"}
          sx={{ textTransform: "none" }}
        >
          {decoded}
        </Button>
      )}
    </ButtonGroup>
  );
}

export function VehicleOptionCodes({ rpoCodes = [] }) {
  const [showDecoded, setShowDecoded] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const isScreenshot = useIsScreenshot();

  let codes = rpoCodes;
  if (showDecoded) {
    codes = rpoCodes.filter(({ decoded }) => !!decoded);
  }

  const columns = [
    {
      field: "code",
      headerName: "Option",
      width: 100,
    },
    {
      field: "decoded",
      headerName: "Description",
      width: 400,
    },
  ];

  return (
    <Grid container sx={isScreenshot ? { mt: -10 } : {}}>
      <Grid sx={{ my: 2 }} xs={12}>
        <Typography align="center" variant="h4">
          Option codes
        </Typography>
        {!isScreenshot && (
          <Box align="center">
            <Switch
              label="Show table view"
              onChange={(event) => setShowTable(event.target.checked)}
            />
            <Switch
              label="Show order guide options only"
              defaultChecked
              onChange={(event) => setShowDecoded(event.target.checked)}
            />
          </Box>
        )}
      </Grid>
      {!showTable && (
        <Grid container spacing={1.5} justifyContent="center" xs={12}>
          {!codes.length &&
            [...Array(20).keys()].map((i) => (
              <Skeleton
                key={i}
                sx={{ mr: 1.5, mb: 1.5 }}
                variant="rounded"
                animation="wave"
                width={170}
                height={26}
              />
            ))}
          {codes.map(({ code, decoded, display, isSubOption }) => (
            <Grid key={code}>
              {decoded && !showDecoded ? (
                <Tooltip title={display} placement="top">
                  <Box>
                    <OptionChip
                      decoded
                      code={code}
                      showDeocded={showDecoded}
                      isSubOption={isSubOption}
                    />
                  </Box>
                </Tooltip>
              ) : (
                <OptionChip
                  decoded={decoded}
                  code={code}
                  showDecoded={showDecoded}
                  isSubOption={isSubOption}
                />
              )}
            </Grid>
          ))}
        </Grid>
      )}
      {showTable && (
        <Grid container xs={12}>
          <Grid xs={12}>
            <Box sx={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
              <DataGrid
                rows={codes}
                columns={columns}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                getRowId={({ code }) => code}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
