import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import formatDate from 'utils/utils';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles';

function BulkModifySelectCard({ classes, row }) {
  const showActionItem = () => {
    const actionItemId = row.id;
    window.location.assign(`/assignments/bulk-modify/${actionItemId}`);
  };
  return (
    <>
      <TableCell>{row.id}</TableCell>
      <TableCell
        style={{ cursor: 'pointer' }}
        onClick={showActionItem}
        onKeyDown={showActionItem}
      >
        {row.title}
      </TableCell>
      <TableCell>{formatDate(row.updated_at)}</TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell align="center">
        <FontAwesomeIcon
          onClick={showActionItem}
          icon={faChevronRight}
          color="grey"
          style={{ cursor: 'pointer' }}
          className={classes.iconLarge}
        />
      </TableCell>
    </>
  );
}

BulkModifySelectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  row: PropTypes.object,
};

export default withStyles(styles)(BulkModifySelectCard);
