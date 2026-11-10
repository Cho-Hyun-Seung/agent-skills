# Agent Skills

계획과 기술 설계를 구체적인 질문과 근거로 검토하는 AI 에이전트 스킬 모음입니다. Codex와 Claude Code에서는 플러그인으로 설치하고, Claude와 ChatGPT에서는 스킬 파일을 가져와 사용할 수 있습니다.

## 제공 스킬

| 스킬 | 이런 상황에 사용하세요 | 자세히 보기 |
| --- | --- | --- |
| Grilling | 구현 전에 계획의 빈틈, 설계 의존 관계, 보안·신뢰성 위험과 대안을 검토하고 싶을 때 | [사용 안내](skills/grilling/README.md) · [전체 지침](skills/grilling/SKILL.md) |

## 빠른 시작

### Codex

터미널에서 실행합니다.

```bash
codex plugin marketplace add Cho-Hyun-Seung/agent-skills
codex plugin add agent-skills@cho-hyun-seung
```

새 세션에서 `$` 목록의 `grilling`을 선택하고 검토할 내용을 전달하세요.

```text
$grilling 아래 서비스 설계를 검토해줘. 질문과 권장안은 한국어로 작성해줘.

[설계 내용]
```

### Claude Code

Claude Code 대화창에서 실행합니다.

```text
/plugin marketplace add Cho-Hyun-Seung/agent-skills
/plugin install agent-skills@cho-hyun-seung
```

새 세션에서 다음과 같이 호출하세요.

```text
/agent-skills:grilling 아래 서비스 설계를 검토해줘. 질문과 권장안은 한국어로 작성해줘.

[설계 내용]
```

터미널에서 설치하려면 다음 명령을 사용합니다.

```bash
claude plugin marketplace add Cho-Hyun-Seung/agent-skills
claude plugin install agent-skills@cho-hyun-seung
```

## Grilling 사용 방법

검토할 계획이나 설계와 함께 목표, 제약 조건, 이미 결정한 내용을 전달하세요. Grilling은 선행 결정이 끝난 질문들을 묶어서 권장안과 함께 제시합니다. 답변에 따라 검토 범위를 확장하고, 마지막에는 결정 사항·위험·검증 기준을 정리합니다. 구현은 사용자의 명시적인 확인 후 진행합니다.

| 모드 | 적합한 작업 |
| --- | --- |
| Quick | 작은 기능이나 되돌리기 쉬운 결정 |
| Standard | 일반적인 애플리케이션·API·데이터 설계. 기본 모드 |
| Deep | 보안이 중요하거나 복잡한 분산 시스템·인프라 설계 |

예를 들어 “Deep 모드로 인증 설계를 검토해줘”처럼 원하는 깊이를 지정할 수 있습니다.

## 업데이트

### Codex

마켓플레이스의 최신 정보를 가져온 다음 플러그인을 설치해 최신 버전을 반영합니다.

```bash
codex plugin marketplace upgrade cho-hyun-seung
codex plugin add agent-skills@cho-hyun-seung
```

### Claude Code

터미널에서 마켓플레이스와 플러그인을 업데이트합니다.

```bash
claude plugin marketplace update cho-hyun-seung
claude plugin update agent-skills@cho-hyun-seung
```

업데이트 후 새 세션을 시작하세요. 버전별 변경 사항은 [릴리스 태그](https://github.com/Cho-Hyun-Seung/agent-skills/tags)와 배포 PR에 포함된 변경 내역에서 확인할 수 있습니다. 자동 업데이트 여부는 사용하는 앱의 설정에 따릅니다.

## Claude·ChatGPT에서 직접 사용하기

### Claude 웹·데스크톱

1. [저장소 ZIP](https://github.com/Cho-Hyun-Seung/agent-skills/archive/refs/heads/main.zip)을 내려받아 압축을 풉니다.
2. `skills/grilling` 폴더 하나를 ZIP으로 압축합니다. 내부에 `grilling/SKILL.md`, `grilling/README.md`, `grilling/LICENSE`가 포함되어야 합니다.
3. Claude에서 코드 실행·파일 생성 기능을 켜고 **Customize → Skills → + → Create skill → Upload a skill**로 ZIP을 업로드합니다.
4. 스킬을 활성화한 뒤 새 대화에서 “grilling 스킬로 아래 계획을 검토해줘”라고 요청합니다.

Windows PowerShell에서는 내려받은 저장소 폴더에서 ZIP을 만들 수 있습니다.

```powershell
Compress-Archive -Path ./skills/grilling -DestinationPath ./grilling.zip
```

### ChatGPT

독립 스킬 기능을 제공하는 ChatGPT 데스크톱 앱에서는 다음과 같이 가져올 수 있습니다.

1. 사이드바에서 **Skills**를 확인합니다.
2. 새 대화에 `skills/grilling`의 `SKILL.md`, `README.md`, `LICENSE`를 첨부하고, `@` 목록에서 **skill-creator**를 선택합니다.
3. “첨부한 스킬을 이름·지침·출처·라이선스를 유지해 설치할 수 있게 준비해줘”라고 요청하고 결과를 확인해 설치합니다.
4. 새 대화에서 `@` 목록의 **grilling**을 선택하고 검토할 내용을 전달합니다.

스킬 설치 기능을 사용할 수 없다면 `SKILL.md`를 대화에 첨부하고 “첨부한 Grilling 절차로 아래 계획을 검토해줘”라고 요청하세요. 이 방법은 해당 대화에만 적용됩니다.

직접 업로드한 스킬은 새 버전이 나오면 파일을 다시 가져와 갱신하세요. 제공 기능과 메뉴는 앱 버전 및 워크스페이스 설정에 따라 달라질 수 있습니다.

## 문제 해결

- **스킬이 보이지 않아요:** 설치한 앱에서 새 세션을 시작하고 플러그인이 활성화되어 있는지 확인하세요.
- **Claude Code에서 명령을 찾지 못해요:** 플러그인으로 설치했다면 `/agent-skills:grilling`을 사용하세요.
- **기대와 다른 검토가 시작돼요:** 검토 모드, 목표, 제약 조건과 검토할 내용을 함께 전달하세요.

문제가 계속되면 사용 중인 앱·버전과 재현 방법을 [Issues](https://github.com/Cho-Hyun-Seung/agent-skills/issues)에 남겨주세요.

## 원본 스킬 출처

Grilling은 Matt Pocock의 [mattpocock/skills](https://github.com/mattpocock/skills)에 있는 [원본 grilling](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/grilling/SKILL.md)을 바탕으로 확장했습니다. 의존 관계 기반 질문 절차에 근거 기반 조사, 아키텍처·보안·신뢰성 검토, 위험 분석과 의사결정 기록을 추가했습니다.

## 라이선스

[MIT 라이선스](LICENSE)를 따릅니다. 원본 유래 부분의 Copyright (c) 2026 Matt Pocock 고지와 MIT 전문은 [스킬 LICENSE](skills/grilling/LICENSE)에 보존했습니다. 재배포할 때는 해당 저작권 고지와 라이선스를 함께 포함하세요.

## 기여하기

스킬 개선과 오류 제안을 환영합니다. 개발 환경과 변경·릴리스 절차는 [기여 가이드](CONTRIBUTING.md)를 참고하세요.

## 참고 문서

- [Codex 플러그인 명령](https://learn.chatgpt.com/docs/developer-commands)
- [Claude Code 플러그인 설치·업데이트](https://code.claude.com/docs/en/plugins/install)
- [Claude 스킬 사용](https://support.claude.com/en/articles/12512180-use-skills-in-claude)
- [ChatGPT 스킬 사용](https://learn.chatgpt.com/docs/build-skills)
