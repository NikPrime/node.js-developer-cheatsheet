/*

TypeScript - это язык программирования, который является надстройкой языка JavaScript
Разработан для добавления статической типизации к JavaScript
Позволяет разработчикам обнаруживать и предотвращать множество ошибок на этапе разработки, связанных с типами данных.
Позволяет разработчикам создавать более надежные, понятные и легко поддерживаемые приложения на основе JavaScript.

Динамическая и статическая типизация - это два различных подхода к обработке типов данных в языках программирования
В "Динамической типизации" типы переменных и их проверка происходит во время выполнения программы
В "Статической типизации" типы и их проверка происходят на этапе разработки и компиляции

Преимущества использования TypeScript:
Дает статическую типизацию, заранее отлавливающую ошибки, связанные с типизацией на ранних этапах разработки
Благодаря типизации улучшается читаемость кода, делая его самодокументирующимся

Базовые типы TypeScript:
number - числа (целые и дробные)
string - текстовые строки
boolean - булевый тип, либо true, либо false
array - массив, может обозначаться как type[], например: number[] или Array<number>
tuple - позволяет создавать массивы с фиксированным кол-вом элементов, где типы известны заранее
enum - Набор константных значений
any - любой тип (не рекомендуется использовать)
void - отсутствие значения
null и undefined - значения, указывающие на их отсутствие
object - обозначает не примитивные типы (не number, string и т.д.)
never - тип, обозначающий значения, которые никогда не должны происходить
union - позволяет переменной иметь несколько типов, например: string | number
intersection - создает новые типы, объединяющиеся в один. Например: type Combined = Type1 & Type2
type - позволяет создавать собственные типы или алиасы для существующих типов
class - расширенная версия объектов в JS, позволяющая определять конструкторы и методы
interface - предназначено для описания структуры объектов, определения свойств, методов
*/

// Примитивные типы
const str: string = ''

// Массивы
const arr: number[] = [1, 2, 3]
const arr1: Array<string> = ['a', 'b']

// Readonly - делает переменную доступной только для чтения
const numbersArray: ReadonlyArray<number> = [1, 2, 3]
let str1: Readonly<string>= 'a'

// Tuple (Кортеж) - определяет массив фиксированной длины
type TypeArrayTuple = [number, string, null]
const typeArray: TypeArrayTuple = [1, 'a', null]



// Типизация функций (вариант 1) - типизируем входные (аргументы) и выходные параметры
function getNameById1(firstName: string, lastName: string): string {
    return firstName + lastName
}

// Типизация функций (вариант 2) - объявляем type, и присваиваем переменной
type TypeGetNameById = (firstName: string, lastName: string) => string
const getNameById2: TypeGetNameById = (firstName, lastName) => {
    return firstName + lastName
}



// Функциональные перегрузки - указываем сигнатуры функции до вызова
// можем принимать в нее разные переменные
function getName(name: string): string
function getName(name: string, lastName: string): string



function getName(name: string, lastName?: string): string {
    let result = `Имя ${name} `
    if (lastName) result+= `Фамилия: ${lastName}`
    return result
}


// Классы
class UserClass {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    getInfo(): string {
        return `name: ${this.name}, age: ${this.age} `
    }
}

/*
  Классы, модификаторы класса
  public - доступен везде
  private - доступен только внутри функций самого класса, больше нигде
  protected - доступен только внутри класса, и класса-наследника
 */


/*
  Type vs Interface
  Type1 & Type2 = Interface1 extends Interface2
  В общем и целом они взаимозаменяемые
*/

// Enum
enum EnumRoles {
    ADMIN,
    USER
}
const userEnumRole = EnumRoles.USER
// reverse mapping for enum
const EnumRolesVar = EnumRoles[EnumRoles.ADMIN] // получаем key по value. Выдаст




type UserFullName = {
    firstName: 'Nik'
    lastName: 'Prime'
}

type UserBaseInfo = {
    email: 'nikprime1@gmail.com',
    country: 'Kazakhstan'
}

// Объединение типов (union)
type UserUnionInfo = UserFullName | UserBaseInfo

// Пересечение типов (intersection)
type UserIntersectionInfo = UserFullName & UserBaseInfo



// Generics
function genericFuncDeclaration<T>(args: T): T {
    return args
}

class genericClass<T> {
    private name: T

    constructor(name: T) {
        this.name = name
    }
}

const genericFunExpression = <T>(args: T): T => {
    return args
}




// Utilites - Утилиты типов

interface IBase {
    money: number
    name: string
    isBase?: boolean
}

// Omit - исключает ключи из типа объекта
const omitVar: Omit<IBase, 'money'>  = {
    name: 'name',
    isBase: true
}

// Pick - Выбирает свойства типа объекта, удаляет все остальные
const pickVar: Pick<IBase, 'money'> = {
    money: 5
}

// Partial - Делает все свойства объекта необязательными
const partialVar: Partial<IBase> = {
    money: 5,
    name: 'name'
}

// Required - Делает все свойства объекта обязательными
const requiredBar: Required<IBase> = {
    money: 5,
    name: 'name',
    isBase: true
}

// Exclude - удаляет типы из объединенного типа (union)
type BaseType = 'A' | 'B'
const excludeVar: Exclude<BaseType, 'B'> = 'A'

// Extract - извлекает из type только те типы, которые есть при union
type extractTypeA = 'a' | 'b' | 'c'
type extractTypeB = 'a' | 'b'
type extractTypeC = Extract<extractTypeA, extractTypeB> // = 'a' | 'b'

// Record - создает тип запись с key и value
type RecordType = Record<string, number>
const recordObj: RecordType = {
    a: 1,
    b: 2
}

// NonNullable - извлекает тип из type, исключая null и undefined
let nullableVar: string | null | undefined
const nonNullableVar: NonNullable<typeof nullableVar> = 'name'

// ReturnType - извлекает тип возвращаемого значения функции type
function returnFunc(): string {
    return 'name'
}
const returnVar: ReturnType<typeof returnFunc> = 'name'