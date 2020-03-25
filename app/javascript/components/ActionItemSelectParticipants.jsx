import React from 'react';
import {
    Button,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ActionItemSearchParticipants from './ActionItemSearchParticipants';
import ActionItemDisplayParticipants from './ActionItemDisplayParticipants';
import styles from './styles';

class ActionItemSelectParticipants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
            selectedParticipants: [],
            statuses: [],
        }
        this.addUserToState = this.addUserToState.bind(this);
        this.removeUserFromState = this.removeUserFromState.bind(this);
        this.addAllUsersToState = this.addAllUsersToState.bind(this);
        this.removeAllUsersFromState = this.removeAllUsersFromState.bind(this);
    }

    // Adds selected user to state to be displayed
    addUserToState(user) {
        console.log("Trying to add:", user);
        this.setState(prevState => ({
            selectedParticipants: [...prevState.selectedParticipants, user]
        }));
        console.log(this.state.selectedParticipants);
    }

    // Removes user from display
    removeUserFromState(user) {
        console.log("Trying to remove:", user);
        var copy = [...this.state.selectedParticipants];
        var index = this.state.selectedParticipants.indexOf(user);
        copy.splice(index, 1); // Removes one element at `index` location
        this.setState({
            selectedParticipants: copy,
        })
        console.log(this.state.selectedParticipants);
    }

    // Adds all users at once to be displayed
    addAllUsersToState() {
        this.setState({
            selectedParticipants: this.state.participants,
        })
    }

    // Removes all users at once from display
    removeAllUsersFromState() {
        this.setState({
            selectedParticipants: [],
        })
    }

    // getParticipants() {
    //     this.setState({participants: this.apiGet('users/')});
    // }
    
    render() {
        const { classes } = this.props;
        return (
            // Overall component
            <div className='entirePage'>

                {/* Top part of page */}
                {/* Images of dots and stuff here */}
                <Typography>Create New Assignment List</Typography> 

                <div className={classes.displayParticipants}>
                    {/* Rendering left side of page (for listing people) */}
                    <ActionItemDisplayParticipants
                        selectedParticipants={this.state.selectedParticipants}
                    />
                </div>

                <div className={classes.searchParticipants}>
                    {/* Rendering right side of page (for searching). */}
                    <ActionItemSearchParticipants 
                        participants={this.state.participants}
                        addUser={this.addUserToState}
                        removeUser={this.removeUserFromState}
                        addAllUsers={this.addAllUsersToState}
                        removeAllUsers={this.removeAllUsersFromState}
                    />
                </div>

                {/* Adding buttons for previous and next */}

            </div>
        )
    }
}

// function ActionItemSelectParticipants({ classes }) {

// ActionItemSelectParticipants.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ActionItemSelectParticipants);

// export default ActionItemSelectParticipants;