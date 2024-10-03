const parseEnv = () => {
    const envsAll = process.env;
    
    const envsRSS = Object.entries(envsAll).reduce((acc, [key, value]) => {
        if (key.startsWith('RSS_')) {
            acc += `${key}=${value}; `
        }
        return acc; 
    }, '');

    const result = envsRSS.trim()

    console.log(result)
};

parseEnv();