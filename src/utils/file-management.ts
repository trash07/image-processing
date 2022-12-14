import {promises as fs} from 'fs';
import {constants} from "fs/promises";


/**
 * Check if a file exists
 * @param path
 */
export async function fileExists(path: string): Promise<boolean> {
    try {
        await fs.access(path, constants.F_OK)
        return true;
    } catch (e: unknown) {
        console.log(e);
        return false;
    }
}

/**
 * List directory content
 * @param path
 */
export async function ls(path: string): Promise<Array<string>> {
    return await fs.readdir(path)
}


export async function getExactFilename(start: string) {
    const files = await ls('./')
}

