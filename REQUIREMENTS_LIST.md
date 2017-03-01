Requirements List

**a. Assigned one (1) leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted**
> Aaron Cripps, Product Owner

**b. Assembled a multidisciplinary and collaborative team that includes, at a minimum, five (5) of the labor categories as identified in Attachment B: PQVP DS-AD Labor Category Descriptions**
> The majority of the team is based in the San Francisco Bay Area. One member is in Tucson AZ, one member in Little Rock AR. Our team collaborates using tools like Slack, Google Hangouts, Screen Hero, GoToMeeting, and Google Docs. 
* Product Manager - Aaron Cripps
* Technical Architect - Sasha Voynow, Matt Wilson
* Interaction Designer - Dean Baker, Clayton Hopkins
* Visual Designer - Jim Ochsenreiter
* Front End Web Developer - Adam Ducker, Jeffrey Carl Faden
* Backend Web Developer - Sasha Voynow
* DevOps Engineer - Brien Wankel, Dave O’Dell

**c. Understood what people needed, by including people in the prototype development and design process**
> Informed by our initial persona attributes, we found three individuals whose job activities aligned with or related to the Lead Purchasing Organization Administration and State Agency IT Requester roles. 
* [Dennis Baker](https://github.com/labzero/adpq/blob/develop/docs/interviews/Interview1.1DennisBaker-StateAssemblyReprographicsManager.pdf), State of California Assembly Reprographics Manager
* [Robert Lee](https://github.com/labzero/adpq/blob/develop/docs/interviews/Interview2.1RobertLee-StartupOfficeManager.pdf), Startup Office Manager
* [Ned Holets](https://github.com/labzero/adpq/blob/develop/docs/interviews/Interview3.1NedHolets-CMSDeveloper.pdf), Lead Software Engineer who has worked on CMS projects

**d. Used at least a minimum of three (3) “user-centric design” techniques and/or tools**
> Human-centered design is a core aspect of our process. You can find a richer explanation of our processes here. Key examples listed below:
* Customer Development activities
  * Stating and prioritizing learning goals (hypotheses)
  * Open-ended interviews with people who met our target personas to understand their needs and goals
* In-person usability testing to validate solution ideas/hypotheses
  * Clickable prototypes to support usability testing
  * ‘Think aloud’ qualitative user test of prototype
  * Accessibility test
* Leveraging existing usability research 
  * Baymard Institute, an ecommerce usability research firm whose methodology includes qualitative ‘Think aloud’ protocol and large scale eye-tracking study.

**e. Used GitHub to document code commits**
> Yes, we’ve used Github fully for peer-review and as our sole code repository.

**f. Used Swagger to document the RESTful API, and provided a link to the Swagger API**
> Yes, we’ve have implemented Swagger, you can view it [here](http://petstore.swagger.io/?url=http://staging.adpq.labzero.com/api/swagger_docs)

**g. Complied with Section 508 of the Americans with Disabilities Act and WCAG 2.0**
> Yes, we have used HTML and CSS in a manner that complies with the ADA and WCAG 2.0

**h. Created or used a design style guide and/or a pattern library**
* We utilized the US Web Design Standards for user experience, visual design and responsive guidelines and patterns.
* We leveraged the Baymard Institute’s research-based user interaction guidelines for eCommerce product lists, homepages and checkout.

**i. Performed usability tests with people**
> We showed functional prototypes to the following individuals facilitated by a “Think Aloud” qualitative user test.
* Robert Lee
* Tracey Thompson

**j. Used an iterative approach, where feedback informed subsequent work or versions of the prototype**
> We began by clarifying the business case and target outcomes without proposing solutions. This empowers each team member to bring their expertise and creativity into the solutions which are iteratively built and tested. Learnings from test are fed back into subsequent iterations.
* Product Owner led goal-oriented kickoff and drafted a first version of the “Speclet” to align and hold the team accountable to high-level key outcomes and measurements. 
* Key learnings from user interviews informed the project summary, goals, and measurements and allowed us to apply improvements to our designs and development.
* Team story time for formal technical review of prioritized backlog. Development feedback assisted in clarifying prototype behavior and story decomposition.
* Validated design concepts through clickable prototypes with people outside the team. User feedback informed backlog grooming (through prioritization) and design iterations. 
* Presented design, development, and product ideas to the full team frequently to inform final deliverables through daily standups and conversations.
* Utilized Scrum framework for frequent and agile inspection and adaptation
  * Product Owner managed a prioritized backlog of tasks for Design & Development
  * Daily standup
  * Weekly sprints: team performed demos and retrospectives

**k. Created a prototype that works on multiple devices, and presents a responsive design**
> Our prototype has been designed, developed and tested to work on desktop browsers, iOS and Android phones as well as screen readers.

## l. Used at least five (5) modern and open-source technologies, regardless of architectural layer (frontend, backend, etc.)
>We utilized many modern open-source technologies:
* Elixir
* Phoenix Framework 
* Ecto (data layer)
* React.js
* Docker
* SASS
* Javascript/ES6
* REST

**m. Deployed the prototype on an Infrastructure as a Service (IaaS) or Platform as Service (PaaS) provider, and indicated which provider they used**
> Our prototype has been deployed to AWS as a Docker container running in ECS using RDS for it’s datastore. 

**n. Developed automated unit tests for their code**
> The Engineering Team delivered stories with working code and some level of automated testing. All tests are run in the continuous integration loop with each. 
* Javascript we wrote Jest tests (link)
* Elixir we wrote ExUnit tests (link)

**o. Setup or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider**
> Our use of a CI server drives automated tests and our deployment pipeline. All new pull requests are tested. We used CircleCI to automate our CI and CD automation. 

**p. Setup or used configuration management**
> We generate CloudFormation templates and build Docker containers, adhering to a https://12factor.net/ approach.

**q. Setup or used continuous monitoring**
> We setup Honeybadger.io for error reporting and Pingdom for uptime monitoring. 

**r. Deployed their software in an open source container, such as Docker (i.e., utilized operating-system-level virtualization)**
> We build Docker containers in our CI/CD process and deploy them to ECR/ECS in AWS.

**s. Provided sufficient documentation to install and run their prototype on another machine**
> Please see the SETUP.md file in root directory of this repository. All engineers used these steps to set up their development environments. 

**t. Prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge**
> All systems used to create and run the prototype are open source and free of charge for use. Our prototype carries an MIT license as well.
