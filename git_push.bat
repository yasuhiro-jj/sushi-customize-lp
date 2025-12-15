@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Gitの状態を確認中...
git status

if %errorlevel% neq 0 (
    echo Gitリポジトリが初期化されていません。初期化しますか？ (Y/N)
    set /p init_choice=
    if /i "%init_choice%"=="Y" (
        git init
        echo Gitリポジトリを初期化しました。
    ) else (
        echo 処理を中断しました。
        exit /b 1
    )
)

echo.
echo 変更をステージング中...
git add .

echo.
echo コミットメッセージを入力してください:
set /p commit_msg="> "
if "%commit_msg%"=="" set commit_msg=UI調整とレスポンシブ対応の改善

echo.
echo コミット中...
git commit -m "%commit_msg%"

echo.
echo リモートリポジトリが設定されているか確認中...
git remote -v

if %errorlevel% neq 0 (
    echo リモートリポジトリが設定されていません。
    echo リモートリポジトリのURLを入力してください（Enterでスキップ）:
    set /p remote_url="> "
    if not "%remote_url%"=="" (
        git remote add origin "%remote_url%"
        echo リモートリポジトリを追加しました。
    )
)

echo.
echo プッシュしますか？ (Y/N)
set /p push_choice="> "
if /i "%push_choice%"=="Y" (
    echo プッシュ中...
    git push -u origin main
    if %errorlevel% neq 0 (
        git push -u origin master
    )
    echo プッシュが完了しました。
) else (
    echo プッシュをスキップしました。
)

pause
