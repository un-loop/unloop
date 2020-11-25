import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid } from '@material-ui/core';
import formatDate from 'utils/utils';
import { DataGrid } from '@material-ui/data-grid';
import styles from './styles';

function BulkModifyCreate({
  classes,
  actionItemId,
  assignments,
  assignmentsList,
  actionItem,
}) {
    console.log('actionItem', actionItem);
    console.log('actionItemId', actionItemId);
    console.log('assignments', assignments);
    console.log('assignmentsList', assignmentsList);

    const dateHelper = {
        type: 'date',
        width: 150,
        valueFormatter: ({ value }) => formatDate(value),
    };

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
                    {assignmentsList.map((item, i) => {
                        var name = item.participant.name;
                        console.log('name', name);
                        return (

                            <DataGrid key={i}
                                columns={[
                                    { field: 'participant_id', headerName: 'ID', width: 70 },
                                    { field: 'name', headerName: 'Name', width: 160 },
                                    { field: 'updated_at', headerName: 'Assigned Date', ...dateHelper },
                                    { field: 'due_date', headerName: 'Due Date', ...dateHelper },
                                    { field: 'completed_participant', headerName: 'Completed', width: 130 },

                                ]}
                                rows={assignments}
                                pageSize={10} 
                                checkboxSelection 
                            />
                        )
                     })}
            
            <Grid container justify="flex-end">
                <Grid item>
                    <Button>
                        MODIFY
                    </Button>
                </Grid>
            </Grid>
            

        </>
    )
};

BulkModifyCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  actionItemId: PropTypes.string.isRequired,
  actionItem: PropTypes.object.isRequired,
  assignments: PropTypes.array.isRequired,
  assignmentsList: PropTypes.array.isRequired,
};

export default withStyles(styles)(BulkModifyCreate);
