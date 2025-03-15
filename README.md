# Directory Tree Challenge

## Description
This is a command-line application that simulates a directory tree. You can create, move, delete, and list directories in a hierarchical structure.

### Design
The directory tree is created starting with a root node. Each node has:
- A name
- A map of its children (other nodes)
- A parent pointer pointing to its parent node

This design allows us to create a scalable directory structure, with operations to:
- **Create** directories at any path
- **Move** directories between paths
- **Delete** directories from the structure
- **List** the current directory tree, displaying its structure

## How to Run

### Assumptions
In this challenge, the input is provided via a file (`input.txt`), which simulates multiple commands being executed in sequence. The program will read each line from the file and perform the corresponding action on the directory tree. Here is an example of the input and expected behavior:

### Example Input (`input.txt`):

### Example Output(`outputDemo.txt`);

### Running the Application

1. **Modify `input.txt`**: Change the contents of the `input.txt` file to include the commands you want to run.

2. **Execute the Application**: Run the following command in the terminal:
```
node src/main.js
```
