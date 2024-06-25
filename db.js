import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'activity-register.c12eqiqaca40.us-east-2.rds.amazonaws.com',
    database: 'db_activity_logs',
    user: 'jairo',
    password: '1234566789'
});

export const connectSQL = () => {
    connection.connect((error)=>{
        console.log(error ? 'Error' : 'Conectado')
    })
}

export const validSession = (username, password, callback) => {
    const sqlQuery = `SELECT * FROM user WHERE username='${username}'  AND password='${password}'`;
    connection.query(sqlQuery, callback);
}

export const getActivitiesByUser = (userId, callback) => {
    const sqlQuery = `SELECT * FROM activityLog WHERE id_user=${userId}`;
    connection.query(sqlQuery, callback);
}

export const setNewActivitiesByUser = (activityInfo, callback) => {
    const sqlQuery = `INSERT INTO activityLog (\`id_user\`, \`activity\`, \`description\`, \`time\`, \`date\`) 
                    VALUES ('${activityInfo?.userId.toString()}', '${activityInfo?.activity}', '${activityInfo?.description}', '${activityInfo?.time}', '${activityInfo?.date}')`;
    connection.query(sqlQuery, callback);
}