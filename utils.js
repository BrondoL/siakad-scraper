const fs = require("fs");

const loadDataMhs = () => {
    const fileBuffer = fs.readFileSync("data/datamahasiswa.json", "utf-8");
    const datamhs = JSON.parse(fileBuffer);
    return datamhs;
};

const simpanDataMhs = (mhs, akt, jlr, fak) => {
    let datamhs = loadDataMhs();
    datamhs = datamhs.concat(mhs);
    fs.writeFileSync(
        "data/datamahasiswa" + akt + jlr + fak + ".json",
        JSON.stringify(datamhs)
    );
    console.log(
        "Berhasil menyimpan data/mahasiswa" + akt + jlr + fak + ".json"
    );
};

module.exports = { simpanDataMhs, loadDataMhs };
