export declare const AdaptiveThrottlingWithRetry: (options?: any) => {
    readonly requestRejectionProbability: number;
    execute(requestFn: any): Promise<any>;
};
