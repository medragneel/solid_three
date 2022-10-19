const hex = () => `#${Math.floor(Math.random() * 0xfffff).toString(16).padEnd(6,'0') }`
console.log(hex())
