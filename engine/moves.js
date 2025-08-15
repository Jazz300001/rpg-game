export const meleeMoves = [
    { name: "Slash", power: 15, type: "melee", element: "none" },
    { name: "Pierce", power: 18, type: "melee", element: "none" },
    { name: "Heavy Swing", power: 25, type: "melee", element: "none" },
    {name: "FUCK", power: 45, type: "melee", element: "none" },
];

export const magicMoves = [
    { name: "Fireball", power: 25, cost: 5, type: "magic", element: "fire" },
    { name: "Ice Spike", power: 20, cost: 4, type: "magic", element: "ice" },
    { name: "Lightning Bolt", power: 30, cost: 6, type: "magic", element: "electric" },
    {name: "SDIYBT", power:45, cost:9, type: "magic", element: "brainrot" },
];

export const allMoves = [...meleeMoves, ...magicMoves];