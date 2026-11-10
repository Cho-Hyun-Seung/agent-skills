# Agent Skills

AI 에이전트가 재사용할 수 있는 스킬 모음입니다.

## 스킬 목록

| 스킬 | 설명 | 사용 지침 |
| --- | --- | --- |
| [Grilling](skills/grilling/README.md) | 근거와 의존 관계를 바탕으로 계획, 아이디어, 기술 아키텍처를 검토합니다. 체계적인 질문, 위험 및 상충 관계 분석, 의사결정 기록, 구현 전 확인 절차를 포함합니다. | [SKILL.md](skills/grilling/SKILL.md) |

## 적용 가이드

아래는 Grilling을 적용하는 예시입니다. 다른 스킬은 `grilling`을 해당 스킬의 폴더 이름으로 바꾸면 됩니다. 메뉴와 제공 기능은 앱 버전 및 워크스페이스 설정에 따라 달라질 수 있습니다.

### Codex 플러그인 설치

터미널에서 마켓플레이스를 등록하고 플러그인을 설치합니다.

```bash
codex plugin marketplace add Cho-Hyun-Seung/agent-skills
codex plugin add agent-skills@cho-hyun-seung
```

설치 후 새 Codex 세션에서 `$` 목록의 `grilling`을 선택하고 요청합니다.

```text
$grilling 현재 프로젝트의 API 설계를 검토해줘. 질문과 권장안은 한국어로 작성해줘.
```

공식 문서: [Codex 플러그인 패키징](https://developers.openai.com/plugins/build/plugins), [플러그인 CLI 명령](https://learn.chatgpt.com/docs/developer-commands).

### Claude Code 플러그인 설치

Claude Code 대화창에서 다음 명령을 순서대로 실행합니다.

```text
/plugin marketplace add Cho-Hyun-Seung/agent-skills
/plugin install agent-skills@cho-hyun-seung
```

설치 후 새 세션에서 플러그인 이름이 포함된 명령으로 호출합니다.

```text
/agent-skills:grilling 현재 프로젝트의 API 설계를 검토해줘. 질문과 권장안은 한국어로 작성해줘.
```

터미널에서 등록·설치하려면 같은 작업을 다음과 같이 실행할 수 있습니다.

```bash
claude plugin marketplace add Cho-Hyun-Seung/agent-skills
claude plugin install agent-skills@cho-hyun-seung
```

위 마켓플레이스는 이 GitHub 저장소에서 배포하는 카탈로그입니다. 공식 공개 디렉터리 등재와는 별개입니다. 플러그인 설치에는 기존의 스킬 폴더와 MIT 라이선스가 함께 포함됩니다.

공식 문서: [Claude Code 마켓플레이스 만들기](https://code.claude.com/docs/en/plugins/create-marketplace), [플러그인 스킬 호출](https://code.claude.com/docs/en/skills).

### Claude 웹·데스크톱에서 스킬 직접 업로드

1. 이 저장소를 내려받고 `skills/grilling` 폴더를 ZIP으로 압축합니다. 저장소 전체가 아닌 스킬 폴더 하나를 압축하고, `LICENSE`도 함께 포함합니다.
2. Claude 설정에서 코드 실행 및 파일 생성 기능을 활성화합니다. 조직 계정에서는 관리자가 Skills 사용을 허용해야 할 수 있습니다.
3. **Customize → Skills → + → Create skill → Upload a skill**에서 ZIP 파일을 업로드하고 스킬을 활성화합니다.
4. 새 대화에서 다음과 같이 요청합니다.

```text
grilling 스킬을 사용해서 아래 서비스 설계를 검토해줘.
표준 검토(Standard) 모드로 진행하고 질문과 권장안을 한국어로 작성해줘.

[설계 내용]
```

ZIP 내부 구조는 다음과 같이 스킬 폴더가 최상위에 오도록 구성합니다.

```text
grilling.zip
└── grilling/
    ├── SKILL.md
    ├── README.md
    └── LICENSE
```

Windows PowerShell에서는 저장소 최상위 폴더에서 다음 명령으로 압축할 수 있습니다.

```powershell
Compress-Archive -Path ./skills/grilling -DestinationPath ./grilling.zip
```

공식 문서: [Claude 스킬 사용](https://support.claude.com/en/articles/12512180-use-skills-in-claude), [사용자 스킬 구성 및 압축](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills).

### Claude Code에서 스킬 폴더 직접 설치

`skills/grilling` 폴더 전체를 적용할 프로젝트의 `.claude/skills/grilling`에 복사합니다. 개인의 모든 프로젝트에서 사용하려면 `~/.claude/skills/grilling`에 배치합니다. 두 경우 모두 `SKILL.md`, `README.md`, `LICENSE`를 함께 유지합니다.

```text
적용할 프로젝트/
└── .claude/
    └── skills/
        └── grilling/
            ├── SKILL.md
            ├── README.md
            └── LICENSE
```

적용할 프로젝트에서 Claude Code를 열고 다음과 같이 실행합니다.

```text
/grilling 현재 프로젝트의 API 설계를 검토해줘. 질문과 권장안은 한국어로 작성해줘.
```

공식 문서: [Claude Code 스킬 위치 및 호출 방법](https://code.claude.com/docs/en/skills).

### ChatGPT

ChatGPT 데스크톱 앱의 독립 스킬 기능을 기준으로 안내합니다.

1. 사이드바의 **Skills**를 열어 스킬 기능을 사용할 수 있는지 확인합니다.
2. 새 대화에 `skills/grilling`의 `SKILL.md`, `README.md`, `LICENSE`를 첨부하고, `@` 목록에서 **skill-creator**를 선택합니다.
3. 다음과 같이 요청한 뒤, 생성된 스킬의 내용과 설치 안내를 확인해 설치합니다.

```text
@skill-creator 첨부한 파일을 바탕으로 grilling 스킬을 등록할 수 있게 준비해줘.
SKILL.md의 지침과 이름, README.md의 출처, LICENSE의 저작권 고지를 유지해줘.
```

4. 설치 후 새 대화에서 `@`를 입력하고 **grilling** 스킬을 선택한 다음 검토할 내용을 전달합니다.

```text
@grilling 아래 서비스 설계를 표준 검토(Standard) 모드로 검토해줘.
질문과 권장안은 한국어로 작성해줘.

[설계 내용]
```

`@grilling`은 설치된 스킬을 목록에서 선택해 사용합니다. Skills 기능을 사용할 수 없는 환경에서는 `SKILL.md`를 대화에 첨부하고 아래처럼 해당 대화에 적용할 수 있습니다.

```text
첨부한 SKILL.md의 Grilling 절차를 이 대화에 적용해줘.
아래 계획을 검토하고, 질문과 권장안은 한국어로 작성해줘.

[계획 내용]
```

파일 첨부 방식은 해당 대화에 지침을 제공하는 방법이며, 스킬 설치나 다른 대화로의 자동 적용을 의미하지 않습니다.

공식 문서: [ChatGPT 스킬 만들기 및 사용](https://learn.chatgpt.com/docs/build-skills), [Skills와 Plugins](https://learn.chatgpt.com/docs/skills-and-plugins).

## 원본 스킬 출처

| 스킬 | 원저자 및 저장소 | 원본 파일 | 원본 라이선스 |
| --- | --- | --- | --- |
| Grilling | Matt Pocock — [mattpocock/skills](https://github.com/mattpocock/skills) | [skills/productivity/grilling/SKILL.md](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/grilling/SKILL.md) | [MIT](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/LICENSE), Copyright (c) 2026 Matt Pocock |

이 저장소의 Grilling은 원본의 의존 관계 기반 의사결정 트리, 라운드별 질문, 구현 전 확인 절차를 바탕으로 확장한 버전입니다. 근거 기반 조사, 기술 아키텍처 검증, 보안 및 신뢰성 검토, 위험 우선순위 지정, 의사결정 기록 등을 추가했습니다.

## 라이선스

이 저장소의 자체 작성 및 수정 부분에는 [MIT 라이선스](LICENSE)를 적용합니다. Grilling에 포함된 원본 유래 부분의 저작권은 Matt Pocock에게 있으며, 원본 MIT 라이선스 전문은 [skills/grilling/LICENSE](skills/grilling/LICENSE)에 보존했습니다. 스킬 폴더만 배포하는 경우에도 해당 라이선스 파일을 함께 포함해야 합니다.
