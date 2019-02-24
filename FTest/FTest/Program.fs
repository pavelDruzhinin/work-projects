// Learn more about F# at http://fsharp.org

open System

let square y = y * y

let sampleString = "1234567890"

let sametable = [ for i in  0 .. 99 -> (i, i*i)]

let tuple1 = (1,2,3)
let swapElems (a,b,c) = (b+c, c+a, a+b)

[<EntryPoint>]
let main argv =
    printfn "%d squared is: %A %s %A!" (square 12) sametable sampleString.[1..3] (swapElems(23,24,54))
    0 // return an integer exit code
