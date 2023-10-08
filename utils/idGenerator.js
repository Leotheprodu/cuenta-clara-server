const idGenerator = () => {
    const a = Date.now().toString(30);
    const b = Math.random().toString(30).substring(2);
    return a + b;
};

module.exports = idGenerator;
