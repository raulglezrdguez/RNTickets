import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'tickets.db',
    location: 'default',
    createFromLocation: 1, //'~www/tickets.db',
  },
  () => {
    console.log('db tickets opened');
  },
  error => {
    console.log(error);
  },
);

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tickets (id INTEGER PRIMARY KEY NOT NULL,name TEXT NOT NULL,phone TEXT NOT NULL,dday TEXT NOT NULL,address TEXT NOT NULL,dnotes TEXT NOT NULL,dclass TEXT NOT NULL,stype TEXT NOT NULL,reason TEXT NOT NULL,tnumber TEXT NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const insertTicket = (
  name,
  phone,
  dday,
  address,
  dnotes,
  dclass,
  stype,
  reason,
  tnumber,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tickets (name, phone, dday, address, dnotes, dclass, stype, reason, tnumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [name, phone, dday, address, dnotes, dclass, stype, reason, tnumber],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updateTicket = (
  id,
  name,
  phone,
  dday,
  address,
  dnotes,
  dclass,
  stype,
  reason,
  tnumber,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tickets SET name=?, phone=?, dday=?, address=?, dnotes=?, dclass=?, stype=?, reason=?, tnumber=?) WHERE id=?;',
        [
          name,
          phone,
          dday,
          address,
          dnotes,
          dclass,
          stype,
          reason,
          tnumber,
          id,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const deleteTicket = id => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM tickets WHERE id=?;',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchTickets = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tickets',
        [],
        (_, result) => {
          let res = [];
          var len = result.rows.length;
          for (let i = 0; i < len; i++) {
            const row = result.rows.item(i);
            res = [
              ...res,
              {
                id: row.id,
                name: row.name,
                phone: row.phone,
                dday: row.dday,
                address: row.address,
                dnotes: row.dnotes,
                dclass: row.dclass,
                stype: row.stype,
                reason: row.reason,
                tnumber: row.tnumber,
              },
            ];
          }
          resolve(res);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
