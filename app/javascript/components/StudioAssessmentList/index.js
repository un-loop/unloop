/**
 *
 * Studio Assessment List
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, List } from '@material-ui/core';
import StudioAssessmentModal from 'components/StudioAssessmentModal';
import styles from './styles';

function StudioAssessmentList({
  classes,
  initialStudioAssessments,
  participantId,
  userType,
}) {
  const [studioAssessments] = useState(initialStudioAssessments);
  // const updateStudioAssessment = updatedAssessments => {
  //   const allAssessments = [...studioAssessments];
  //   const assessmentIndex = allAssessments.findIndex(
  //     assessment => assessment.id === updatedAssessments.id,
  //   );
  //   if (assessmentIndex !== -1) {
  //     allAssessments[assessmentIndex] = updatedAssessments;
  //     setPaperworks(allAssessments);
  //   }
  // };
  const studioAssessmentEntries = studioAssessments.map(studioAssessment => (
    <StudioAssessmentModal
      studioAssessment={studioAssessment}
      userType={userType}
      participantId={participantId}
      type="edit"
    />
  ));

  return (
    <Paper elevation={3} className={classes.containerStyle}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.componentTitle}
      >
        <Grid item>
          <h3 className={classes.headerStyle}>Studio Assessments</h3>
        </Grid>
        <Grid item>
          <StudioAssessmentModal
            participantId={participantId}
            // studioAssessment={studioAssessments[0]}
            type="create"
          />
        </Grid>
      </Grid>
      <List className={classes.listStyle} dense>
        {studioAssessments.length !== 0 ? (
          studioAssessmentEntries
        ) : (
          <div>
            <h2>no studio assessments assigned</h2>
          </div>
        )}
      </List>
    </Paper>
  );
}

StudioAssessmentList.propTypes = {
  userType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  initialStudioAssessments: PropTypes.array.isRequired,
  participantId: PropTypes.number.isRequired,
};

export default withStyles(styles)(StudioAssessmentList);
