import {defineProps, withDefaults} from "vue";

export const useGeneralUtils = () => {
    /**
     * Helper function to generate valid uuidV4 strings
     * @return {string} UUID v4
     * */
    const uuidV4 = ():string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {

            const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    }
    /**
     * Helper function to determine if an object is empty
     * @param obj {Record<string,unknown> | null | undefined} target object to check
     * @return {boolean} if object is empty
     * */
    const isEmptyObject = (obj?:Record<string, unknown>):boolean =>!!obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    /**
     * Memory optimized function for loop in parallel
     * @typedef T - Target Type
     * @param array {Array<T>} - Typed array to loop through
     * @param {Function (T, number)} callback - Callback for each iteration.
     * */
    async function asyncForEach<T>(array: Array<T>, callback: (item: T, index: number) => Promise<void>) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index);
        }
    }
    /**
     * Helper function to debounce execution of requests
     * @param fn {T} function to debounce
     * @param delay {number} milliseconds to wait between calls
     *  */
    const debounce = function<T extends (...args: unknown[]) => ReturnType<T> | PromiseLike<ReturnType<T>>> (fn: T, delay: number) {
        let timeout: ReturnType<typeof setTimeout> | undefined;

        let promise: Promise<ReturnType<T>> | undefined;
        let res: ((value: ReturnType<T> | PromiseLike<ReturnType<T>>) => void) | undefined;

        return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
            const scheduleResolution = (resolve: (value: ReturnType<T> | PromiseLike<ReturnType<T>>) => void) => {
                if (timeout) {clearTimeout(timeout)}

                timeout = setTimeout(() => {
                    timeout = undefined;
                    promise = undefined;
                    res = undefined;

                    resolve(fn.apply(this, args));
                }, delay);
            };

            if (res) {
                scheduleResolution(res);
            } else {
                promise = new Promise<ReturnType<T>>((resolve) => {
                    res = resolve;
                    scheduleResolution(res);
                });
            }
            return promise as Promise<ReturnType<T>>;
        };
    };
    /**
     * Helper function to convert an Object[] in to csv, coma separatred format
     * @param {Record<string, any>[]|string} objArray target array
     * @returns string
     * */
    const convertToCSV = (objArray: Record<string, any>[]|string) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (const index in array[i]) {
                if (line !== '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }
    /**
     * Helper function to export json to a coma separated CSV file
     * @param {Record<string, any>} headers An object contaignin header declaration, using {fielname: 'string header title'}
     * @param {Record<string, any>[]} items Target data
     * @param {string} fileTitle String title for the generated file
     * */
    const  exportCSVFile = (headers:Record<string, any>, items:Record<string, any>[], fileTitle:string) => {
        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        const jsonObject = JSON.stringify(items);

        const csv = convertToCSV(jsonObject);

        const exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        const link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return url
        }
        return null
    }
    /**
     * Generator function util to return chunks from an array
     * @param {any[]} target target array
     * @param {number} size chunk's size
     * */
    const arrayToChunks = function*<T> (target: T[], size:number) {
        for (let i = 0; i < target.length; i += size) {
            yield target.slice(i, i + size);
        }
    }
    /**
     * Array to groups
     * @param {any[]} a Target Array
     * @param {number} n Number of groups
     * @returns {any[][]} Array of arrays, of target array elements
     *  */
    const arrayToGroups = <T>(a: T[], n: number): T[][] => {
        const b = Math.ceil(a.length / n);
        return [...Array(n)].map((_, i) => a.slice(i * b, (i + 1) * b));
    };
    /***/
    const defaultProperties = <T> (defaults?: T ) => withDefaults(defineProps<T>(), defaults||{})
    const randomInteger = (min:number, max:number) =>Math.floor(Math.random() * (max - min + 1)) + min
    return {
        uuidV4,
        isEmptyObject,
        asyncForEach,
        debounce,
        convertToCSV,
        exportCSVFile,
        defaultProperties,
        randomInteger,
        arrayToChunks,
        arrayToGroups
    }
}