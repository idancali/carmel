import { SessionProps, CommandProps, Path, EngineState, IClass, IBundle, Name, ChunkConfig, Id, ILogger, ArtifactsKind, IFile, IDir, CommandType, SessionState, ChunkConfigRoute, Target, Version, ProductState, IScript, CommandArg } from '.';
export interface IEngine extends IClass {
    readonly state: EngineState;
    readonly isStarted: boolean;
    readonly hasSession: boolean;
    readonly session?: ISession;
    changeState(state: EngineState): void;
    newSession(props?: SessionProps): Promise<void>;
    start(props?: SessionProps): Promise<ISession>;
    stop(): Promise<void>;
    exec(command?: ICommand, args?: CommandArg[]): Promise<any>;
}
export interface ISession extends IClass {
    readonly props?: SessionProps;
    readonly logger: ILogger;
    readonly index: any;
    readonly state: SessionState;
    readonly isInitialized: boolean;
    readonly isReady: boolean;
    readonly product?: IProduct;
    initialize(command?: ICommand): Promise<void>;
    makeReady(): Promise<void>;
    destroy(): Promise<void>;
    changeState(state: SessionState): void;
    resolveProduct(target?: Target): Promise<IProduct | undefined>;
    findBundle(id: Id, version: Version, install?: boolean): Promise<IBundle | undefined>;
    findArtifact(id: Id, kind: ArtifactsKind, install?: boolean): Promise<any>;
    findStack(id: Id, install?: boolean): Promise<IStack | undefined>;
    findTemplate(id: Id, install?: boolean): Promise<ITemplate | undefined>;
}
export interface ICommand extends IClass {
    readonly props: CommandProps;
    readonly session?: ISession;
    readonly requiresArgs: boolean;
    readonly requiresScript: boolean;
    readonly product?: IProduct;
    readonly target: Target;
    readonly type: CommandType;
    readonly id: Id;
    readonly script?: IScript;
    readonly args?: CommandArg[];
    readonly app?: IApp;
    run(session: ISession, args?: CommandArg[]): Promise<any>;
    exec(): Promise<any>;
    runScript(): Promise<any>;
    arg(name: Name): any;
}
export interface IProduct extends IClass {
    readonly dir: IDir;
    readonly manifest: IFile;
    readonly session?: ISession;
    readonly exists: boolean;
    readonly context?: any;
    readonly stack?: IStack;
    readonly isLoaded: boolean;
    readonly isReady: boolean;
    readonly state: ProductState;
    readonly snapshot?: ISnapshot;
    create(data?: any): void;
    load(): Promise<IProduct | undefined>;
    saveContext(context: object): void;
    changeState(state: ProductState): void;
    loadFile(path: Path): void;
    saveData(data: any): void;
    findDirs(dirpath: Path): Path[];
}
export interface ISnapshot extends IClass {
    readonly id: Id;
    readonly product: IProduct;
    readonly exists: boolean;
    readonly dir?: IDir;
    readonly chunksDir?: IDir;
    readonly apps?: Map<Target, IApp>;
    readonly chunks?: Map<Name, IChunk>;
    load(): Promise<ISnapshot | undefined>;
    app(target: Target): Promise<IApp | undefined>;
    chunk(name: Name): Promise<IChunk | undefined>;
}
export interface IArtifact extends IClass {
    readonly kind: ArtifactsKind;
    readonly name: Name;
    readonly bundle: IBundle;
    readonly dir?: IDir;
    readonly exists: boolean;
}
export interface IStack extends IClass {
    readonly artifact?: IArtifact;
    load(): Promise<IStack | undefined>;
    supportsTarget(target: Target): boolean;
    supportsTargetScript(target: Target, name: Name): boolean;
    targetDir(target: Target): IDir | undefined;
    targetScriptDir(target: Target, name: Name): IDir | undefined;
    findTargetScript(target: Target, name: Name): Promise<IScript | undefined>;
}
export interface ITemplate extends IClass {
    readonly artifact?: IArtifact;
    load(): Promise<ITemplate | undefined>;
}
export interface IApp extends IClass {
    readonly target: Target;
    readonly snapshot: ISnapshot;
    readonly exists: boolean;
    readonly dir?: IDir;
    load(): Promise<IApp | undefined>;
}
export interface IChunk extends IClass {
    readonly name: Name;
    readonly snapshot: ISnapshot;
    readonly exists: boolean;
    readonly config?: ChunkConfig;
    readonly manifest?: IFile;
    readonly screens?: Map<Name, IScreen>;
    readonly dir?: IDir;
    readonly srcDir?: IDir;
    load(): Promise<IChunk | undefined>;
    screen(route: ChunkConfigRoute): Promise<IScreen | undefined>;
}
export interface IScreen extends IClass {
    readonly chunk: IChunk;
    readonly exists: boolean;
    readonly dir?: IDir;
    readonly config?: ChunkConfigRoute;
    load(): Promise<IScreen | undefined>;
}
