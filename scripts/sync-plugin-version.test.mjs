import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const files = ['plugin.json', '.claude-plugin/plugin.json', '.codex-plugin/plugin.json'];

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'agent-skills-version-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'scripts'));
  cpSync(join(dirname(fileURLToPath(import.meta.url)), 'sync-plugin-version.mjs'), join(root, 'scripts/sync-plugin-version.mjs'));
  writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'agent-skills', version: '1.0.1' }));
  for (const file of files) {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    writeFileSync(join(root, file), '{\n  "name": "agent-skills",\n  "version": "1.0.0",\n  "description": "Keep this formatting"\n}\n');
  }
  return {
    root,
    run: (...args) => spawnSync(process.execPath, [join(root, 'scripts/sync-plugin-version.mjs'), ...args], { encoding: 'utf8' }),
    read: (file) => readFileSync(join(root, file), 'utf8')
  };
}

test('check rejects mismatches without changing manifests', (t) => {
  const f = fixture(t);
  const before = files.map(f.read);
  assert.equal(f.run('--check').status, 1);
  assert.deepEqual(files.map(f.read), before);
});

test('sync updates all manifests and preserves other content', (t) => {
  const f = fixture(t);
  const expected = files.map((file) => f.read(file).replace('1.0.0', '1.0.1'));
  assert.equal(f.run().status, 0);
  assert.deepEqual(files.map(f.read), expected);
  assert.equal(f.run('--check').status, 0);
  assert.equal(f.run().status, 0);
  assert.deepEqual(files.map(f.read), expected);
});

test('invalid manifest prevents partial version writes', (t) => {
  const f = fixture(t);
  writeFileSync(join(f.root, files[2]), '{"name":"another-plugin","version":"1.0.0"}');
  const before = files.map(f.read);
  assert.equal(f.run().status, 1);
  assert.deepEqual(files.map(f.read), before);
});

test('invalid package version prevents writes', (t) => {
  const f = fixture(t);
  writeFileSync(join(f.root, 'package.json'), '{"name":"agent-skills","version":"invalid"}');
  const before = files.map(f.read);
  assert.equal(f.run().status, 1);
  assert.deepEqual(files.map(f.read), before);
});
