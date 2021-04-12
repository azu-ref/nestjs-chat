import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  insertData(id: string) {
    readFile(`${__dirname}/../sockets.json`, (err, data) => {
      if (err) throw err;
      const file = JSON.parse(data.toString());
      file.db[id] = {
        name: '',
      };

      writeFile(`${__dirname}/../sockets.json`, JSON.stringify(file), (err) => {
        if (err) throw err;
      });
    });
  }

  updateData(id: string, name: string) {
    readFile(`${__dirname}/../sockets.json`, (err, data) => {
      if (err) throw err;
      const file = JSON.parse(data.toString());
      const newData = JSON.parse(data.toString());

      newData.db[id] = {
        name: name,
      };
      console.log(file.db[id].name);
      if (file.db[id].name == '') {
        console.log('escribo nombre');
        writeFile(
          `${__dirname}/../sockets.json`,
          JSON.stringify(newData),
          (err) => {
            if (err) throw err;
          },
        );
      }
    });
  }
}
