const calculatePoints = (predHome, predAway, realHome, realAway) => {
    if (predHome === realHome && predAway === realAway) return 3;
    const predDiff = predHome - predAway;
    const realDiff = realHome - realAway;
    if (Math.sign(predDiff) === Math.sign(realDiff)) return 1;
    return 0;
};

export { calculatePoints };
