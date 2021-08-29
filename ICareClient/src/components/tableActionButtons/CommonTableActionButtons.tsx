import React, {MouseEventHandler} from "react";
import {Grid, Tooltip, IconButton} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {conditionalRender} from "utils/utils";

interface ICommonTableActionButtonsProps {
    id: string | number;
    name: string;
    onView?: MouseEventHandler;
    onEdit?: MouseEventHandler;
    onDelete?: MouseEventHandler;
}

const CommonTableActionButtons: React.FunctionComponent<ICommonTableActionButtonsProps> = props => {
    const {id, name, onView, onEdit, onDelete} = props;
    return (
        <Grid container>
            {conditionalRender(
                Boolean(onView),
                <Grid item>
                    <Tooltip title="Details">
                        <IconButton
                            component="a"
                            color="primary"
                            aria-label="View"
                            edge="start"
                            data-name={name}
                            data-id={id}
                            size="small"
                            onClick={onView}
                            style={{margin: 4}}
                        >
                            <VisibilityIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            )}
            {conditionalRender(
                Boolean(onEdit),
                <Grid item>
                    <Tooltip title="Edit">
                        <IconButton
                            color="default"
                            aria-label="Edit"
                            edge="start"
                            data-name={name}
                            data-id={id}
                            size="small"
                            onClick={onEdit}
                            style={{margin: 4}}
                        >
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            )}
            {conditionalRender(
                Boolean(onDelete),
                <Grid item>
                    <Tooltip title="Delete">
                        <IconButton
                            color="secondary"
                            aria-label="Delete"
                            edge="start"
                            size="small"
                            data-name={name}
                            data-id={id}
                            onClick={onDelete}
                            style={{margin: 4}}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            )}
        </Grid>
    );
};

export default CommonTableActionButtons;
