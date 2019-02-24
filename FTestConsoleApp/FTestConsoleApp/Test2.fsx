#r "C:\Users\pavel\.nuget\packages\excelprovider\0.8.2\lib\ExcelProvider.dll"
open FSharp.ExcelProvider
open ExcelProvider.ExcelProvider
open System.IO

type DataTypesTest = ExcelFile<"test.xlsx">
let file = new DataTypesTest()
let objToString (row: Row) (i:int)=
    match row.GetValue(i) with 
    | null -> ("")
    | _ -> (row.GetValue(i).ToString())

let mapRow (row:Row) = 
    let cellCount = 3
    let cells = [|0..cellCount|]
    cells
    |> Array.map (fun(i) -> (objToString row i))
    |> String.concat ";"
   
let rows = 
    file.Data 
    |> Seq.map mapRow
    |> Seq.toList

let step = 1 

for i in 1..15 do
    let filePath = [|__SOURCE_DIRECTORY__;"\\temp\\";i.ToString();".csv"|] |> String.concat ""
    File.WriteAllLines(filePath, rows|> List.skip (step*(i-1)) |> List.take step)
