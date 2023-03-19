import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { padding } from "@mui/system";
import ChatIcon from "@mui/icons-material/Chat";

export default function NestedList() {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        height: "20px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton sx={{ py: 0 }}>
        <ListItemIcon sx={{ fontSize: "small" }}>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Email" />
      </ListItemButton>
      <ListItemButton sx={{ py: 0 }}>
        <ListItemIcon sx={{ fontSize: "small" }}>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="SMS" />
      </ListItemButton>
    </List>
  );
}
