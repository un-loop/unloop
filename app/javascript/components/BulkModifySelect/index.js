import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
// import styles from './styles';

function BulkModifySelect({
    // classes,
    actionItems,
}) {
  console.log('actionItems', actionItems);
    return (
        <Grid 
          container
          direction="column"
          justify="space-evenly"
          wrap="nowrap"
        >
          {actionItems.map((actionItem, i) => (
              <Grid item key={i}>
                  <Typography variant="body1">{actionItem.id}</Typography>
                  <Typography variant="body1">{actionItem.title}</Typography>
                  <Typography variant="body1">{actionItem.updated_at}</Typography>
                  <Typography variant="body1">{actionItem.category}</Typography>
              </Grid>)
          )}
        </Grid>
    )

};

BulkModifySelect.propTypes = {
    // classes: PropTypes.object.isRequired,
    actionItems: PropTypes.array.isRequired,
};

export default BulkModifySelect;
