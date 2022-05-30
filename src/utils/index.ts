import { createHash } from 'crypto';
import { extname } from 'path';

export const generateFilename = (filename: string) => {
    // Get the filename
    const newFilename = filename.split('.')[0];
    // Get the file extension name
    const ext = extname(filename);

    // Generate a hash
    const md5 = createHash('md5');
    const hash = md5.update(Date.now().toString()).digest('hex');

    return `${newFilename}_${hash}${ext}`;
}

export const isImageFile = (filename: string) => {
    // Get the file extension name
    const ext = extname(filename);
    // Check if the file is a image file
    return ext.match(/.(jpg|jpeg|png)$/);
}