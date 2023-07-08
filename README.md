vite-plugin-react-pages (vite-pages) is a React app framework powered by vite. It is very suitable for:

blog site
documentation site for your library or product
stories/demos/playgrounds for your React components or libraries (like storybook)

It provides many features that help developers build a React App quickly:

Fantastic development experience. Start the local development server in a blink, even when you have many pages. Hot module replacement works with React and Mdx, so you can get instant feedback when you edit your code.
Filesystem based routing. By following a simple filesystem routing convention, It is easy to create, locate and develop pages. You don't need to worry about routing configuration. For advanced users, you can tell vite-pages how to find page files, so that vite-pages can work with any project file structure.
Support Mdx. You can write content with either "normal React" or Mdx. Normal Reactjs is more flexible and composable. While Mdx is more readable and easier to edit. You can choose the proper format for your task. These formats can import each other like normal esModules.
Powerful theme customization. Vite-pages itself doesn't render any concrete DOM node. You can customize anything on the page with theme. It is easy to write a theme that is sharable and configurable. If you use typescript, the users of your theme will get type-check and intelliSense.
Automatic code splitting based on pages. Visitors don't need to download the whole app, they only load page data as needed.
Support static site generation out of the box. By pre-rendering your app into HTML at buildtime, users can see the content before any JS is loaded. With this feature, you can deploy your single page apps on GitHub Pages(which doesn't natively support single page apps).
Tools for Library documentation. Vite-pages provides some tools to reduce the maintenance costs for library authors and make their documents more easily to read.

Initialize a demo project locally

First clone the project then follow the below steps to run the project:

Steps :

npm install
npm run dev and play with the local dev environment.