import { promises as fs } from 'fs'
import { constants } from 'fs/promises'
import appRootPath from 'app-root-path'
import * as _ from 'lodash'
import sharp from 'sharp'

/**
 * Check if a file exists
 * @param relativePath
 */
export async function fileExists(relativePath: string): Promise<boolean> {
    try {
        await fs.access(`${appRootPath.path}/${relativePath}`, constants.F_OK)
        return true
    } catch (e: unknown) {
        return false
    }
}

/**
 * List directory content
 * @param relativePath
 */
export async function ls(relativePath: string): Promise<Array<string>> {
    try {
        return await fs.readdir(`${appRootPath.path}/${relativePath}`)
    } catch {
        return [];
    }
}

/**
 * Delete a file
 * @param relativePath
 */
export async function deleteFile(relativePath: string): Promise<void> {
    await fs.rm(`${appRootPath.path}/${relativePath}`);
}

/**
 * Delete a folder
 * @param relativePath
 */
export async function deleteFolder(relativePath: string): Promise<void> {
    const files = await ls(relativePath);
    if (files.length > 0) {
        for (let file of files) {
            await deleteFile(`images/thumb/${file}`);
        }
    }
    let folderName = `${appRootPath.path}/${relativePath}`;
    try {
        await fs.rmdir(folderName);
    } catch ({message}) {
        // Log the error message
    }
}

/**
 * Get the exact file name
 * @param start
 */
export async function exactFilename(start: string): Promise<string> {
    const files = await ls(`images/full`)
    const filteredValues = files.filter((element: string) =>
        _.startsWith(element, `${start}.`)
    )
    if (filteredValues.length === 0) throw new Error('Inexistant file')
    return filteredValues.reduce((element: string) => element)
}

/**
 * Resizes an image according to filename, width and height constraints
 * @param filename
 * @param width
 * @param height
 */
export async function resizeImage(
    filename: string,
    width: number,
    height: number
): Promise<void> {
    await ensureThumbFolderExists()
    if (await exactResizeExists(filename, width, height)) return
    const imageName = await exactFilename(filename)
    await sharp(`${appRootPath.path}/images/full/${imageName}`)
        .resize({ width: width, height: height })
        .toFile(`${appRootPath.path}/images/thumb/${imageName}`)
}

/**
 * Check whether a resized image with same dimensions exist
 * @param filename
 * @param width
 * @param height
 */
export async function exactResizeExists(
    filename: string,
    width: number,
    height: number
): Promise<boolean> {
    const imageName = await exactFilename(filename);
    try {
        const metadata = await sharp(
            `${appRootPath.path}/images/thumb/${imageName}`
        ).metadata();
        return metadata.width === width && metadata.height === height;
    } catch {
        return false
    }
}

/**
 * Create thumb folder if not exists
 */
export async function ensureThumbFolderExists(): Promise<void> {
    if (!(await fileExists('images/thumb'))) {
        try {
            await fs.mkdir(`${appRootPath.path}/images/thumb`)
        } catch ({ code, message }) {
            console.log(`mkdir result -> ${message}`)
        }
    }
}
