import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class Todo {
  id: number;
  name: string;
  description: string;
  status: number;
}

export class TodoService {
  constructor(private sqlite: SQLite, private databaseService: DatabaseService) { }

  private insert(todo: Todo) {
    return this.databaseService.getDB()
    .then((db: SQLiteObject) => {
      const sql  = 'INSERT INTO todo (name,description,status) values(?,?,?)';
      const data = [todo.name, todo.description, todo.status];

      return db.executeSql(sql, data)
      .then(() => {
        console.log('INSERT INTO todo' + todo.name + ' ' + todo.description + ' ' + todo.status);
        return true;
      })
      .catch((e) => {
        console.error(e.message);
      });
    });
  }

  private update(todo: Todo) {
    return this.databaseService.getDB()
    .then((db: SQLiteObject) => {
      const sql  = 'UPDATE todo SET name = ? ,description = ?, status = ? WHERE id = ?';
      const data = [todo.name, todo.description, todo.status, todo.id];

      return db.executeSql(sql, data)
      .then(() => {
        console.log('UPDATE todo' + todo.name + ' ' + todo.description + ' ' + todo.status);
        return true;
      })
      .catch((e) => {
        console.error(e.message);
      });
    });
  }

  private delete(todo: Todo) {
    return this.databaseService.getDB()
    .then((db: SQLiteObject) => {
      const sql  = 'DELETE FROM todo WHERE id = ?';
      const data = [todo.id];

      return db.executeSql(sql, data)
      .then(() => {
        console.log('UPDATE todo' + todo.name + ' ' + todo.description + ' ' + todo.status);
        return true;
      })
      .catch((e) => {
        console.error(e.message);
      });
    });
  }

  public getTodo() {
    return this.databaseService.getDB()
    .then((db: SQLiteObject) => {
      const sql = 'SELECT * FROM todo';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0) {
          const todos: any[] = [];
          for (let i = 0; i < data.rows.length; i++) {
            const item = data.rows.item(i);
            const todo = new Todo();

            todo.id          = item.id;
            todo.name        = item.name;
            todo.description = item.description;
            todo.status      = item.status;

            todos.push(todo);
          }
          return todos;
        } else {
          return [];
        }
      })
      .catch((e) => console.error('Erro TodoService getTodo: ', e.message));
    })
    .catch((e) => console.error('Erro TodoService getTodo:', e.message));
  }
}

