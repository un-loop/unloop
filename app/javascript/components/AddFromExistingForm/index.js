import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import ActionItemCard from 'components/ActionItemCard';
import theme from 'utils/theme';
import styles from './styles';

const TrieSearch = require('trie-search');

class AddFromExistingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionItemTemplates: this.props.templates,
      selectedActionItem: null,
      selectedActionItemDate: '',
      categorySelected: null,
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.filterActionItems = this.filterActionItems.bind(this);
    this.handleCloseDateModal = this.handleCloseDateModal.bind(this);
    this.handleOpenDateModal = this.handleOpenDateModal.bind(this);
    this.handleSubmitSelectedTemplateActionItem = this.handleSubmitSelectedTemplateActionItem.bind(
      this,
    );
    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderChooseDateModal = this.renderChooseDateModal.bind(this);
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    const trie = new TrieSearch('title');
    trie.addAll(this.props.templates);
    this.setState({
      trie,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.templates.length !== prevProps.templates.length) {
      this.setState({ actionItemTemplates: this.props.templates });
    }
  }

  selectCategory(categorySelected) {
    if (categorySelected === this.state.categorySelected) {
      this.setState({ categorySelected: null });
    } else {
      this.setState({ categorySelected });
    }
  }

  handleCloseDateModal() {
    this.setState({
      selectedActionItem: null,
      selectedActionItemDate: '',
    });
  }

  /* When called, modal appears to choose due date for the action item passed in */
  handleOpenDateModal(actionItem) {
    this.setState({ selectedActionItem: actionItem });
  }

  handleSubmitSelectedTemplateActionItem() {
    this.state.selectedActionItem.dueDate = this.state.selectedActionItemDate;
    this.props.selectActionItemTemplate(this.state.selectedActionItem);
    this.handleCloseDateModal();
  }

  handleDateChange(event) {
    const { value } = event.target;
    this.setState({ selectedActionItemDate: value });
  }

  filterActionItems(e) {
    const searchValue = e.target.value;
    if (searchValue === '') {
      this.setState({
        actionItemTemplates: this.props.templates,
      });
      return;
    }

    this.setState(prevState => ({
      actionItemTemplates: prevState.trie.get(searchValue),
    }));
  }

  renderChooseDateModal() {
    return (
      <Dialog
        open={this.state.selectedActionItem !== null}
        onClose={this.handleCloseDateModal}
        onExited={() =>
          // Avoid blurring document.body on IE9 since it blurs the entire window
          document.activeElement !== document.body
            ? document.activeElement.blur()
            : null
        }
        onEntered={() => this.buttonRef.current.focus()}
      >
        <DialogTitle> Choose a due date (optional) </DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            value={this.state.selectedActionItemDate}
            fullWidth
            onChange={e => this.handleDateChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleSubmitSelectedTemplateActionItem}
            ref={this.buttonRef}
            color="primary"
          >
            Create Assignment
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    const { classes } = this.props;

    let filteredTemplates = this.state.actionItemTemplates.filter(template =>
      this.state.categorySelected
        ? template.category === this.state.categorySelected
        : template,
    );

    filteredTemplates = filteredTemplates.map((template, i) => {
      const selected = this.props.selectedActionItemIds.has(template.id);
      return (
        <Grid item key={template.id}>
          <ActionItemCard
            title={template.title}
            description={template.description}
            category={template.category}
            selected={selected}
            renderClose={false}
            handleIconClick={
              selected
                ? () => this.props.removeSelectedActionItem(template)
                : () => this.handleOpenDateModal(template)
            }
            handleOpenModal={this.props.handleOpenModal(template)}
            // Border bottom styling should be added to all cards except the last
            addBorderBottom={filteredTemplates.length - 1 !== i}
            removeActionItem={() => this.props.deleteTemplate(template)}
          />
        </Grid>
      );
    });
    const categories = [
      'Finances',
      'Project',
      'Community',
      'Startup',
      'Treatment',
      'Health',
      'Education',
    ];
    const categoryList = categories.map(category => {
      const isSelectedCategory =
        this.state.categorySelected && this.state.categorySelected === category;
      return (
        <Grid item key={category}>
          <Fab
            className={classes.iconStyle}
            style={{
              backgroundColor: isSelectedCategory
                ? theme.palette.primary.main
                : theme.palette.common.lighterBlue,
            }}
            component="span"
            variant="extended"
            size="small"
            aria-label="category"
            onClick={() => this.selectCategory(category)}
          >
            <Typography
              className={classes.categoryButtonStyle}
              style={{
                color: isSelectedCategory
                  ? theme.palette.common.lighterBlue
                  : theme.palette.primary.main,
              }}
              align="center"
            >
              {category.toUpperCase()}
            </Typography>
          </Fab>
        </Grid>
      );
    });

    return (
      <ThemeProvider theme={theme}>
        {this.renderChooseDateModal()}
        <Paper elevation={3} className={classes.formStyle}>
          <Grid container spacing={1} direction="column">
            <Grid item container direction="column" spacing={1}>
              <Grid item>SEARCH BY CATEGORY</Grid>
              <Grid item container direction="row" justify="space-evenly">
                {categoryList.slice(0, 4)}
              </Grid>
              <Grid container item justify="center" spacing={2}>
                {categoryList.slice(4)}
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="stretch">
              <Grid item>
                <div>SEARCH FOR ASSIGNMENT</div>
                <TextField
                  className={classes.searchBar}
                  onChange={this.filterActionItems}
                  variant="outlined"
                  type="text"
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              className={classes.listStyle}
            >
              {filteredTemplates.length !== 0 ? (
                filteredTemplates
              ) : (
                <Grid item className={classes.noActionItemsDisplay}>
                  <Typography variant="h5"> No assessments found </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    );
  }
}

AddFromExistingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  selectedActionItemIds: PropTypes.instanceOf(Set).isRequired,
  selectActionItemTemplate: PropTypes.func.isRequired,
  removeSelectedActionItem: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  deleteTemplate: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddFromExistingForm);
