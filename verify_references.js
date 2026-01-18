const { sequelize } = require('./src/models');
const models = sequelize.models;

async function verify() {
    console.log('Verifying references...');
    let errors = 0;

    // specialized map to handle the case where references might use the table name directly
    const tableNames = new Set();
    Object.values(models).forEach(m => tableNames.add(m.tableName));

    console.log('Known table names:', Array.from(tableNames).join(', '));

    for (const modelName in models) {
        const model = models[modelName];
        for (const attrName in model.rawAttributes) {
            const attr = model.attributes[attrName];
            if (attr.references) {
                let refTable = attr.references.model;
                // references.model can be a string or model. 
                // In rawAttributes/attributes it usually normalizes to table name if string was passed?
                // Actually Sequelize might keep what was passed or normalize it. 
                // Let's print what we find.

                if (typeof refTable !== 'string') {
                    // It might be a model object, get its tableName
                    if (refTable.tableName) refTable = refTable.tableName;
                }

                if (!tableNames.has(refTable)) {
                    console.error(`[MISMATCH] Model: ${modelName}, Field: ${attrName}, References: '${refTable}' NOT FOUND in known table names.`);
                    errors++;
                } else {
                    // console.log(`[OK] Model: ${modelName}, Field: ${attrName} -> ${refTable}`);
                }
            }
        }
    }

    if (errors === 0) {
        console.log('All references match known table names!');
    } else {
        console.log(`Found ${errors} mismatches.`);
    }
    process.exit(0);
}

verify().catch(err => {
    console.error(err);
    process.exit(1);
});
