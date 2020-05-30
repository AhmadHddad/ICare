import React from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

export const RenderActionBtns = (id, name, onView, onEdit, onDelete) => (
  <Grid container>
    <Grid item>
      <Tooltip title="Details">
        <IconButton
          color="primary"
          aria-label="View"
          edge="start"
          size="small"
          onClick={onView(id)}
          style={{ margin: 4 }}
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Grid>
    <Grid item>
      <Tooltip title="Edit">
        <IconButton
          color="default"
          aria-label="Edit"
          edge="start"
          size="small"
          onClick={onDelete(id)}
          style={{ margin: 4 }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Grid>
    <Grid item>
      <Tooltip title="Delete">
        <IconButton
          color="secondary"
          aria-label="Delete"
          edge="start"
          size="small"
          onClick={onEdit(id, name)}
          style={{ margin: 4 }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Grid>
  </Grid>
);