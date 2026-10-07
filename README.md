# ChemPrep Flashcards

ChemPrep is a mobile-responsive flashcard app for revising 12th-standard Chemistry. It turns quick study sessions into active recall: choose a topic, think through a question, flip the card to check the answer and study tip, then mark whether you have mastered it or need to review it again.

The project was built for the [AWS Weekend Deployment Challenge](https://builder.aws.com/content/3ImV0HKO7WValhPlbipjatYcFpc/weekend-deployment-challenge-chemprep-flashcards).

**Live demo:** [ChemPrep Flashcards](https://staging.d37xpod8deyzfv.amplifyapp.com/)

## Features

- Review Chemistry flashcards across topics including Solutions, Electrochemistry, Chemical Kinetics, Coordination Compounds, and Organic Chemistry.
- Filter cards by topic, move between cards, and shuffle the deck.
- Flip each card to reveal its answer and a short study tip.
- Mark cards as mastered or needing review; these counts are saved in the browser's local storage.
- Use the keyboard to flip cards with Space and navigate with the arrow keys.
- Study on mobile or desktop layouts.

## Built with

- React for the interface and application state
- Vite for local development and production builds
- CSS for responsive styling
- AWS Amplify Hosting for static site delivery

## Run locally

Requires Node.js and npm. From the project directory:

```sh
npm ci
npm run dev
```

Vite will print a local URL when the development server starts.

To create and preview a production build:

```sh
npm run build
npm run preview
```

## Deployment and architecture

ChemPrep is a static frontend hosted by AWS Amplify; it does not require an application server or EC2 instance. For the challenge deployment, I built the app locally with Vite, packaged the contents of the generated `dist` directory so `index.html` sits at the archive root, and uploaded the archive using Amplify's manual **Deploy without Git** flow. Amplify distributes the static files and provides the hosted endpoint.

The repository also includes an `amplify.yml` build specification for builds that use Amplify's connected-repository workflow. It installs dependencies with `npm ci`, runs `npm run build`, and publishes `dist`.

## What I learned

- For manual static-site uploads, the archive needs the built site's files at its root, including `index.html`, rather than an extra enclosing directory.
- A static hosting service can publish a small frontend without setting up and maintaining a traditional web server.
- Keeping the project focused made it possible to build and deploy a useful app within the weekend challenge.

## Notes

Flashcard content is bundled with the app, and study progress is stored in the current browser. The app does not currently use accounts or sync progress between devices.
