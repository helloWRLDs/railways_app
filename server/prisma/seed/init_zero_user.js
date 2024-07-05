const {PrismaClient, Role} = require('@prisma/client')
const bcrypt = require('bcrypt')
const client = new PrismaClient()

const main = async() => {
    const res = await client.user.create({data: {
        first_name: "Danil",
        last_name: "Li",
        email: "danil.li24x@gmail.com",
        username: "lIlllIIIlIIIlIIIl",
        password: await bcrypt.hash("12345", 10),
        chat_id: "819151572",
        role: Role.ADMIN
    }})
    console.log(res)
}

main()
    .then(async() => {
        await client.$disconnect()
    })
    .catch(async(e) => {
        console.error(e)
        await client.$disconnect()
        process.exit(1)
    })