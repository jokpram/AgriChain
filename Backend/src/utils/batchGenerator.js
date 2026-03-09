/**
 * Generates a unique Batch ID in format: AGB-{COMMODITY}-{YYYYMMDD}-{random}
 * Example: AGB-CORN-20260308-4821
 */
const generateBatchCode = (commodityName, harvestDate) => {
    const commodity = commodityName.toUpperCase().replace(/\s+/g, '');
    const date = new Date(harvestDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    const random = Math.floor(1000 + Math.random() * 9000);

    return `AGB-${commodity}-${dateStr}-${random}`;
};

module.exports = { generateBatchCode };
