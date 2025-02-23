import fs from 'fs';
import path from 'path';
import packageJson from '../package.json';

/**
 * package.json の version と同じ値で dist/manifest.json の version を書き換える
 */
export default function syncManifestVersion() {
  return {
    name: 'sync-manifest-version',
    writeBundle: {
      async handler() {
        const manifestPath = path.resolve(__dirname, '../dist/manifest.json');
        try {
          const manifestJson = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
          manifestJson.version = packageJson.version;
          fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2));
          console.log('manifest.json の version を更新しました。');
        } catch (error) {
          console.error('manifest.json の更新に失敗しました。', error);
        }
      },
    },
  };
}
