import React from 'react';
import { connect } from 'react-redux';
import styles from './Login.styl';
import { auth } from "../../redux/actions";

class Login extends React.Component {
  constructor( props ) {
    super(props);

    this.state = {
      apiKey:    '',
      apiSecret: '',
    };

    this.onAuth = this.onAuth.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onAuth( e ) {
    e.preventDefault();
    console.log(this.state);
    const { apiKey, apiSecret } = this.state;
    if (!apiKey || !apiSecret) return;
    this.props.dispatch(auth(apiKey, apiSecret));
  }

  onChange( type ) {
    return ( e ) => this.setState({ [type]: e.target.value });
  }

  render() {
    const { apiKey, apiSecret } = this.state;
    return (
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={this.onAuth}>
          <h1 className={styles.title}>Авторизация</h1>
          <input
            className={styles.input}
            placeholder="API KEY"
            value={apiKey}
            onChange={this.onChange('apiKey')}
          />
          <input
            className={styles.input}
            placeholder="API SECRET"
            value={apiSecret}
            onChange={this.onChange('apiSecret')}
          />
          <button className={styles.button}>Войти</button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);