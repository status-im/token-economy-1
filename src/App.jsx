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
      if (name === 'viewof dollarPriceDomain') {
        return new Inspector(this.dollarPriceDomainRef.current);
      }
      if (name === 'viewof discountRate') {
        return new Inspector(this.discountRateRef.current);
      }
      if (name === 'viewof lockedUsdBar') {
        return new Inspector(this.lockedUsdBarRef.current);
      }
      if (name === 'viewof netPresentUtility') {
        return new Inspector(this.netPresentUtilityRef.current);
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

  dollarPriceDomainRef = React.createRef();

  discountRateRef = React.createRef();

  lockedUsdBarRef = React.createRef();

  netPresentUtilityRef = React.createRef();

  render() {
    return (
      <div className="App">
        <h2>Introduction</h2>
        <p>
          The Status Network has a utility token, the Status Network Token
          (SNT). What does that even mean? What utilities does it have and how
          do their uses affect the rest of the ecosystem? Does it impact value?
          What even is the value of a utility token?
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
          it is mostly for investment firms to make appropriate capital
          allocation decisions among a diversified portfolio of cryptoassets.
          While this is drastically important for growth and project funding,
          there is great lack of research on capital and resource allocation
          inside of a single network. More specifically, any utility token needs
          to be able to objectively evaluate various features and utilities of
          their platform, and how they affect the entirety of their ecosystem.
          For instance, we need to be able to ask questions like the following:
          “How can we objectively measure the difference in the rate users use
          feature X in Status and its respective impact on the ecosystem?”
        </p>
        <p>
          We will be launching Status with the following SNT use-cases, as
          described in the{' '}
          <a href="https://status.im/whitepaper.pdf">whitepaper</a> and{' '}
          <a href="https://www.status.im">the website</a>:
          <ul>
            <li>Teller Network</li>
            <li>Tribute to Talk</li>
            <li>ENS Usernames</li>
            <li>Sticker Market</li>
            <li>SNT Curated Dapp Store</li>
            <li>Network Incentivization (may not be available at launch)</li>
            <li>Liquid Funding (may not be avaialble at launch)</li>
            <li>User Acquisition Engine (will not be available at launch)</li>
          </ul>
        </p>
        <p>
          Each of these use-cases leverage the SNT token, but in very different
          ways. For instance, some will lock up large amounts, some will
          actually burn the token, and some will incentivize sending and
          receiving. This means each will have differing effects on the supply
          and demand of the token itself, and will need to be modeled
          differently. It doesn’t stop there as Status is an open and
          permissionless platform for developers to build on and use, which
          means that anyone can build SNT use-cases that affect the overall
          supply and demand. But how do we know what effect a utility has? Where
          do we go to try and evaluate its usefulness?
        </p>
        <p>
          To this end, we would like to start a blog series detailing some of
          the research we are doing within Status to objectively evaluate the
          value flows of SNT, the potential effects of our implemented (and
          upcoming) SNT use cases within Status, and how our potential user
          growth changes things. This work will encompass traditional economic
          and finance theory, work currently being done in crypto-economics, and
          novel methodology. That means a part of this endeavor is an attempt to
          get peer review and evaluation of what we do by you, the community!
        </p>
        <p>
          <b>
            DISCLAIMER: The work in this article (and mentioned notebooks) is
            for modeling purposes only. The numbers herein are not to project
            actual values locked up in Status and should not be used for
            investment advice. It is our strict desire to create and improve
            models that describe value flow of SNT use-cases (and similar token
            use-cases), and how these use-cases compare to each other.
          </b>
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
          the effects on the network? Let’s first try and model what value this
          could potentially accrue over time. We can start by picking out the
          variables in this process to see how things depend on each other.
          Furthermore, the above values are what we currently use, but in terms
          of modeling, we should turn those into variables that allow us to see
          what effect each has on the overall mechanism. This can help inform us
          (and you) on appropriate choices.
        </p>
        <h2>Discussion of variables</h2>
        <h3>Number of Users</h3>
        <p>
          It is clear that this all depends on how many users Status has in the
          app. If they are not using Status, then they won’t use the feature.
          This is our base metric, and we will model it using compounding growth
          and loss. We can start with a number of users that are using the
          network, and set additional growth and loss variables (in percentages)
          that define how this number changes over the next 10 years. This means
          that every year, we expect a certain percentage change in users based
          on the numbers of the previous year. Depending on how you set those
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
        <h3>
          US Dollar Amount of SNT to Deposit, Discount Rate, and Net Present
          Value
        </h3>
        <p>
          Now the contract itself locks up a specific amount of SNT per
          username, but the goal is to model around a reasonable target price in
          US dollars and have the contract change over time to adapt as the
          price of SNT changes. Why do we do this? In order to evaluate value
          flow overtime we need a relatively stable unit by which to measure and
          normalize the value flows. We use US dollars due to the size,
          stability and data availability for that market. While one can argue
          that US dollars do not maintain their value in the long term, they at
          least depreciate at a stable and predictable rate. The mechanisms and
          governance around how this price change works is a subject still under
          discussion and will be addressed in future articles (but we’ve got
          some really cool ideas). So the knob we choose to tweak here is the US
          dollar amount of SNT to be locked up.
        </p>
        <div ref={this.dollarPriceDomainRef} />
        <p>
          An additional factor in using the US Dollar equivalent of SNT here is
          that we can add a discounted cash flow analysis based on historical
          data of USD. Future notebooks and articles will look into deriving and
          modeling a discount rate purely in cryptocurrency. For brevity, this
          article will only introduce the concept and gloss over a good portion
          of the details and derivation of the terms within. For more
          information, please visit the{' '}
          <a href="https://observablehq.com/@bgits/status-cost-of-capital">
            more detailed workbook
          </a>
          .
        </p>
        <p>
          A simple surface level description of a discount rate is the rate you
          use to figure out how much present value a known future cash flow is
          worth. In other words, how to presently evaluate the amount of money
          you know will come in the future. Once you have the discount rate, you
          can calculate the <em>Net Present Value</em>, which is given by the
          following formula:
        </p>
        <p>
          <Latex displayMode>
            {
              '$$NPV = \\sum^n_{t=1} \\frac{R_t}{(1+i)^t} - \\text{initial cost}$$'
            }
          </Latex>
        </p>
        <p>
          where <Latex>$$t$$</Latex> is the number of time periods (10 in this
          article),
          <Latex>$$R_t$$</Latex>
          is the cashflow of that particular time period , and{' '}
          <Latex>$$i$$</Latex> is the discount rate. The concept of discounting
          future value has been around for along time. The earliest known
          reference was in the 6th century BCE{' '}
          <a href="http://www.aramaic-dem.org/English/History/The%20proverbs%20of%20the%20Aramean%20Ahikar.pdf">
            Proverbs of Ahiqar
          </a>
          :
        </p>
        <blockquote>
          A sparrow in thy hand is better than a thousand sparrows flying
        </blockquote>
        <p>
          You have probably heard a more common version is this, and Warren
          Buffet does a good job of{' '}
          <a href="https://www.youtube.com/watch?v=BP_TUDOYDrg">
            explaining it:
          </a>
        </p>
        <blockquote>
          How many birds are in the bush? When are you going to get them out?
          and how sure are you?
        </blockquote>
        <p>
          Either way, more details on how we can do this will be explained in a
          future article. Below is a knob to change this discount rate. The
          higher the rate, the more unsure you are about the future income. Play
          with both of these knobs to find out how much money will be locked up
          in the ENS username contract over 10 years.
        </p>
        <div ref={this.discountRateRef} />
        <div ref={this.lockedUsdBarRef} />
        <p>
          and all of this gets summed together to give you the following Net
          Present Value of ENS Usernames within Status:
        </p>
        <div className="slide">
          <div ref={this.netPresentUtilityRef} />
        </div>
        <p>
          In other words, after setting all of the above model inputs we have
          finally come to a way of looking at how &quot;impactful&quot; ENS
          usernames are in a single value. This value will become more useful as
          we build out other models for other use cases so we can compare them
          and see relative differences. Eventually, we will be able to see the
          relatively impact a given utility within Status has within the entire
          ecosystem.
        </p>
        <h2>Example Scenario Analysis</h2>
        <p>
          It is also useful to look at how this number changes as we tweak the
          input variables to see their impact. As an example, let&apos;s look at
          what happens if we are able to do something to increase the number
          Status users who actualy register an ENS username (actually currently
          in the works). This is an example of the question we postuated in the
          beginning of this article. The default value is 50%, which leads to a
          Net Present Utility Value of $8,527,197.00 (holding all default values
          constant).
        </p>
        <p>
          What happens if we&apos;re able to increase this number, say, to 75%?
          Keeping all other variables equal, this change alone changes the Net
          Present Utility Value to $12,815,797.00, which is a 50.3% growth and
          would constitute a linear relationship.
        </p>
        <p>
          As another example, let&apos;s look at what happens if we increase our
          yearly growth rate, going from 300% per year to 350% per year. holding
          everything else constant, with a 350% growth rate per year, we come to
          Net Present Utility Value of $24,157,021.00, a 183% growth and would
          constitue a superlinear relatinoship due to the effects of compounding
          growth. Based on these two simple examples, it is clear we should
          spend more time on user acquisition and continuious growth over
          increasing ENS username conversion rates (OR BOTH!).
        </p>
        <p>
          As you can see, by making models of our SNT use-cases, we can start to
          ask questions and get numbers to give us actionable data (assuming a
          decent accuracy of the model). Even if the actual numbers are
          drastically wrong, but the relationships are correct, we can still
          come away with quality information on how we spend our time, money,
          and effort.
        </p>
        <h2>Thoughts and Conclusions</h2>
        <p>
          So what have we learned from all of this? How can we change the model
          to better fit reality? Are their any actionable conclusions around ENS
          usernames that come from this information?
        </p>
        <p>
          As stated previously, this particular use-case and work done lay the
          groundwork to build more complex models of the SNT use-cases. It also
          helps introduce the concept of how different variables affect growth
          and impact over time. If you plan to follow this series and work, we
          suggest making sure you understand each step along the way because all
          of this can get complicated fast.
        </p>
        <p>
          You have probably noticed that the default values for each variable is
          not justified anywhere. This is a problem that we plan to face by
          using historical data to make justified default values. Right now, we
          have a toolset to see what happens when we change variables, but not
          <em> what those variables should be based in reality.</em> These
          workbooks are living documents that will change over time to include
          such work.
        </p>
        <h3>Call to Action</h3>
        <p>
          Our goal is to continuously improve these methods and create more work
          not only around ENS usernames, but with the entire SNT ecosystem. This
          means we would love to get feedback from you, the community. If we
          have done something incorrectly, or you know of some way to better
          model various aspects herein, please join the discussion. We will be
          posting all of these articles in{' '}
          <a href="https://discuss.status.im">our discuss</a> and linking around
          the internet in relevant places.
        </p>
        <h3>Future Improvements</h3>
        <ul>
          <li>probability of failure</li>
          <li>justifications using historical data</li>
          <li>assign variables and create equations for each</li>
        </ul>
      </div>
    );
  }
}

export default hot(App);
