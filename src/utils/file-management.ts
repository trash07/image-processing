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
    await ensureThumbFolderExists();
    if (await exactResizeExists(filename, width, height)) return;
    const imageName = await exactFilename(filename);
    await sharp(`${appRootPath.path}/images/full/${imageName}`)
         .resize({width: width, height: height})
        .toFile(`${appRootPath.path}/images/thumb/${imageName}`);
}

/**
 * Check whether a resized image with same dimensions exist
 * @param filename
 * @param width
 * @param height
 */
export async function exactResizeExists(filename: string, width: number, height: number): Promise<boolean> {
    const imageName = await exactFilename(filename);
    try {
        const metadata = await sharp(`${appRootPath.path}/images/thumb/${imageName}`)
            .metadata();
        return metadata.width === width && metadata.height === height;
    } catch {
        return false;
    }
}


/**
 * Create thumb folder if not exists
 */
export async function ensureThumbFolderExists() {
    if (await fileExists('images/thumb'))
        return;
    await fs.mkdir(`${appRootPath.path}/images/thumb`);
}
