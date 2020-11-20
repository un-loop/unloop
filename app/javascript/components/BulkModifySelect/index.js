import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EnhancedTable from 'components/EnhancedTable'; 
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import AppBar from '@material-ui/core/AppBar';
import BulkModifySelectCard from '../BulkModifySelectCard';

function BulkModifySelect({
    classes,
    actionItems,
}) {
    const [pageNo, setPageNo] = React.useState(0);
    const headCells = [
        {
          id: 'id',
          disablePadding: false,
          label: 'ID',
          sortable: true,
        },
        {
          id: 'title',
          disablePadding: false,
          label: 'Title',
          sortable: true,
        },
        {
          id: 'updated_at',
          disablePadding: false,
          label: 'Updated At',
          sortable: true,
        },
        {
          id: 'category',
          disablePadding: false,
          label: 'Category',
          sortable: true,
        },
    ];
    const onPageChange = (e, newPage) => {
        setPageNo(newPage);
    };
    return (
        <>
          <AppBar className={classes.appBar}> 
            <Typography variant='h6' className={classes.title}>
                Bulk Modify Select
            </Typography>
          </AppBar>
            <EnhancedTable
                headCells={headCells}
                rows={actionItems}
                pageHandler={onPageChange}
                page={pageNo}
                CustomRowComponent={BulkModifySelectCard}
            ></EnhancedTable>
        </>
    );
};

BulkModifySelect.propTypes = {
    classes: PropTypes.object.isRequired,
    actionItems: PropTypes.array.isRequired,
};

export default withStyles(styles)(BulkModifySelect);
