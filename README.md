# プロジェクトの概要
プロテインのECサイト。
商品の在庫に制限なし。


# 使用方法、インストール方法、実行方法
- パッケージインストール
```
npm init
# or
yarn
```

- インストールするライブラリ
"@fortawesome/fontawesome-svg-core": "^6.2.1",
"@fortawesome/free-regular-svg-icons": "^6.2.1",
"@fortawesome/free-solid-svg-icons": "^6.2.1",
"@fortawesome/react-fontawesome": "^0.2.0",
"@react-spring/web": "^9.6.0",
"@splidejs/react-splide": "^0.7.12",
"@supabase/supabase-js": "^2.2.0",
"@types/formidable": "^2.0.5",

- サーバー起動
```
npm run dev
# or
yarn dev
```

```
# and
yarn mock-api
```

- テストログイン
```
メールアドレス:test@example.com
パスワード:rakutein
```

# ダミー決済の入力情報について
- カード番号<br>
 4242 4242 4242 4242
- 有効期限<br>
 未来日付ならいつでも良い
- セキュリティコード<br>
 3桁何でもよい
