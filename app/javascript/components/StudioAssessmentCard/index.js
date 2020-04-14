import React from 'react';
import PropTypes from 'prop-types';


class StudioAssessmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
  }

  showParticipant() {
    const pId = this.props.assessment.participant_id;
    window.location.assign(`participants/${String(pId)}`);
  }

  render() {
    const assessment = this.props.assessment;
    const bigPic = assessment.bigpictureScore;
    const  prog = assessment.progfundamentalsScore;
    const  vc = assessment.versioncontrolScore;
    const  react = assessment.reactScore;
    const  node = assessment.nodeScore;
    const  db = assessment.dbScore;
    const probSolve = assessment.problemsolvingScore;
    const probSolveAlt = assessment.problemsolvingaltScore;


    return (
      <tr>
        <td
          className="name"
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
          onKeyDown={this.showParticipant}
        >
          {assessment.name}
        </td>
        <td>
            {bigPic}
        </td>
        <td>
            {prog}
        </td>
        <td>
            {vc}
        </td>
        <td>
           {react}
        </td>
        <td>
            {node}
        </td>
        <td>
            {db}
        </td>
        <td>
            {probSolve}
        </td>
        <td>
            {probSolveAlt}
        </td>
        
      </tr>
    );
  }
}

StudioAssessmentCard.propTypes = {
  assessment: PropTypes.object,
};

export default StudioAssessmentCard ;
