import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ActionItemCard from 'components/ActionItemCard';
import PropTypes from 'prop-types';
import styles from './styles';

function ActionItemList({
  classes,
  selectedActionItems,
  removeSelectedActionItem,
}) {
  const selectedCards = selectedActionItems.map((actionItem, i) => (
    <Grid item>
      <ActionItemCard
        title={actionItem.title}
        description={actionItem.description}
        dueDate={actionItem.dueDate}
        lastEntry={i === selectedActionItems.length - 1}
        category={actionItem.category}
        removeActionItem={() => removeSelectedActionItem(actionItem)}
      />
    </Grid>
  ));

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      className={classes.listStyle}
      spacing={1}
    >
      {selectedCards}
    </Grid>
  );
}

ActionItemList.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedActionItems: PropTypes.array.isRequired,
  removeSelectedActionItem: PropTypes.func,
};

export default withStyles(styles)(ActionItemList);