import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

try {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(pkg.version)) {
    throw new Error(`Invalid package version: ${pkg.version}`);
  }
  const files = ['plugin.json', '.claude-plugin/plugin.json', '.codex-plugin/plugin.json'];
  // Read and validate every manifest before writing any of them.
  const manifests = files.map((file) => {
    const path = resolve(root, file);
    const source = readFileSync(path, 'utf8');
    const manifest = JSON.parse(source);
    if (manifest.name !== pkg.name) throw new Error(`Plugin name differs: ${file}`);
    if (typeof manifest.version !== 'string') throw new Error(`Missing version: ${file}`);
    const updated = source.replace(/("version"\s*:\s*")[^"]*(")/, `$1${pkg.version}$2`);
    if (JSON.parse(updated).version !== pkg.version) throw new Error(`Cannot update version: ${file}`);
    return { file, path, source, updated, version: manifest.version };
  });
  const outdated = manifests.filter((manifest) => manifest.version !== pkg.version);
  if (check && outdated.length) {
    throw new Error(`Expected ${pkg.version}: ${outdated.map((manifest) => `${manifest.file} (${manifest.version})`).join(', ')}`);
  }
  if (!check) {
    for (const manifest of outdated) writeFileSync(manifest.path, manifest.updated);
  }
  console.log(`Plugin versions ${check ? 'verified' : 'synchronized'}: ${pkg.version}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
