import {promises as fs} from 'fs';
import {constants} from "fs/promises";
import appRootPath from "app-root-path";
import * as _ from 'lodash';
import sharp from "sharp";


/**
 * Check if a file exists
 * @param relativePath
 */
export async function fileExists(relativePath: string): Promise<boolean> {
    try {
        await fs.access(`${appRootPath.path}/${relativePath}`, constants.F_OK)
        return true;
    } catch (e: unknown) {
        console.log(e);
        return false;
    }
}

/**
 * List directory content
 * @param relativePath
 */
export async function ls(relativePath: string): Promise<Array<string>> {
    return await fs.readdir(`${appRootPath.path}/${relativePath}`);
}


/**
 * Get the exact file name
 * @param start
 */
export async function exactFilename(start: string) {
    const files = await ls(`images/full`);
    console.log(files, `${start}.`);
    const filteredValues = files.filter((element: string) => _.startsWith(element, `${start}.`))
    if (filteredValues.length === 0) throw new Error('Inexistant file');
    return filteredValues.reduce((element: string) => element);
}


/**
 * Resizes an image according to filename, width and height constraints
 * @param filename
 * @param width
 * @param height
 */
export async function resizeImage(filename: string, width: number, height: number) {
    // Todo: if same transformation exists just return the old one
    const imageName = await exactFilename(filename);
    await sharp(`${appRootPath.path}/images/full/${imageName}`)
        .resize({width: width, height: height})
        .toFile(`${appRootPath.path}/images/thumb/${imageName}`);
}

