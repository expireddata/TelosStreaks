const TRIAL_NUMBER = 10000; //sample accuracy for streaks

const killChance = (lotd) => (enrage, streak) => 10000 / (10 + 0.25 * (enrage + 25*lotd) + 3 * streak);

const enrIncrease = () => { 
    const cumProbs = [[0.012,5], [0.104, 8], [0.226, 9], [0.474, 10], [0.623, 11], [0.72, 12], [0.805, 13], [0.867, 14], [0.915, 15], [0.942, 16], [0.960, 17], [0.977, 18], [0.99, 19], [1, 20]];

    const roll = Math.random();

    return cumProbs.find(x => roll <= x[0])[1];
}

const streakChance = (start, end, lotd) => { 
    let sumP = 0.0; 
    const rollKill = killChance(lotd);
    let sumKills = 0; 
    for(let trials = 0; trials < TRIAL_NUMBER; trials++) { 
        let p = 1.0; 
        let streak = 0;
        for(let current = start; current <= end; current += enrIncrease()) { 
            let divisor = rollKill(current, ++streak); 
            
            if(current < 100) {
                divisor *= 10; //Silver tier or lower
            } 
            
            if (current < 25) { 
                divisor *= 3; //Bronze tier
            }

            let killP = 1 - (1 / Math.floor(divisor)); 
            p *= killP; 
            sumKills++;
        }

        sumP += p; 
    }

    return {p: 1 - (sumP / TRIAL_NUMBER), perKill: 1 / (1 - Math.pow((sumP / TRIAL_NUMBER), TRIAL_NUMBER / sumKills)) };
}

export { killChance, enrIncrease, streakChance }