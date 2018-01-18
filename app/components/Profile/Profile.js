import React from 'react';
import { connect } from 'react-redux';
import { auth, logout } from '../../redux/actions';
import styles from './Profile.styl';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible:       false,
      bittrexKey:    props.bittrexKey || '',
      bittrexSecret: props.bittrexSecret || '',
      binanceKey:    props.binanceKey || '',
      binanceSecret: props.binanceSecret || '',
    };

    this.onToggle = this.onToggle.bind(this);
    this.onAuth = this.onAuth.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onToggle() {
    this.setState({ visible: !this.state.visible });
  }

  onAuth(e) {
    e.preventDefault();
    this.props.dispatch(auth(this.state));
    this.onToggle();
  }

  onChange(type) {
    return (e) => this.setState({ [type]: e.target.value });
  }

  renderPopup() {
    const { bittrexKey, bittrexSecret, binanceKey, binanceSecret, } = this.state;
    return (
      <form className={styles.form} onSubmit={this.onAuth}>
        <h2 className={styles.title}>Bittrex</h2>
        <input
          className={styles.input}
          placeholder="API KEY"
          value={bittrexKey}
          onChange={this.onChange('bittrexKey')}
        />
        <input
          className={styles.input}
          placeholder="API SECRET"
          value={bittrexSecret}
          onChange={this.onChange('bittrexSecret')}
        />
        <h2 className={styles.title}>Binance</h2>
        <input
          className={styles.input}
          placeholder="API KEY"
          value={binanceKey}
          onChange={this.onChange('binanceKey')}
        />
        <input
          className={styles.input}
          placeholder="API SECRET"
          value={binanceSecret}
          onChange={this.onChange('binanceSecret')}
        />
        <button className={styles.submit}>Сохранить</button>
      </form>
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <button onClick={this.onToggle} className={styles.button}>
          <i className='fa fa-user' />
        </button>
        {this.state.visible && this.renderPopup()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bittrexKey:    state.bittrexKey,
  bittrexSecret: state.bittrexSecret,
  binanceKey:    state.binanceKey,
  binanceSecret: state.binanceSecret,
});
export default connect(mapStateToProps)(Profile);
