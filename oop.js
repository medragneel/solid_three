

class Person {
   constructor (name,age,gender) {
        this.name = name
        this.age = age
        this.gender = gender

    }

    getInfo(){
        console.log(this.name,this.age,this.gender)
    }
}

const person1 = new Person('medmh',22,'male')
console.log(person1.getInfo())

