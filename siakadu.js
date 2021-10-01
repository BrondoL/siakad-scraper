const axios = require("axios");
const cheerio = require("cheerio");
const { simpanDataMhs, loadDataMhs } = require("./utils");
const https = require("https");

const agent = new https.Agent({
    rejectUnauthorized: false,
});

let data = [];
let tmp = {};
let mahasiswa = [];
let npm = "";

const getData = async () => {
    for (let angkatan = 18; angkatan <= 18; angkatan++) {
        for (let jalur = 1; jalur <= 6; jalur++) {
            for (let fakultas = 7; fakultas <= 7; fakultas++) {
                for (let jurusan = 5; jurusan <= 5; jurusan++) {
                    for (let nomor = 1; nomor <= 500; nomor++) {
                        npm =
                            angkatan.toString() +
                            jalur.toString() +
                            fakultas.toString() +
                            jurusan.toString().padStart(2, "0") +
                            "1" +
                            nomor.toString().padStart(3, "0");
                        await axios
                            .get(
                                "https://siakadu.unila.ac.id/siakad/list_sertifikat/" +
                                    npm,
                                {
                                    httpsAgent: agent,
                                    headers: {
                                        Cookie: "SIAKAD_CLOUD_ACCESS_UNILA=01f0895u8tunvt22c39e34qk55",
                                    },
                                }
                            )
                            .then((res) => {
                                if (res.status === 200) {
                                    let html = res.data;
                                    let $ = cheerio.load(html);
                                    $(".callout.callout-info")
                                        .children(".row")
                                        .each(function () {
                                            $(this)
                                                .children()
                                                .each(function () {
                                                    data.push($(this).text());
                                                });
                                        });
                                    tmp = {
                                        npm: data[1],
                                        nama: data[3],
                                        status: data[5],
                                        prodi: data[7],
                                        angkatan: data[9],
                                        pa: data[11],
                                        thkur: data[13],
                                        ipk: data[15],
                                        foto:
                                            "https://siakadu.unila.ac.id" +
                                            $(".list-unstyled.profile-nav")
                                                .find("img")
                                                .attr("src"),
                                    };
                                    if (tmp.status == "Aktif") {
                                        console.log(tmp);
                                        mahasiswa.push(tmp);
                                    }
                                    data = [];
                                }
                            })
                            .catch((err) => console.log(err));

                        if (tmp.npm == "") {
                            console.log(npm);
                            break;
                        }
                    }
                }
            }
        }
    }

    console.log("Selesai");
    return mahasiswa;
};

const hasil = getData();
hasil.then((v) => {
    simpanDataMhs(v);
});
