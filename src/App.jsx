import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Runtime, Inspector } from '@observablehq/runtime';
import notebook from '@corpetty/test-graph-embed';
import Latex from 'react-latex';
import style from './App.css';

class App extends Component {
  componentDidMount() {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === 'viewof numberStatusUsers') {
        return new Inspector(this.numberUserInputRef.current);
      }
      if (name === 'viewof userGrowthRate') {
        return new Inspector(this.userGrowthRateRef.current);
      }
      if (name === 'viewof userChurnRate') {
        return new Inspector(this.userChurnRateRef.current);
      }
      if (name === 'viewof userbar') {
        return new Inspector(this.userbarRef.current);
      }
      if (name === 'viewof percentUsersRegisterName') {
        return new Inspector(this.userConversionRef.current);
      }
      if (name === 'viewof removalRate') {
        return new Inspector(this.removalRateRef.current);
      }
      if (name === 'viewof ensUserbar') {
        return new Inspector(this.ensUserbarRef.current);
      }
      if (name === 'viewof amountDepositSnt') {
        return new Inspector(this.amountDepositSntRef.current);
      }
      if (name === 'viewof lockedSntBar') {
        return new Inspector(this.lockedSntBarRef.current);
      }
      if (name === 'viewof sntPrice') {
        return new Inspector(this.sntPriceRef.current);
      }
      if (name === 'viewof lockedUsdBar') {
        return new Inspector(this.lockedUsdBarRef.current);
      }
      return null;
    });
  }

  numberUserInputRef = React.createRef();

  userGrowthRateRef = React.createRef();

  userChurnRateRef = React.createRef();

  userbarRef = React.createRef();

  userConversionRef = React.createRef();

  removalRateRef = React.createRef();

  ensUserbarRef = React.createRef();

  amountDepositSntRef = React.createRef();

  lockedSntBarRef = React.createRef();

  sntPriceRef = React.createRef();

  lockedUsdBarRef = React.createRef();

  render() {
    return (
      <div className="App">
        <h2>Disucssion of variables</h2>
        <h3>Number of Users</h3>
        <p>
          It is clear that this all depends on how many users Status has in the
          app. If they are not using Status, then they won’t use the feature.
          This is our base metric, and we will model it using compounding growth
          and loss. We can start with a number of users that are using the app,
          and set additional growth and loss variables (in percentages) that
          define how this number changes over the next 10 years. This means that
          every year, we expect a certain percentage change in users based on
          the numbers of the previous year. Depending on how you set those
          percentages, the number of users can grow very rapidly! Go ahead and
          play with the following variables to see how the number of users
          change over the years.
        </p>
        <div ref={this.numberUserInputRef} />
        <div ref={this.userGrowthRateRef} />
        <div ref={this.userChurnRateRef} />
        <div ref={this.userbarRef} className={style.chart} />
        <h3>Conversion rate of users to ENS username</h3>
        <p>
          Ok cool. We have our user base locked and loaded for the next 10
          years, but not everyone is going to register an ENS username. We can
          brand it, make it simple, and incentivize people to do it but the
          reality is that that number will never be 100%. So the number of
          people that DO decide to register an ENS username is what we want. We
          get this number by multiplying the total number of users by the
          adoption conversion rate, which is another variable.
        </p>
        <p>
          Now not all users will keep their usernames. Some people will remove
          their deposit after the year and bring their SNT back into
          circulation. Some people will leave Status altogether and [DESCRIBE
          WHAT HAPPENS TO THIS SNT]. We’ll model this with another conversion
          factor, which represents the number of people who renew their username
          every year. Go ahead and change these variables and see how the
          following graph changes
        </p>
        <div ref={this.userConversionRef} />
        <div ref={this.removalRateRef} />
        <div ref={this.ensUserbarRef} />
        <h3>Amount of SNT to deposit and renewal time</h3>
        <p>
          Now we have the amount of users that have (or will) used this utility.
          Let’s figure out how that translates to SNT. In order to do that, we
          have two more variables to define: The amount of SNT required to
          register an ENS username, and the time this money is locked up. By
          multiplying each user by these two variables, we can show how much SNT
          is being locked up every year which effectively takes it out of the
          circulating supply, i.e.
        </p>
        <h3>
          <Latex displayMode>
            {
              '$$N_{\\text{SNT locked}} = N_{\\text{registrations}} * N_{\\text{amount per snt reg}}$$'
            }
          </Latex>
        </h3>
        <div ref={this.amountDepositSntRef} />
        <div ref={this.lockedSntBarRef} />
        <h3>How to assign value to all of this?</h3>
        <div ref={this.sntPriceRef} />
        <div ref={this.lockedUsdBarRef} />
      </div>
    );
  }
}

export default hot(App);
