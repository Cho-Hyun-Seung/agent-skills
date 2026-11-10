# 기여 및 릴리스 가이드

Node.js 22 이상과 npm을 사용합니다.

```bash
npm ci
npm run check
```

## 변경 사항 제안

스킬이나 사용자에게 제공되는 기능을 수정하면 변경 요약을 추가합니다.

```bash
npm run changeset
```

`agent-skills`를 선택하고 수정 성격에 맞는 버전 증가를 지정합니다.

- `patch`: 오류 수정, 안내 개선 등 기존 사용 방식이 유지되는 변경
- `minor`: 기존 사용 방식과 호환되는 스킬 또는 기능 추가
- `major`: 기존 사용 방식과 호환되지 않는 변경

생성된 `.changeset/*.md`에는 사용자가 알아야 할 변화와 영향을 작성하고, 변경한 파일과 함께 커밋합니다. 사용자에게 영향이 없는 개발 도구 정리에는 changeset이 필요하지 않습니다.

## 릴리스 흐름

1. changeset이 포함된 변경을 `main`에 병합합니다.
2. GitHub Actions가 버전 증가와 `CHANGELOG.md`를 포함하는 `chore: version skills` PR을 생성하거나 갱신합니다.
3. PR의 변경 내역과 검증 결과를 확인한 뒤 병합합니다.
4. Release 워크플로가 병합된 버전의 Git 태그를 생성합니다. 플러그인은 GitHub 저장소를 통해 배포합니다.

`package.json`의 버전이 기준입니다. 릴리스 PR 생성 과정에서 다음 파일의 버전도 자동으로 맞춥니다.

- `plugin.json`
- `.claude-plugin/plugin.json`
- `.codex-plugin/plugin.json`
- `package-lock.json`

버전을 개별 파일에서 직접 올리지 마세요. 로컬에서 릴리스 결과를 확인하려면 깨끗한 임시 체크아웃에서 `npm run version`을 실행합니다. 이 명령은 changeset을 소비하고 버전·변경 내역 파일을 수정합니다.

```bash
npm run check-plugin-version
npm test
```

## GitHub Actions 설정

저장소의 **Settings → Actions → General → Workflow permissions**에서 **Allow GitHub Actions to create and approve pull requests**를 활성화해야 릴리스 PR을 자동 생성할 수 있습니다. 조직 정책으로 제한된 경우 관리자의 설정이 필요합니다.

워크플로는 GitHub가 제공하는 `GITHUB_TOKEN`을 사용합니다. 패키지는 `private: true`이며 npm에 게시하지 않습니다. `.changeset/config.json`의 `privatePackages` 설정으로 버전 관리와 Git 태그 생성을 활성화합니다.

Actions가 생성한 PR은 기본 `GITHUB_TOKEN`의 제약으로 별도 PR 워크플로가 실행되지 않을 수 있습니다. Release 작업 자체에서 변경 전과 버전 동기화 검사를 수행하며, 병합 후 `main`에서도 전체 검사가 실행됩니다.

참고: [Changesets Action](https://github.com/changesets/action), [Changesets 설정](https://changesets.dev/guide/config).
