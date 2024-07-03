const {PrismaClient} = require('@prisma/client')
const client = new PrismaClient()

const main = async() => {
    const res = await client.user.create({data: {
        first_name: "Danil",
        last_name: "Li",
        email: "danil.li24x@gmail.com",
        username: "lIlllIIIlIIIlIIIl",
        chat_id: "819151572"
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