# UW DevBlog

## To install

### install submodules

    git submodule update --init --recursive

### install the Node modules (assumes Node has been installed on your machine)

    npm install

## To run your local server
    jekyll serve --watch
Then visit http://localhost:4000

## To edit and recompile the LESS and JS files:
Edit the CSS and JS files located in the _assets directory.

### To recompile, run:
    grunt 

### To recompile as you edit these files, run:
    grunt watch

