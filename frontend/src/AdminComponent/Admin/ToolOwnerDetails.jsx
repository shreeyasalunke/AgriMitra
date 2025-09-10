
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateToolOwnerStatus } from "../../component/State/Authentication/ToolOwner/Action";

const ToolOwnerDetails = () => {
  const { toolowner } = useSelector((store) => store);
  const data = toolowner.usersToolOwner;
  const dispatch = useDispatch();

  const handleToolOwnerStatus = () => {
    dispatch(
      updateToolOwnerStatus({
        toolownerId: data.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  if (!data) {
    return (
      <Box sx={{ p: 5, textAlign: "center", fontWeight: 500 }}>
        No Tool Owner details found.
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, pb: 6 }}>
      {/* ✅ Header */}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
        >
          {data.name}
        </Typography>

        <Button
          variant="contained"
          color={data.open ? "error" : "success"}
          size="large"
          sx={{
            borderRadius: "30px",
            textTransform: "capitalize",
            px: 4,
            fontWeight: "bold",
          }}
          onClick={handleToolOwnerStatus}
        >
          {data.open ? "Inactive" : "Active"}
        </Button>
      </Box>

      {/* ✅ Info Grid */}
      <Grid container spacing={3}>
        {/* Owner Info */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardHeader
              title={<Typography variant="h6">Owner Info</Typography>}
              sx={{ bgcolor: "grey.100" }}
            />
            <CardContent>
              <Box sx={{ display: "grid", gap: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>Owner</Typography>
                  <Typography>- {data.owner?.fullName || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>AgriMitra</Typography>
                  <Typography>- {data.name}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>Status</Typography>
                  <Typography>
                    -{" "}
                    <Box
                      component="span"
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        bgcolor: data.open ? "green.100" : "red.100",
                        color: data.open ? "green.700" : "red.700",
                        fontWeight: "bold",
                      }}
                    >
                      {data.open ? "Active" : "Inactive"}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardHeader
              title={<Typography variant="h6">Address</Typography>}
              sx={{ bgcolor: "grey.100" }}
            />
            <CardContent>
              <Box sx={{ display: "grid", gap: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>Country</Typography>
                  <Typography>- {data.address?.country || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>City</Typography>
                  <Typography>- {data.address?.city || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>Postal Code</Typography>
                  <Typography>- {data.address?.postalCode || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>Street</Typography>
                  <Typography>- {data.address?.streetAddress || "N/A"}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardHeader
              title={<Typography variant="h6">Contact</Typography>}
              sx={{ bgcolor: "grey.100" }}
            />
            <CardContent>
              <Box sx={{ display: "grid", gap: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>Email</Typography>
                  <Typography>- {data.contactInformation?.email || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>Mobile</Typography>
                  <Typography>- {data.contactInformation?.phone || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ width: 160, fontWeight: 500 }}>Social</Typography>
                  <Box sx={{ display: "flex", gap: 2, ml: 1 }}>
                    {data.contactInformation?.instagram && (
                      <a href={data.contactInformation.instagram} target="_blank" rel="noreferrer">
                        <InstagramIcon sx={{ fontSize: "2rem", color: "#E1306C" }} />
                      </a>
                    )}
                    {data.contactInformation?.twitter && (
                      <a href={data.contactInformation.twitter} target="_blank" rel="noreferrer">
                        <TwitterIcon sx={{ fontSize: "2rem", color: "#1DA1F2" }} />
                      </a>
                    )}
                    {data.contactInformation?.linkedIn && (
                      <a href={data.contactInformation.linkedIn} target="_blank" rel="noreferrer">
                        <LinkedInIcon sx={{ fontSize: "2rem", color: "#0077B5" }} />
                      </a>
                    )}
                    {data.contactInformation?.facebook && (
                      <a href={data.contactInformation.facebook} target="_blank" rel="noreferrer">
                        <FacebookIcon sx={{ fontSize: "2rem", color: "#4267B2" }} />
                      </a>
                    )}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToolOwnerDetails;
