// <?php
// function​ get_emails​($input)
// {
//     $id = $input['id'];
//     $conn = dbConnect();
//     $q = 'select id_em_emails,email,verified,preferred from em_emails where
//     id_em_users=?';
//     $res = ExecSqlStmt($conn, $q, ['i'], [$id]);
//     if​ ($res === false​) {
//     dbDisconnect($conn);
//     ErrorExit(90);
//     exit​(1);
//     }
//     $emails = array​();
//     while​ ($row = mysqli_fetch_assoc($res)) {
//     $emails[] = $row;
//     }
//     dbDisconnect($conn);
//     $a = array​();
//     $a['retcode'] = 0;
//     $a['emails'] = $emails;
//     return $a;
// }

import { Connection, Request } from "mssql";

const dbConfig = {
    server: "localhost\\SQL2K14",
    database: "Some DB",
    user: "username",
    password: "password",
    port: 1433
}

const getEmails = (input) => {
    const id = input.id;
    const conn = new Connection(dbConfig);
    const emailList;

    conn.connect().then(() => {
        var req = new Request(conn);
        req.query("SELECT id_em_emails, email, verified, preferred FROM em_emails WHERE id_em_users = ?").then(function (emails) {
            emailList = {emails, retcode: 0};
            conn.close();
        })
        .catch(err => {
            console.error(err);
            conn.close();
        });        
    })
    .catch(err => {
        console.error(err);
    });
    return emailList;
};


getEmails();