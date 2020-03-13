/**
 *
 * PaperworkEntry
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  DialogTitle,
  DialogActions,
  Dialog,
} from '@material-ui/core';
import PaperworkForm from 'components/PaperworkForm';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import DoneIcon from '@material-ui/icons/Done';
import { apiPatch } from 'utils/axios';
import styles from './styles';

function PaperworkEntry({
  classes,
  date,
  paperwork,
  userType,
  participantId,
  // Used by style file
  // eslint-disable-next-line no-unused-vars
  lastEntry = false,
}) {
  const { id, agree, link, title, viewed } = paperwork;
  const [open, setOpen] = useState(false);
  const [hasViewed, setHasViewed] = useState(viewed);
  const [hasAgreed, setAgreed] = useState(agree);

  const handleView = () => {
    if (!hasViewed) {
      apiPatch(`/api/paperworks/${id}/viewed`)
        .then(res => {
          setHasViewed(res.data.viewed);
        })
        .catch(error => console.error(error));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    apiPatch(`/api/paperworks/${id}/complete`)
      .then(res => {
        setAgreed(res.data.agree);
        setOpen(false);
      })
      .catch(error => console.error(error));
  };

  const loadAvatar = () =>
    hasAgreed ? <DoneIcon /> : <NotificationsNoneIcon color="secondary" />;
  const loadActions = () => {
    let ret;
    if (userType === 'staff') {
      ret = (
        <CardActions>
          <PaperworkForm
            type="edit"
            participantId={participantId}
            paperworkTitle={title}
            paperworkLink={link}
            paperworkId={id}
          />
          <Button color="primary" href={link} target="_blank">
            View
          </Button>
        </CardActions>
      );
    } else if (userType === 'participant') {
      if (hasAgreed) {
        ret = (
          <CardActions>
            <Button variant="text" color="primary" href={link} target="_blank">
              View
            </Button>
          </CardActions>
        );
      } else {
        ret = (
          <CardActions>
            <Button
              variant="text"
              color="primary"
              href={link}
              target="_blank"
              type="submit"
              onClick={handleView}
            >
              View
            </Button>
            <Button
              variant="text"
              color="primary"
              disabled={!hasViewed}
              onClick={() => setOpen(true)}
            >
              Approve
            </Button>
          </CardActions>
        );
      }
    }
    return ret;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Are you sure you want to approve this paperwork?
        </DialogTitle>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.card}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <CardHeader
              avatar={loadAvatar()}
              title={title}
              subheader={<i>Assigned: {date}</i>}
              titleTypographyProps={{ variant: 'h6' }}
            />
          </Grid>
          {loadActions()}
        </Grid>
      </Card>
    </div>
  );
}

PaperworkEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  paperwork: PropTypes.object.isRequired,
  userType: PropTypes.oneOf(['staff', 'participant']),
  participantId: PropTypes.number.isRequired,
  lastEntry: PropTypes.bool,
  id: PropTypes.number,
};

export default memo(withStyles(styles)(PaperworkEntry));
