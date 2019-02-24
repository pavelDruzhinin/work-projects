namespace FSpamDetector

open System.IO

module ReadData = 
    type DocType = | Ham | Spam

    let parseDocType (label:string) = 
        match label with
        | "ham" -> Ham
        | "spam" -> Spam
        | _ -> failwith "Unknown label"

    let parseLine (line: string) = 
        let split = line.Split('\t')
        let label = split.[0] |> parseDocType
        let message = split.[1] 
        (label, message)

    let fileName = "SMSSpamCollection.txt"
    let path = @"C:\Users\pavel\Documents\Visual Studio 2017\Projects\DigitRecognizer\FSpamDetector\" + fileName

    let createDataset () = 
        File.ReadAllLines path
        |> Array.map parseLine

open System.Text.RegularExpressions

module NaiveBayes = 
    type Token = string
    type Tokenizer = string -> Token Set
    type TokenizedDoc = Token Set

    type DocsGroup = { Proportion: float;TokenFrequencies:Map<Token, float>}

    let tokenScore (group:DocsGroup) (token:Token) = 
        if group.TokenFrequencies.ContainsKey token
        then log group.TokenFrequencies.[token]
        else 0.0

    let score (document: TokenizedDoc) (group:DocsGroup) = 
        let scoredToken = tokenScore group
        log group.Proportion + 
        (document |> Seq.sumBy scoredToken)

    let classify (groups:(_*DocsGroup)[]) (tokenizer: Tokenizer) (txt:string) = 
                        let tokenized = tokenizer txt
                        groups 
                        |> Array.maxBy (fun (label, group) -> 
                            score tokenized group)
                        |> fst

    let proportion count total = float count / float total
    let laplace count total = float (count+1) / float (total + 1)
    let countIn (group:TokenizedDoc seq) (token:Token) = 
        group 
        |> Seq.filter (Set.contains token)
        |> Seq.length

    let analyze (group: TokenizedDoc seq) 
                (totalDocs: int)
                (classificationTokens:Token Set) = 
           let groupSize = group |> Seq.length
           let score token = 
             let count = countIn group token 
             laplace count groupSize
           let scoredTokens = 
            classificationTokens 
            |> Set.map (fun token -> token, score token)
            |> Map.ofSeq
           let groupProportion = proportion groupSize totalDocs

           {
               Proportion = groupProportion
               TokenFrequencies = scoredTokens
           }
    
    let learn (docs: (_*string)[])
               (tokenizer:Tokenizer)
               (classificationTokens: Token Set) = 
                let total = docs.Length
                docs 
                |> Array.map (fun (label, docs) -> label, tokenizer docs)
                |> Seq.groupBy fst
                |> Seq.map (fun (label, group) -> label, group |> Seq.map snd)
                |> Seq.map (fun (label, group) -> label, analyze group total classificationTokens)
                |> Seq.toArray

   
    
    let matchWords = Regex(@"\w+")

    let wordTokenizer (text:string) =
        text.ToLowerInvariant()
        |> matchWords.Matches
        |> Seq.cast<Match>
        |> Seq.map (fun m -> m.Value)
        |> Set.ofSeq

    let train () =
        let docs = ReadData.createDataset()
        let classificationTokens = wordTokenizer "txt"
        let groups = learn docs wordTokenizer classificationTokens
        let classifier = classify groups wordTokenizer
        classifier
