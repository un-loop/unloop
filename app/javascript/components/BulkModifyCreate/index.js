import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
    Button, 
    Typography,
    Grid,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import styles from './styles';

function BulkModifyCreate
({
    classes,
    actionItemId,
    assignments,
    actionItem,
}) {
    const columns = [
        { field: 'participant_id', headerName: 'ID', width: 70 },
        { field: 'participants', headerName: 'Name', width: 130 },
        {
            field: 'updated_at',
            headerName: 'Assigned Date',
            type: 'date',
            width: 150,
            format: (value) => formatDate(value),
        },
        {
            field: 'due_date',
            headerName: 'Due Date',
            type: 'date',
            width: 150,
            format: (value) => value.formatDate(value),
        },
        {
            field: 'completed_participant',
            headerName: 'Completed',
            width: 130,
        },
    ];
    return (
        <>
        <Grid
            container
            justify="center"
        >
            <Grid
                item
            >
                <Typography variant="h4">{actionItem.title}</Typography>
                <Typography variant="h6">{actionItem.description}</Typography>
            </Grid>
            
        </Grid>
        <DataGrid rows={assignments} columns={columns} pageSize={10} checkboxSelection />
        </>
    )
};

BulkModifyCreate.propTypes = {
    classes: PropTypes.object.isRequired,
    actionItemId: PropTypes.string.isRequired,
    actionItem: PropTypes.object.isRequired,
    assignments: PropTypes.array.isRequired,

};

export default withStyles(styles)(BulkModifyCreate);