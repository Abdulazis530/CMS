const bcrypt = require('bcrypt');
const saltRounds = 10;


const hashingPass = async (myPlaintextPassword) => {
    const hashPass = await bcrypt.hash(myPlaintextPassword, saltRounds)
    console.log(hashPass)
}

hashingPass('12345')