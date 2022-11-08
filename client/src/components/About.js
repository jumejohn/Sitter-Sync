import React from "react";

const About = () => {
  return (
    <article className="w-100 p-3">
      <div className="whitespace-container ">
        <h1 className="welcome-tagline">What is Sitter-Synced?</h1>
        <div className="content-box w-75 p-3">
          <p>
            What is the most annoying thing about inviting someone to watch your
            loved ones? Let's be honest, there isn't just one, there are several
            things that are difficult:
          </p>
          <ul>
            <li>
              writing a list of things that the sitter needs to know each time
              you go out...
            </li>
            <li>
              communicating important things like medications or food
              restrictions...
            </li>
            <li>knowing that things are being done while you are gone...</li>
          </ul>

          <p>Sitter Synced is all about making these things easier.</p>
          <p>
            Using Sitter Synced, you can set a new babysitting event, add all
            relevant information, and even set the event to your Google
            Calendar.(coming soon...)
          </p>
          <p>
            This event can then be sent to your babysitter, giving them all the
            relevant information.
          </p>

          <p>
            Set up a list as well allowing your sitter to clear tasks as they
            happen. No more do you need to worry about if your kid go their
            meds, or if the dog got fed on time.
          </p>
          <p>
            Set everything right here, and all the information is passed and
            available to the babysitter. Your sitter can update the checklist
            throughout your time away.
          </p>
        </div>
      </div>
    </article>
  );
};

export default About;
