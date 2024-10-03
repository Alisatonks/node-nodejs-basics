const parseArgs = () => {
    const args = process.argv.slice(2);
    console.log('args', args);

    const correctArgs = args.reduce((acc, curr, idx) => {

        if(curr.startsWith('--')) {
            acc.push(`${curr.slice(2)} is ${args[idx + 1]}`)
        }
       
        return acc;
    }, []);

    const result = correctArgs.join(', ').trim();

    console.log(result)
};

parseArgs();