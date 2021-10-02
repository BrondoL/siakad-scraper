angkatan = [x for x in range(16, 22)]
jalur = [x for x in range(1, 7)]
fakultas = [x for x in range(1, 9)]
jurusan = ["{:02d}".format(x) for x in range(1, 27)]
prodi = [x for x in range(1, 7)]
nomor = ["{:03d}".format(x) for x in range(1, 501)]
for i in angkatan:
    for j in jalur:
        for k in fakultas:
            for l in jurusan:
                for m in nomor:
                    print(f"{i}{j}{k}{l}1{m}")
