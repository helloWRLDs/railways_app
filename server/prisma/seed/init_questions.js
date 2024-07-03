const {PrismaClient} = require('@prisma/client')
const client = new PrismaClient()

const main = async() => {
    const questions = [
        {question: "Какой фактор вы считаете самым важным для удовлетворенности сотрудников в нашей компании?", answers: ["Баланс между работой и личной жизнью","Зарплата и льготы","Возможности карьерного роста","Корпоративная культура","Поддержка со стороны руководства"]},
        {question: "Какую корпоративную ценность, по вашему мнению, наша компания должна подчеркивать больше?", answers: ["Инновации","Честность","Командная работа","Ориентированность на клиента","Устойчивое развитие"]},
        {question: "Как часто вы бы хотели проходить тренинги?", answers: ["Ежемесячно","Ежеквартально","Раз в полгода","Ежегодно"]},
        {question: "Какой способ коммуникации для получения новостей компании вы предпочитаете?", answers: ["Электронная почта","Внутренний портал","Собрания компании","Информационные бюллетени","Мессенджеры (например, Slack)"]},
        {question: "Какую меру вы считаете наиболее эффективной для повышения продуктивности на рабочем месте?", answers: ["Улучшение рабочих условий","Внедрение современных технологий","Повышение квалификации сотрудников","Оптимизация рабочих процессов","Гибкий график работы"]},
        {question: "Какой аспект корпоративной культуры вы считаете наиболее важным?", answers: ["Взаимное уважение","Прозрачность и честность","Ориентированность на результат","Поддержка инноваций","Развитие сотрудников"]},
        {question: "Какие типы мероприятий для сотрудников вы предпочитаете?", answers: ["Спортивные мероприятия","Тренинги и семинары","Корпоративные вечеринки","Тимбилдинг","Виртуальные мероприятия"]},
        {question: "Какую стратегию вы считаете наиболее важной для устойчивого развития компании?", answers: ["Инвестирование в инновации","Расширение рынка сбыта","Сокращение издержек","Укрепление отношений с клиентами","Повышение квалификации сотрудников"]},
        {question: "Какой фактор вы считаете самым важным при выборе нового сотрудника?", answers: ["Опыт работы","Образование","Навыки и компетенции","Соответствие корпоративной культуре","Рекомендации"]},
        {question: "Как вы предпочитаете решать конфликты на рабочем месте?", answers: ["Непосредственно обсуждать с участниками конфликта","Обратиться к руководителю или HR","Искать компромиссное решение","Использовать посредника для разрешения конфликта","Избегать конфликтных ситуаций"]}
    ]
    questions.forEach((elem) => {
        client.question.create({data: {question: elem.question, answers: elem.answers}})
            .then((res) => console.log(res))
            .catch((e) => console.error(e))
    })
}

main()
    .then(async() => {
        await client.$disconnect()
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })