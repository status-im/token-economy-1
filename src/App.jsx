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
        <h2>Introduction</h2>
        <p>
          The Status Network has a utility token, the Status Network Token
          (SNT). What does that even mean? What utilities does it have and how
          do their uses affect the rest of the ecosystem? Does it have an impact
          on valuation? What even is valuation of a utility token?
        </p>
        <p>
          These questions are hard, and there does not seem to be sufficient
          academic answers to them, for very good reasons. The technology
          enabling a “utility token” is new, and transcendent of many older
          technologies. This consequently means the models used to evaluate the
          older technologies will never be able to completely describe the newer
          ones. We, as a community, need to build new ones and evaluate them
          rigorously.
        </p>
        <p>
          There is currently quite a bit of work being done in this field, but
          it is mostly for investment firms to make appropriate calls on buying,
          selling, and holding various project’s tokens. While this is
          drastically important for growth and project funding, we at Status
          feel that there are other, less financially motivated reasons to do
          this work which require a different approach. More specifically, any
          utility token needs to be able to objectively evaluate various
          features and utilities of their platform, and how they affect the
          entirety of their ecosystem. For instance, we need to be able to ask
          questions like the following: “How can we objectively measure the use
          of SNT if it gets used in feature X as a function of our user base?
          Based on that measurement, is its development cost justified, or
          should we focus on something else?”
        </p>
        <p>
          We will be launching Status with the following SNT use-cases, as
          described in the{' '}
          <a href="https://status.im/whitepaper.pdf">whitepaper</a>:
          <ul>
            <li>Teller Network</li>
            <li>Tribute to Talk</li>
            <li>ENS Usernames</li>
            <li>Sticker Market</li>
            <li>SNT Curated Dapp Store</li>
            <li>Network Incentivization (may not be available at launch)</li>
          </ul>
        </p>
        <p>
          Each of these use-cases are run by the SNT token, but in very
          different ways. This means each will have differing effects on the
          supply and demand of the token itself. It doesn’t stop there, as
          Status is an open and permissionless platform for developers to build
          on and use, which means that anyone can build SNT use-cases that
          affect the overall supply and demand. But how do we know what effect a
          utility has? Where do we go to try and evaluate its usefulness?
        </p>
        <p>
          To this end, we would like to start a blog series detailing some of
          the research we are doing within Status to objectively evaluate the
          flow of SNT, the potential effects of our implemented (and upcoming)
          SNT use cases within Status, and how our potential user growth changes
          things. This work will encompass traditional economic and portfolio
          theory, work currently being done in crypto-economics, and novel
          methodology. That means a part of this endeavor is an attempt to get
          peer review and evaluation of what we do by you, the community!
        </p>
        <p>
          Let’s start with the ENS naming system. In Status, for a little SNT,
          you can register your username on the Ethereum Name System (ENS) so
          others can find you easily. In order for us to apply models or
          understand the economics of a use case, we first have to understand
          what it is, how it works, and how it fits within the Status ecosystem.
          Let’s start by breaking down how ENS usernames work within Status:
          <ol>
            <li>User selects a unique username, {`<username>`}</li>
            <li>User deposits 10 SNT into the ENS username dapp</li>
            <li>
              User is granted sole control over the subdomain {`<username>`}
              .stateofus.eth for 1 year
            </li>
            <li>
              User is able to get deposited funds after this yearly period, and
              release the username back into available names.
            </li>
            <li>
              User is now searchable within Status as {`<username>`} or
              {`<username>`}.stateofus.eth outside of the Status app.
            </li>
          </ol>
        </p>
        <p>
          The use case and token flow are both relatively simple, but what are
          the effects on the ecosystem? Let’s first try and model what value
          this could potentially accrue over time. We can start by picking out
          the variables in this process to see how things depend on each other.
          Furthermore, the above values are what we currently use, but in terms
          of modeling, we should turn those into variables that allow us to see
          what effect each has on the overall mechanism. This can help inform us
          (and you) on appropriate choices.
        </p>
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
          circulation. Some people will leave Status altogether. If they never
          manually release their SNT from the ENS username contract, it can be
          considered locked forever. For this, we will continue to consider them
          users because from the contract&apos;s perspective, they are
          indestiguishable. We’ll model the people who release their username
          with another conversion factor. Go ahead and change these variables
          and see how the following graph changes.
        </p>
        <div ref={this.userConversionRef} />
        <div ref={this.removalRateRef} />
        <div ref={this.ensUserbarRef} />
        <h3>Amount of SNT required to deposit</h3>
        <p>
          Now we have the amount of users that will (or have) use(d) this
          utility. Let’s figure out how that translates to SNT. In order to do
          that, we have another variable to define: The amount of SNT required
          to register an ENS username. By multiplying each user by this
          variable, we can show how much SNT is being locked up every year which
          effectively takes it out of the circulating supply, i.e.
        </p>
        <p>
          <Latex displayMode>
            {
              '$$N_{\\text{SNT locked}} = N_{\\text{registrations}} * N_{\\text{SNT per registration}}$$'
            }
          </Latex>
        </p>
        <div ref={this.amountDepositSntRef} />
        <div ref={this.lockedSntBarRef} />
        <h3>How to assign value to all of this?</h3>
        <p>
          Having the amount of SNT locked up is quite useful by itself. From
          there, we can look at the circulating supply and see how this use-case
          affects its availability. It is also interesting to see how this maps
          to real world assets by look at the current price of SNT in US Dollars
          (USD). Since most evaluation mechanism use a market capitalization
          (cap) metric to compare different networks and tokens, mapping each
          use-case , and eventually the whole network, allows us to see how much
          they contribute to a given market cap.
        </p>
        <div ref={this.sntPriceRef} />
        <div ref={this.lockedUsdBarRef} />
        <h2>Thoughts and Conclusions</h2>
        <p>
          So what have we learned from all of this? How can we change the model
          to better fit reality? Are their any actionable conclusions around ENS
          usernames that come from this information?
        </p>
        <p>
          As stated previously, this particular use-case and work done the
          groundwork to build more complex models of the SNT use-cases. It also
          helps introduce the concept of how different variables affect growth
          and impact over time.  If you plan to follow this series and work, we
          suggest making sure you understand each step along the way because
          all of this can get complicated fast. 
        </p>
        <p>
          You have probably noticed that the default values for each variable
          is not justified anywhere.  This is a problem that we plan to face 
          by using historical data to make justified default values.  Right now,
          we have a toolset to see what happens when we change variables, but not
          <em> what those variables should be based in reality.</em>  These 
          workbooks are living documents that will change over time to include
          such work.
        </p>
        <h3>Call to Action</h3>
        <p>
          Our goal is to continuously improve these methods and create more work
          not only around ENS usernames, but with the entire SNT ecosystem. This
          means we would love to get feedback from you, the community. If we
          have done something incorrectly, or you know of some way to better
          model various aspects herein, please join the discussion. We will
          be posting all of these articles in [DISCUSS WHERE WE WANT THIS TO
          LIVE].
        </p>
        <h3>Future Improvements</h3>
        <ul>
          <li>discounted value rate</li>
          <li>probability of failure</li>
          <li>justifications using historical data</li>
          <li>assign variables and create equations for each</li>
        </ul>
      </div>
    );
  }
}

export default hot(App);
