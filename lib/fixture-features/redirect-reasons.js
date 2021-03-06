/** @typedef {import('../model/Fixture.js').default} Fixture */

// see https://github.com/standard-things/esm#getting-started
require = require(`esm`)(module); // eslint-disable-line no-global-assign

const register = require(`../../fixtures/register.json`);

const schemaProperties = require(`../../lib/schema-properties.js`).default;

/** @type {Array.<String>} */
const redirectReasons = schemaProperties.fixtureRedirect.reason.enum;

module.exports = redirectReasons.map(reason => ({
  id: `redirect-reason-${reason}`,
  name: `Fixture redirect reason ${reason}`,
  description: `Whether the fixture is a fixture redirect with reason '${reason}'`,

  /**
   * @param {Fixture} fixture The Fixture instance
   * @returns {Boolean} true if the fixture is a fixture redirect with the current reason
   */
  hasFeature: fixture => {
    const manufacturerFixture = `${fixture.manufacturer.key}/${fixture.key}`;
    const registerItem = register.filesystem[manufacturerFixture];
    return `redirectTo` in registerItem && registerItem.reason === reason;
  },
}));
