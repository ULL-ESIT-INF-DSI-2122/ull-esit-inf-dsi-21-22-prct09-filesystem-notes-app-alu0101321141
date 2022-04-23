# Práctica 9: Aplicación de procesamiento de notas de texto.
## Autor: Vlatko Jesús Marchán Sekulic.

---

## Calidad y seguridad del código fuente mediante Sonar Cloud

<p align="center">
    <a href='https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101321141?branch=main'>
        <img src='https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101321141/badge.svg?branch=main' />
    </a>
    <a href='https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101321141'>
        <img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101321141&metric=bugs' />
    </a>
    <a href='https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101321141'>
        <img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101321141&metric=alert_status' />
    </a>
    
</p>

---

## Introducción a la práctica.

Se nos propone crear una aplicación de procesamiento de notas de texto. Para ello se nos redactan una serie de características dicha aplicación debería albergar.

## Implementación de la aplicación de procesamiento de notas de texto.

La solución propuesta para cumplimentar todos los requisitos pedidos fue:

1. __Clase Notas__ 

La clase Notas se encargará de guardar toda la información necesaria que necesita una nota. Para ello:

  * __Constructor de la clase:__ el constructor se encargará de inicializar la nota y para ello se necesitará, el título de la nota, El cuerpo de la nota (información a guardar) y el color con el que se representará. Como se puede observar dentro del constructor se llama al método __checkColor__

```typescript
  constructor(private title:string, private body:string, color:string) {
    this.color = this.checkColor(color);
  }
```

  *  __checkColor:__ el método checkcolor se encargará de comprobar que el color que se le asigne a la nota sea aceptado, ya que tal como se especifica las notas solo deben tener los colores rojo, verde, azul o amarillo. cabe mencionar que en el caso que se digite un color no válido por defecto se le asiganrá el color amarillo.

```typescript
  private checkColor(color:string):string {
    if (color == 'verde' || color == 'green') {
      return 'green';
    } else if (color == 'rojo' || color == 'red') {
      return 'red';
    } else if (color == 'azul' || color == 'blue') {
      return 'blue';
    } else if (color == 'amarillo' || color == 'yellow') {
      return 'yellow';
    } else {
      console.log(chalk.red('Error: Color no valido para una nota.'));
      console.log(chalk.red('Por defecto será color Amarillo.'));
      return 'yellow';
    }
  }
```

  * __Getters y Setters:__ Se han realizado getters y setters para todos los atributos. (En el caso del setter del color al igual que en el constructor se comprueba que el color sea aceptable).

  * __toString:__ el método toString nos convierte nuestra nota en una cadena de texto en formato JSON para poder ser guardada correctamente.

  ```typescript
  toString() {
    let variable:string = '{';
    variable += `\n  "title" : "${this.title}", `;
    variable += `\n  "body" : "${this.body}",`;
    variable += `\n  "color" : "${this.color}"`;
    variable += '\n}';
    return variable;
  }
  ```

2. __clase GestorNotas__

La clase gestor de notas se encargará de realizar todas las operaciones sobre las notas que dentro de los ficheros de cada usuario. De esta manera cada usuario tendrá en cada directorio su lista de notas que ha realizado. Además para poder reralizar los print con el color dicho para las notas se utilizará __chalk__

* __Constructor:__ el constructor de la clase es vacío ya que toda la información la clase la guardará en el sitema de ficheros.

* __addNotes:__ La función addNotes se encargará de añadir la nota deseada dentro del fichero del usuario dado. Para ello primero comprueba si el usuario ya tiene "Cuenta" (con cuenta nos referimos a directorio) En caso que no lo tenga se le crea la cuenta y se le añade el fichero con su nota guardada y se notifica al usuario que se ha añadido correctamente la nota. En caso de que la tenga primero comprobamos que no exista ninguna nota con el mismo titulo a insertar. En caso de que exista se emitirá un mensaje de error ya que dos notas no pueden tener el mismo nombre. En caso de que no exista se crea y se manda un mensaje de confirmación.

```typescript
  addNotes(nameUser:string, Notes:Notas):string {
    let archiveRoute:string = './AppDataBase/' + nameUser;
    if (fs.existsSync(`${archiveRoute}`)) {
      console.log(chalk.black.bgGreenBright('Bienvenido de vuelta usuario', nameUser));
      archiveRoute = archiveRoute + "/" + Notes.getTitle() + ".json";
      if (fs.existsSync(`${archiveRoute}`)) {
        console.log(chalk.black.bgRedBright('Error, la nota ya existe.'));
        return 'error';
      } else {
        fs.writeFileSync(`${archiveRoute}`, Notes.toString());
        console.log(chalk.black.bgGreenBright('Se ha creado la nota satisfactoriamente'));
        return 'correcto';
      }
    } else {
      console.log(chalk.black.bgGreenBright("Usuario Nuevo, bienvenido ", nameUser));
      fs.mkdirSync(`${archiveRoute}`, {recursive: true});
      archiveRoute = archiveRoute + "/" + Notes.getTitle() + ".json";
      fs.writeFileSync(`${archiveRoute}`, Notes.toString());
      console.log(chalk.black.bgGreenBright('Se ha creado la nota satisfactoriamente'));
      return 'correcto';
    }
  }
```

  * __modifyNotes:__ Para modificar las notas se le pide al usuario que escriba la nota modificada para ser sustituida. Para ello primero comprobamos si dicha nota ya existe ya que no se puede modificar algo que no existe. Por ello, en caso de que no exista la nota se emitira un mensaje de error. En caso de que exista buscamos la nota y la modificamos y mandamos un mensaje de confirmación.

  ```typescript
  modifyNote(nameUser:string, modifyNote:Notas) {
    let archiveRoute: string = './AppDataBase/' + nameUser;
    archiveRoute = archiveRoute + "/" + modifyNote.getTitle() + ".json";
    if (fs.existsSync(`${archiveRoute}`)) {
      fs.writeFileSync(`${archiveRoute}`, modifyNote.toString());
      console.log(chalk.black.bgGreenBright('La nota se ha modificado satisfactoriamente'));
      return 'correcto';
    } else {
      console.log(chalk.black.bgRedBright('La nota que desea modificar no existe'));
      return 'error';
    }
  }
  ```
* __deleteNote:__ Se encarga de eliminar una Nota. Para ello que se comprueba si la nota existe, en caso afirmativo se elimina y se notifica al usuario de que todo se realizó correctamente. En caso contrario se envia un mensaje de error ya que no se puede eliminar algo que no existe.

```typescript
  deleteNote(nameUser:string, noteTilte:string) {
    let archiveRoute: string = './AppDataBase/' + nameUser;
    archiveRoute = archiveRoute + "/" + noteTilte + ".json";
    if (fs.existsSync(`${archiveRoute}`)) {
      fs.rmSync(`${archiveRoute}`);
      console.log(chalk.black.bgGreenBright('La nota se ha eliminado correctamente'));
      return 'correcto';
    } else {
      console.log(chalk.black.bgRedBright('Error dicha nota no existe'));
      return 'error';
    }
  }
```
* __listTitle:__ La función se encarga de listar todos los títulos de las notas que tiene dicho usuario. Para ello primero comprobamos si el usuario existe. En caso de que no exista se informará el error. En otro caso se recorrerán las notas que tiene almacenadas en su directorio e imprimiremos los títulos. con su color correspondiente.

```typescript
  listTitles(nameUser:string):string {
    let archiveRoute:string = './AppDataBase/' + nameUser;
    if (fs.existsSync(`${archiveRoute}`)) {
      console.log(chalk.black.bgGreenBright('Las notas con sus títulos son:'));
      archiveRoute += "/";
      const namefiles = fs.readdirSync(`${archiveRoute}`);
      namefiles.forEach((fileName) => {
        const fileContent = fs.readFileSync( archiveRoute + fileName);
        const json = JSON.parse(fileContent.toString());
        this.printWithColor(json.color, json.title);
      });
      return 'correcto';
    } else {
      console.log(chalk.black.bgRedBright('El usuario no existe'));
      return 'error';
    }
  }
```

* __listNodes:__ se encarga de listar la nota que se le indica con su título. Para ello primero comprobamos si dicha nota existe. En caso negativo se informa al usuario que la nota no existe. En caso afirmativo se extrae la información del JSON haciendo un parse e imprimimos la nota con su color correspondiente.

```typescript
  listNote(nameUser:string, noteTilte:string) {
    noteTilte += ".json";
    let archiveRoute: string = './AppDataBase/' + nameUser;
    let flag:boolean = false;
    if (fs.existsSync(`${archiveRoute}`)) {
      archiveRoute += "/";
      const namefiles = fs.readdirSync(`${archiveRoute}`);
      namefiles.forEach((fileName) => {
        if (noteTilte == fileName) {
          console.log(chalk.black.bgGreenBright('La nota es: '));
          const fileContent = fs.readFileSync(archiveRoute + fileName);
          const json = JSON.parse(fileContent.toString());
          this.printWithColor(json.color, json.title);
          this.printWithColor(json.color, json.body);
          this.printWithColor(json.color, json.color);
          flag = true;
        }
      });
      if (flag) {
        return 'correcto';
      } else {
        console.log(chalk.black.bgRedBright('El usuario no tiene ninguna nota con ese nombre'));
        return 'error';
      }
    } else {
      console.log(chalk.black.bgRedBright('El usuario no existe'));
      return 'error';
    }
  }
```

* __printWithColor:__ Función que se encarga de realizar el print del texto con el color correspondiente.

```typescript
  private printWithColor(color:string, text:string) {
    if (color == 'verde' || color == 'green') {
      console.log(chalk.black.bgGreenBright(text));
    } else if (color == 'rojo' || color == 'red') {
      console.log(chalk.black.bgRedBright(text));
    } else if (color == 'azul' || color == 'blue') {
      console.log(chalk.black.bgBlueBright(text));
    } else if (color == 'amarillo' || color == 'yellow') {
      console.log(chalk.black.bgYellowBright(text));
    }
  }
```

3. __NoteApp__

En la aplicación de NoteApp se definirán los comandos que se podrá realizar nuestra aplicación. Para ello se utiliza __yargs__ que nos permitirá llamar los comandos con sus respectivos atributos. Los comandos definidos son la implementación de los métodos de nuestro _Gestor de notas_.

* __Comando add__:  El comando add nos pedirá obligatoriamente el nombre de usuario y la información de la Nota. Este comando Se encargará de que nuestro usuario sea capaz de añadir notas.

```typescript
yargs.command({
  command: 'add',
  describe: 'Añade una nota nueva',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string') && (typeof argv.body === 'string') &&
      (typeof argv.color === 'string') ) {
      const newNote = new Notas(argv.title, argv.body, argv.color);
      const gestor = new GestorNotas();
      gestor.addNotes(argv.user, newNote);
    }
  },
});
```

* __comando modify:__ el comando modify Se encargará de modificar la nota indicada por el usuario. Para ello nos pedirá la información del usuario y todos los datos de la nota modificada.

```typescript
yargs.command({
  command: 'modify',
  describe: 'Modifica una nota que existia antes',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string') && (typeof argv.body === 'string') &&
      (typeof argv.color === 'string')) {
      const newNote = new Notas(argv.title, argv.body, argv.color);
      const gestor = new GestorNotas();
      gestor.modifyNote(argv.user, newNote);
    }
  },
});
```

* __comando delete:__ Se encargará de eliminar la nota indicada. Para ello se nos pedirá el nombre del usuario y el título de la nota a eliminar.

```typescript
yargs.command({
  command: 'delete',
  describe: 'Elimina una nota que existia antes',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string')) {
      const gestor = new GestorNotas();
      gestor.deleteNote(argv.user, argv.title);
    }
  },
 });
```

* __comando list:__ se encargará de listar todos los títulos de las notas que tiene creadas el usuario. Para ello nos pedirá el nombre del usuario.

```typescript
yargs.command({
  command: 'list',
  describe: 'Muestra titulos de las notas',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string')) {
      const gestor = new GestorNotas();
      gestor.listTitles(argv.user);
    }
  },
});
```


* __comando listNote:__ Se encargará de listar la nota indicada por el usario. para ello se nos pide el nombre del usuario y el título de la nota a mostrar.

```typescript
yargs.command({
  command: 'listNote',
  describe: 'Muestra una nota que existia antes',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string')) {
      const gestor = new GestorNotas();
      gestor.listNote(argv.user, argv.title);
    }
  },
});
```


---

## Documentación consultada.

* [1] [Documentación de API síncrona de Node.js para trabajar con el sistema de ficheros](https://nodejs.org/api/fs.html#fsrmsyncpath-options)

* [2] [Documentación especifica del método fs.readdirSync()](https://www.geeksforgeeks.org/node-js-fs-readdirsync-method/)

* [3] [Documentación chalk](https://www.positronx.io/style-command-line-output-with-chalk-library-in-node-js/)

* Además se utilizó el material facilitado por el profesorado en la práctica.