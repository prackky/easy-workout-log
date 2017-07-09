# Easy Workout Log

Ewolo front-end. 

Created using React with Redux for state management.

# SEO

Use `react-snapshot` to pre-render the initial html page:
- https://medium.com/superhighfives/an-almost-static-stack-6df0a2791319
- https://medium.freecodecamp.com/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9

Use `"build": "react-scripts build && react-snapshot",` in `package.json`
    
## Development

- Start local server with live-reload: `npm start`
- Start tests and watch for changes: `npm test`
- Count lines of js code: `find . -name '*.js' | xargs wc -l`

## Releases

Dry run: `release-it -n -d`
Release: `release-it`

# License

See [LICENSE](LICENSE)
