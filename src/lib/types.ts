
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
    passRate:number,
    testSamples:TestSample
}
export interface BlogUser{
    id:string,
    nickName:string,
    email:string,
    level:number,
    location:string,
    school:string,
    tag:string,
    gender:string,
    url:string,
    sign:string,
    fans:string,
    subscribe:string
}
export interface Blog{
    id:string,
    uid:string,
    context:string,
    title:string,
    type:string,
    like:number,
    star:number,
    tag:any,
    adminTags:any,
    faceImage:string,
    time:string,
    comment:number
    likeState:number,
    starState:number,
    subscribeState:number,
    user:BlogUser
}

export interface Comments{
    id:string,
    bid:string,
    blogUid:string,
    commentsUid:string,
    time:string,
    context:string,
    commentsContext:string,
    like:number,
    star:number,
    commentsUser:BlogUser | null,
    user:BlogUser | null,
    likeState:number
}

export interface AdminTag{
    message:string,
    type:string
}

export interface Match{
    id:string,
    matchName:string,
    matchDescription:string,
    createTime:string,
    startTime:string,
    endTime:string,
    persistentTime:number,
    participationCount:number,
    matchType:number,
    imgUrl:string,
    state:string
}


export interface TestSample{
    id:string,
    qid:string,
    questionName:string,
    sampleInput:string,
    sampleOutput:string,
    sampleInputArray:string[],
    sampleOutputArray:string[]
}

export interface User{
    id:string,
    nickName:string,
    email:string,
    password:string,
    experience:number,
    level:number,
    location:string,
    school:string,
    tag:string,
    gender:string,
    easyResolve:number,
    meddleResolve:number,
    hardResolve:number,
    nightmareResolve:number,
    role:string,
    url:string,
    token:string,
    rank:number,
    fans:number,
    subscribe:number,
    sign:string,
    ban:number
}

export interface sysInfoObj{
    cpuInfo:cpuInfoObj,
    jvmInfo:jvmInfoObj,
    memoryInfo:memoryInfoObj,
    sysInfo:computerInfoObj,
    filesInfo:fileInfoObj[],
}

export interface cpuInfoObj{
    cpuNum:number,
    sysUsage:number,
    userUsage:number,
    ioWait:number,
    cpuUsage:number
}

export interface memoryInfoObj{
    totalMemory:number,
    usedMemory:number,
    freeMemory:number,
    pageSize:number,
    usageMemory:number
}

export interface jvmInfoObj{
    totalMemory:number,
    freeMemory:number,
    maxMemory:number,
    usedMemory:number,
    usageMemory:number,
    jdkVersion:string,
    jdkHome:string
}

export interface computerInfoObj{
    osName:string,
    osArch:string,
    computeName:string,
    ip:string,
    projectDir:string
}

export interface fileInfoObj{
    dirName:string,
    dirType:string,
    fileType:string,
    totalSize:number,
    freeSize:number,
    usedSize:number,
    usage:number
}
