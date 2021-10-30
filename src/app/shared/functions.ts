export class Functions {
    
    public static onlyNumbers(value: string): string {
        return value.replace(/\D/g, "");
    }

}