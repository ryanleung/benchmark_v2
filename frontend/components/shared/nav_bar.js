import React, {Component} from 'react';
import { withRouter } from  'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// import SignInPage from './SignInPage.js';

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleAddMetric = this.handleAddMetric.bind(this)
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleTitleTap() {
  };

  handleLoginTap() {
    this.handleOpen();
  };

  handleAddMetric() {
    this.props.history.push('/add_metric')
  };

  render() {
    return (
      <div>
        <AppBar 
          zDepth={0}
          title="Kimono Metrics"
          showMenuIconButton={false}
          onTitleTouchTap={this.handleTitleTap}
          iconElementRight={
            <FlatButton
              label="Add Metric"
              onTouchTap={this.handleAddMetric} />
          }
        />
        <Dialog 
          open={this.state.open}
          onRequestClose={this.handleClose}>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(NavBar);