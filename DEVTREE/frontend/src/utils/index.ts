export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}


export function validateUrl(url: string):boolean {
    try {
       const pattern = new URL(url);
       return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}