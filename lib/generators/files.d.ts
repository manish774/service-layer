export declare class GFiles {
    generate(props: {
        fileName: string;
        code: string;
    }): Promise<void>;
    runFormatter(): Promise<void>;
}
