const secret = process.env.SECRET;
const domain = process.env.DOMAIN;
const salt_rounds = process.env.BCRYPT_SALT_ROUNDS;

module.export = { secret, domain, salt_rounds };
