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
            firstname: "สตาฟหนึ่ง",
            lastname: "สตาฟหนึ่ง",
            email: "staff1@test.com",
            password: bcrypt.hashSync("password", cost),
            role: Role.STAFF,
        }
    })
    await prisma.staff.create({
        data: {
            code: "STAFF002",
            firstname: "สตาฟสอง",
            lastname: "สตาฟสอง",
            email: "staff2@test.com",
            password: bcrypt.hashSync("password", cost),
            role: Role.STAFF,
        }
    })
    await prisma.staff.create({
        data: {
            code: "ACCT001",
            firstname: "บัญชีหนึ่ง",
            lastname: "บัญชีหนึ่ง",
            email: "acct1@test.com",
            password: bcrypt.hashSync("password", cost),
            role: Role.ACCOUNTANT,
        }
    })
    await prisma.staff.create({
        data: {
            code: "ACCT002",
            firstname: "บัญชีสอง",
            lastname: "บัญชีสอง",
            email: "acct2@test.com",
            password: bcrypt.hashSync("password", cost),
            role: Role.ACCOUNTANT,
        }
    })

    // ------ supporter ------
    await prisma.supporter.create({
        data: {
            code: "SUP001",
            firstname: "ผู้ถวายหนึ่ง",
            lastname: "ผู้ถวายหนึ่ง",
        }
    })
    await prisma.supporter.create({
        data: {
            code: "SUP002",
            firstname: "ผู้ถวายสอง",
            lastname: "ผู้ถวายสอง",
        }
    })
    await prisma.supporter.create({
        data: {
            code: "SUP003",
            firstname: "ผู้ถวายสาม",
            lastname: "ผู้ถวายสาม",
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
