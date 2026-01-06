import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = __dirname;
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const ASSETS_DIR = path.join(SRC_DIR, 'assets');

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico'];
const CODE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.html', '.json'];

function getAllFiles(dir, exts) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(file, exts));
        } else {
            if (exts.includes(path.extname(file).toLowerCase())) {
                results.push(file);
            }
        }
    });
    return results;
}

function getAllCodeContent(dir) {
    let content = '';
    const files = getAllFiles(dir, CODE_EXTENSIONS);
    files.forEach(file => {
        try {
            content += fs.readFileSync(file, 'utf8') + '\n';
        } catch (e) {
            console.error(`Error reading ${file}: ${e}`);
        }
    });
    return content;
}

console.log('Starting cleanup...');
try {
    const assets = getAllFiles(ASSETS_DIR, IMAGE_EXTENSIONS);
    console.log(`Found ${assets.length} assets.`);

    const codeContent = getAllCodeContent(SRC_DIR);

    let deletedCount = 0;
    assets.forEach(asset => {
        const filename = path.basename(asset);
        // Check if basename exists in code content
        if (!codeContent.includes(filename)) {
            console.log(`Deleting unused: ${filename}`);
            try {
                fs.unlinkSync(asset);
                deletedCount++;
            } catch (e) {
                console.error(`Failed to delete ${filename}: ${e}`);
            }
        }
    });

    console.log(`Cleanup finished. Deleted ${deletedCount} files.`);

    // Attempt git push
    console.log('Attempting git push...');
    exec('git push', (error, stdout, stderr) => {
        if (error) {
            console.error(`Git push error: ${error.message}`);
            return;
        }
        if (stderr) console.error(`Git push stderr: ${stderr}`);
        console.log(`Git push stdout: ${stdout}`);
    });

} catch (e) {
    console.error('An error occurred:', e);
}
