const faker  = require('faker');

const fake = function() {
    return {
        companyName: faker.company.companyName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        contrAgentname: faker.internet.userName(),
        contrAgentDataFrom: '12.05.2018',
        contrAgentDataTo: '12.06.2018',
        country: faker.address.county(),
        city: faker.address.city(),
        address: faker.address.streetAddress(),
        website: faker.internet.url(),
        comment: faker.lorem.sentences(),
        ogrn: faker.random.number(),
        inn: faker.random.number(),
        date_registration: '13.04.2017',
        KPP: faker.random.number(),
        code_OPF: faker.random.number(),
        code_OKVED: faker.random.alphaNumeric(),
        general_director: faker.internet.userName()
    };
};

module.exports = fake;