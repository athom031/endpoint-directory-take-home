const fs  = require('fs');
const readline = require('readline');

// we have built a directory class to create a directory tree of nodes
const Directory = require('./directory');

// get list of comamdns from input.txt
const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false
});

const directory = new Directory();

rl.on('line', (line) => {
    const parts = line.trim().split(' ');

    switch(parts[0]) {
        case 'CREATE':
            const createPath = parts.slice(1).join(' ');
            console.log(`CREATE ${createPath}`);
            directory.create(createPath);
            break;
        
        case 'LIST':
            console.log('LIST');
            directory.list();
            break;
        
        case 'MOVE': 
            const [from, to] = parts.slice(1);  
            console.log(`MOVE ${from} ${to}`);
            directory.move(from, to);
            break;
        
        case 'DELETE':
            const deletePath = parts.slice(1).join(' ');
            console.log(`DELETE ${deletePath}`);
            directory.delete(deletePath);
            break;
        
        default:
            console.error('Invalid command');
    }
});

// need to handle end of input
rl.on('close', () => {
    // do nothing
});