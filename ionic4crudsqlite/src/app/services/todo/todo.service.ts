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
  constructor(private sqlite: SQLite, private dataBase: DatabaseService) { }

  private insert(todo: Todo) {
    const sql  = ['INSERT INTO todo (name,description,status) values(?,?,?)'];
    const data = [todo.name, todo.description, todo.status];
  }

  private update(todo: Todo) {
    const sql  = ['UPDATE todo SET name = ? ,description = ?, status = ? WHERE id = ?'];
    const data = [todo.name, todo.description, todo.status, todo.id];
  }

  private delete(todo: Todo) {
    const sql  = ['DELETE FROM todo WHERE id = ?'];
    const data = [todo.id];
  }
}

