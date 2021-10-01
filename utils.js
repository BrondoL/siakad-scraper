const fs = require("fs");

const loadDataMhs = () => {
    const fileBuffer = fs.readFileSync("data/datamahasiswa.json", "utf-8");
    const datamhs = JSON.parse(fileBuffer);
    return datamhs;
};

const simpanDataMhs = (mhs) => {
    let datamhs = loadDataMhs();
    datamhs = datamhs.concat(mhs);
    fs.writeFileSync("data/datamahasiswa.json", JSON.stringify(datamhs));
};

module.exports = { simpanDataMhs, loadDataMhs };
