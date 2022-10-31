// small constant I use to approximately compare vectors for equality

const epsilon = 0.001

class Vector {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    multiplyByNumber(factor) {
        this.x *= factor
        this.y *= factor
        this.z *= factor
    }

    add(secondVector) {
        this.x += secondVector.x
        this.y += secondVector.y
        this.z += secondVector.z
    }

// To Do: refactor length() method so that it uses dotProduct() to calculate the result

    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
    }

    dotProduct(secondVector) {
        return this.x * secondVector.x + this.y * secondVector.y + this.z * secondVector.z
    }

    crossProduct(secondVector) {
        return new Vector(this.y * secondVector.z - this.z * secondVector.y,
            -this.x * secondVector.z + this.z * secondVector.x,
            this.x * secondVector.y - this.y * secondVector.x
            )
    }
}

class Parallelepiped {
    constructor(startingPoint, firstVector, secondVector, thirdVector) {
        this.startingPoint = startingPoint
        this.definingVectors = [firstVector, secondVector, thirdVector]
    }

    volume() {
        return Math.abs(
            this.definingVectors[0].crossProduct(this.definingVectors[1]).dotProduct(this.definingVectors[2])
        )
    }

    surfaceArea() {
        return 2 * (
            this.definingVectors[0].crossProduct(this.definingVectors[1]).length() +
            this.definingVectors[1].crossProduct(this.definingVectors[2]).length() +
            this.definingVectors[2].crossProduct(this.definingVectors[0]).length()
            )
    }

}

class Cube extends Parallelepiped {
    constructor(startingPoint, firstVector, secondVector, thirdVector) {


        /* console.log(firstVector.length())
        console.log(secondVector.length())
        console.log(thirdVector.length())
        console.log(firstVector.length() - secondVector.length())
        console.log(Math.abs(firstVector.length() - thirdVector.length())) */


        if (Math.abs(firstVector.dotProduct(secondVector)) > epsilon || Math.abs(firstVector.dotProduct(thirdVector)) > epsilon) {
            throw new TypeError("Defining vectors of the cube are not perpendicular to each other")
        } else if (Math.abs(firstVector.length() - secondVector.length()) > epsilon || Math.abs(firstVector.length() - thirdVector.length()) > epsilon) {
            throw new TypeError("Sides of the cube are not equal")
        } else {
            super(startingPoint, firstVector, secondVector, thirdVector)
        }
    }
    
    volume() {
        return this.definingVectors[0].length() ** 3
    }
}


// Test: dot product works fine on two basis vectors in R^3

const i = new Vector(1, 0, 0)
const j = new Vector(0, 1, 0)
const k  = i.crossProduct(j)    // k == Vector{x:0, y:0, z:1}

//console.log(k)


// Origin point (testing default arguments):
const O = new Vector()      // O == Vector{x:0, y:0, z:0}

// console.log(O)

// Building a Parallelepiped on basis vectors
const P = new Parallelepiped(O, i, j, k)    // Volume = 1, Surface Area = 6
// console.log(`Volume = ${P.volume()}, Surface Area = ${P.surfaceArea()}`)


// Vector J = 23.5 * j
let J = new Vector(0, 23.5, 0)
const P1 = new Parallelepiped(O, i, J, k)   // Volume = 23.5
// console.log(P1.volume())

// Unit  Cube built on the basis vectors:
const unitCube = new Cube(O, i, j, k)   // Volume = 1, Surface Area = 6

//console.log(`Volume = ${unitCube.volume()}\nSurface Area = ${unitCube.surfaceArea()}`)


// Not a proper Cube:
// falseCube = new Cube(O, i, J, k);       // TypeError: sides aren't  equal






