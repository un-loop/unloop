import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid } from '@material-ui/core';
import formatDate from 'utils/utils';
import { DataGrid } from '@material-ui/data-grid';
import styles from './styles';
import BulkModifyModal from '../BulkModifyModal';
import MUIRichTextEditor from 'mui-rte';

function BulkModifyCreate({
  classes,
  actionItemId,
  assignmentsList,
  actionItem,
}) {
    const [selections, setSelections] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedAssignments, setSelectedAssignments] = useState([]);

    const dateHelper = {
        type: 'date',
        width: 150,
        valueFormatter: ({ value }) => formatDate(value),
    };

    const handleOpenBulkModifyModal = () => {
        setSelectedAssignments(assignmentsList.filter(assignment => {
            return selections.includes(assignment.id.toString());
        }));
        setOpen(true);
    };

    // const handleClose () => {
    //     setOpen(false);
    // };
   
    console.log('assignmentsList', assignmentsList);
    
  
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
                    {actionItem.description[0] === '{' ? 
                    (<MUIRichTextEditor value={actionItem.description} readOnly toolbar={false} />) :
                    (<Typography variant="h6">{actionItem.description}</Typography>)}
                </Grid>
                <Grid container item justify="flex-end">
                    <Button
                        // className={this.props.classes.primaryButton}
                        style={{ margin: '0 30 20 0' }}
                        variant="contained"
                        color="primary"
                        onClick={handleOpenBulkModifyModal}
                    >
                        MODIFY
                    </Button>
                    <BulkModifyModal
                        open={open} 
                        title={actionItem.title}
                        description={actionItem.description} 
                        selectedAssignments={selectedAssignments}
                        // onClose={handleClose}                   
                    />
                </Grid>
                
            </Grid>
            <DataGrid
                columns={[
                    { field: 'participant', headerName: 'Name', width: 160, valueFormatter: ({value}) =>  value.name },
                    { field: 'updated_at', headerName: 'Assigned Date', ...dateHelper },
                    { field: 'due_date', headerName: 'Due Date', ...dateHelper },
                    { field: 'completed_participant', headerName: 'Completed', width: 130 },

                ]}
                rows={assignmentsList}
                pageSize={10} 
                checkboxSelection
                onSelectionChange={(newSelection) => {
                    console.log('newSelection', newSelection);
                    setSelections(newSelection.rowIds);
                  }}
            />
            
        </>
    )
};

BulkModifyCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  actionItemId: PropTypes.string.isRequired,
  actionItem: PropTypes.object.isRequired,
  assignmentsList: PropTypes.array.isRequired,
};

export default withStyles(styles)(BulkModifyCreate);
