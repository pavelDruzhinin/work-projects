// Learn more about F# at http://fsharp.org
open System
open System.Text.RegularExpressions
open ExcelPackageF
open System.Text

Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
let data = "Data.xlsx" 
        |> Excel.getWorksheetByIndex 1
        |> Excel.getContent

type Token = string
type Tokenizer = string -> Token Set

let showTokens (tokens:string) (tokenizer:Tokenizer) = 
    let tokenized = tokenizer tokens
    tokenized
    |> Set.iter (fun (label) -> printf "%s\n" label)

let matchWords = Regex(@"\w+")

let wordTokenizer (text:string) =
    text.ToLowerInvariant()
    |> matchWords.Matches
    |> Seq.cast<Match>
    |> Seq.map (fun m -> m.Value)
    |> Set.ofSeq



[<EntryPoint>]
let main argv =
    //printfn "%A" data
    0 // return an integer exit code
