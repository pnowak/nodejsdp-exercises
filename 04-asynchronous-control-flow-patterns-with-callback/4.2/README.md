# 4.2 List files recursively:

Write `listNestedFiles()`, a callback-style function that takes, as an input, 
the path to a directory in the local filesystem and
that asynchronously iterates over all the subdirectories to eventually return
a list of all the files discovered. 
Here is what the signature of the function should look like:
````
function listNestedFiles(dir, cb) {}
````

Feel free to create additional helper function if needed.