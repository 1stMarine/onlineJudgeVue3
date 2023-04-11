
export type Question = {
    questionName: string,
    id:number,
    inputStyle:string,
    outputStyle:string,
    inputSample:string,
    outputSample:string,
    dataRange:string,
    difficulty:string,
    timeLimit:number,
    memoryLimit:number,
    description:string,
    totalPass:number,
    totalAttempt:number,
    resource:string,
    tag:string,
    passRate:number
}