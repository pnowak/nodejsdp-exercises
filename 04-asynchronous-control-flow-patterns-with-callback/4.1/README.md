# 4.1 File concatenation:

Write the implementation of `concatFiles()`, a callback-style function that takes
two or more paths to text files in the filesystem and a destiantion file.
This function must copy the contents of every source file into the destination file, 
respecting the order of the files, as provided by the arguments list. 
For instance, given two files, if the first file contains `foo` and the second
file contains `bar`,
the function should write `foobar` (and not `barfoo`) in the destination file.