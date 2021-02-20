import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // ------ paymentType ------
    await prisma.paymentType.create({ 
        data: {
            name: 'โอน',
        }
    })
    await prisma.paymentType.create({ 
        data: {
            name: 'เงินสด',
        }
    })
    await prisma.paymentType.create({ 
        data: {
            name: 'เช็ค',
        }
    })

    // ------ bank ------
    await prisma.bank.create({ 
        data: {
            name: 'SCB',
        },
    })
    await prisma.bank.create({ 
        data: {
            name: 'KTB',
        },
    })
    await prisma.bank.create({ 
        data: {
            name: 'KBTG',
        },
    })
    await prisma.bank.create({ 
        data: {
            name: 'BBL',
        },
    })
    await prisma.bank.create({ 
        data: {
            name: 'TMB',
        },
    })
    await prisma.bank.create({ 
        data: {
            name: 'GBP',
        },
    })

    // ------ giveType ------
    await prisma.giveType.create({
        data: {
            name: 'ถวายรายเดือน'
        }
    })
    await prisma.giveType.create({
        data: {
            name: 'ของขวัญ'
        }
    })

    // ------ department ------
    await prisma.department.create({
        data: {
            name: 'BKK'
        }
    })
    await prisma.department.create({
        data: {
            name: 'CNX'
        }
    })

    // ------ role ------
    await prisma.role.create({
        data: {
            name: 'STAFF'
        }
    })
    await prisma.role.create({
        data: {
            name: 'ACCOUNTANT'
        }
    })

    // ------ staff ------
    await prisma.staff.create({
        data: {
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
