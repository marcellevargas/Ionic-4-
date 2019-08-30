import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'todo.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE todo' +
       '(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar, description VARCHAR, status INTEGER)'],
    ])
      .then(() => console.log('Successfully created tables'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

}
