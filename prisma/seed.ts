import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const cost = 12
const prisma = new PrismaClient()

async function main() {
    // ------ bank ------
    await prisma.bank.create({ 
        data: {
            id: 1,
            name: 'SCB',
        },
    })
    await prisma.bank.create({ 
        data: {
            id: 2,
            name: 'KTB',
        },
    })
    await prisma.bank.create({ 
        data: {
            id: 3,
            name: 'KBTG',
        },
    })
    await prisma.bank.create({ 
        data: {
            id: 4,
            name: 'BBL',
        },
    })
    await prisma.bank.create({ 
        data: {
            id: 5,
            name: 'TMB',
        },
    })
    await prisma.bank.create({ 
        data: {
            id: 6,
            name: 'GBP',
        },
    })

    // ------ yfc bank ------
    await prisma.yFCBank.create({ 
        data: {
            id: 1,
            name: 'YFC SCB',
            accountNo: '123-4-12313',
        },
    })

    await prisma.yFCBank.create({ 
        data: {
            id: 2,
            name: 'YFC SCB 2',
            accountNo: '542-3-13414',
        },
    })

    // ------ staff ------
    await prisma.staff.create({
        data: {
            code: "STAFF001",
            firstname: "นายหนึ่ง",
            lastname: "ในซอย",
            email: "staff1@test.com",
            password: bcrypt.hashSync("password", cost),
            role: Role.STAFF,
        }
    })
    await prisma.staff.create({
        data: {
            code: "STAFF002",
            firstname: "นายสอง",
            lastname: "คองแคง",
            email: "staff2@test.com",
            password: bcrypt.hashSync("password", cost),
            role: Role.STAFF,
        }
    })
    await prisma.staff.create({
        data: {
            code: "ACCT001",
            firstname: "นายสาม",
            lastname: "หาว",
            email: "acct1@test.com",
            password: bcrypt.hashSync("password", cost),
            role: Role.ACCOUNTANT,
        }
    })
    await prisma.staff.create({
        data: {
            code: "ACCT002",
            firstname: "นายสี่",
            lastname: "ปีลิง",
            email: "acct2@test.com",
            password: bcrypt.hashSync("password", cost),
            role: Role.ACCOUNTANT,
        }
    })

    // ------ supporter ------
    await prisma.supporter.create({
        data: {
            code: "SUP001",
            firstname: "รวยสุด",
            lastname: "ในตำบล",
        }
    })
    await prisma.supporter.create({
        data: {
            code: "SUP002",
            firstname: "โถ",
            lastname: "ทองคำ",
        }
    })
    await prisma.supporter.create({
        data: {
            code: "SUP003",
            firstname: "ชอบถวาย",
            lastname: "รายเดือน",
        }
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })
