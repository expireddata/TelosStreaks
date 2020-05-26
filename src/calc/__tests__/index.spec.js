import { killChance } from "../";

test('killChance conforms to known drop rates without lotd', () => { 
    const kc = (enr, str) => Math.floor(killChance(false)(enr, str));

    expect(kc(100, 1)).toBe(263);
    expect(kc(500, 1)).toBe(72); 
    expect(kc(200, 5)).toBe(133); 
    expect(kc(999, 1)).toBe(38); 
    expect(kc(1024, 1)).toBe(37);
});

test('lotd increases DR', () => { 
    const samples = new Array(20).map(x => [Math.floor(Math.random() * 4001), Math.floor(Math.random() * 101)]);

    samples.forEach(sample => expect(killChance(false)(...sample) < killChance(true)(...sample)));
}); 

