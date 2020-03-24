/*
 * ActionItemModal Multiple Components
 *
 * Styling for these different components
 */

export const styles = theme => ({
  participant: {
    backgroundColor: '#5870EB',
  },

  searchParticipants: {
    display: 'inline-block',
  },

  displayParticipants: {
    display: 'inline-block',
  },

  // END

  leftHalf: {
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 40,
  },
  rightHalf: {
    paddingTop: 40,
    paddingLeft: 28,
    marginRight: 0,
    backgroundColor: theme.palette.common.lightBlue,
  },
  navBar: {
    maxHeight: '100%',
    paddingTop: 40,
    backgroundColor: theme.palette.common.black,
  },
  navBarSignOut: {
    color: theme.palette.common.white,
  },
  navBarItem: {
    color: theme.palette.common.white,
  },
  avatarStyle: {
    width: 60,
    height: 60,
    backgroundColor: '#EB6658',
  },
  unloopLogo: {
    paddingLeft: '10px',
    paddingBottom: '10px',
    width: '100%',
    objectFit: 'contain',
    overflowX: 'hidden',
    backgroundColor: theme.palette.common.black,
  },
});

export default styles;
