export class Functions {
    
    public static onlyNumbers(value: string): string {
        if (!value)
            return value;

        return value.replace(/\D/g, "");
    }

}