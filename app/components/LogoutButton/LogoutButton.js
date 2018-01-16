import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import styles from './LogoutButton.styl';

class LogoutButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    if (confirm('Выйти?')) this.props.dispatch(logout());
  }

  render() {
    return (
      <button onClick={this.onLogout} className={styles.button}>
        <i className='fa fa-sign-out' />
      </button>
    );
  }
}

export default connect()(LogoutButton);
