import React from 'react';
import Balances from "./Balances";

export default class App extends React.Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <div>
        <Balances />
      </div>
    );
  }
}
