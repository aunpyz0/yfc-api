import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // ------ paymentType ------
    await prisma.paymentType.create({ 
        data: {
            id: 1, 
            name: 'โอน',
        }
    })
    await prisma.paymentType.create({ 
        data: {
            id: 2, 
            name: 'เงินสด',
        }
    })
    await prisma.paymentType.create({ 
        data: {
            id: 3, 
            name: 'เช็ค',
        }
    })

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

    // ------ giveType ------
    await prisma.giveType.create({
        data: {
            id: 1,
            name: 'ถวายรายเดือน'
        }
    })
    await prisma.giveType.create({
        data: {
            id: 2,
            name: 'ของขวัญ'
        }
    })

    // ------ department ------
    await prisma.department.create({
        data: {
            id: 1,
            name: 'BKK'
        }
    })
    await prisma.department.create({
        data: {
            id: 2,
            name: 'CNX'
        }
    })

    // ------ role ------
    await prisma.role.create({
        data: {
            id: 1,
            name: 'STAFF'
        }
    })
    await prisma.role.create({
        data: {
            id: 2,
            name: 'ACCOUNTANT'
        }
    })

    // ------ staff ------
    await prisma.staff.create({
        data: {
            id: 1,
            code: "STAFF001",
            firstname: "ภีระวัฒน์",
            lastname: "พุ่มบัว",
            email: "peerawat@test.com",
            password: "password",
            roleId: 1
        }
    })
    await prisma.staff.create({
        data: {
            id: 2,
            code: "STAFF002",
            firstname: "ผู้รับใช้",
            lastname: "สัตย์ชื่อ",
            email: "honestservant@test.com",
            password: "password",
            roleId: 1
        }
    })
    await prisma.staff.create({
        data: {
            id: 3,
            code: "ACCT001",
            firstname: "ใจงาม",
            lastname: "จริงจริง",
            email: "jaingam@test.com",
            password: "password",
            roleId: 2
        }
    })
    await prisma.staff.create({
        data: {
            id: 4,
            code: "ACCT002",
            firstname: "พนักงานบัญชี",
            lastname: "ตัวจริง",
            email: "realaccountant@test.com",
            password: "password",
            roleId: 2
        }
    })

    // ------ supporter ------
    await prisma.supporter.create({
        data: {
            id: 1,
            code: "SUP001",
            firstname: "รวยสุด",
            lastname: "ในตำบล",
        }
    })
    await prisma.supporter.create({
        data: {
            id: 2,
            code: "SUP002",
            firstname: "โถ",
            lastname: "ทองคำ",
        }
    })
    await prisma.supporter.create({
        data: {
            id: 3,
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
