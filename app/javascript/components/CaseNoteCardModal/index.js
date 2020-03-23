import React from 'react';
import PropTypes from 'prop-types';
import MUIRichTextEditor from 'mui-rte';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { Button, Dialog, Grid, Paper } from '@material-ui/core/';
import styles from './styles';

// TODO: Move to global theme
const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        borderLeft: 'solid 1px #C4C4C4',
        borderRight: 'solid 1px #C4C4C4',
        borderBottom: 'solid 1px #C4C4C4',
        borderRadius: '4px',
        overflow: 'auto',
      },
      editorContainer: {
        padding: '20px',
        overflow: 'auto',
        height: '130px',
      },
      toolbar: {
        backgroundColor: '#F4F4F4',
      },
    },
  },
});

class CaseNoteCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      title: this.props.title,
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.buttonStyle}>
          <Button
            className="contained"
            color="primary"
            onClick={this.handleOpen}
          >
            VIEW MORE
          </Button>
        </div>

        <Dialog
          className={classes.dialogStyle}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <div className={classes.backgroundColor}>
            <div className={classes.modalItems}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h3 className={classes.titleStyle}>{this.state.title}</h3>
                </Grid>

                <Grid item xs={12}>
                  <Paper className={classes.caseNoteCardModalDescriptionStyle}>
                    <div className={classes.caseNoteDescStyle}>
                      <MUIRichTextEditor
                        value={this.state.description}
                        readOnly
                        toolbar={false}
                      />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

CaseNoteCardModal.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
};

export default withStyles(styles)(CaseNoteCardModal);
