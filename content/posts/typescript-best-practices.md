---
title: "TypeScript開発のベストプラクティス"
date: "2025-10-14"
tags: ["TypeScript", "Best Practices", "JavaScript"]
description: "TypeScriptを使った開発で押さえておきたいベストプラクティスを紹介。型安全性を保ちながら、生産性の高いコードを書くためのTipsをまとめました。"
draft: false
---

## TypeScriptとは

TypeScriptは、JavaScriptに静的型付けを追加したプログラミング言語です。大規模なアプリケーション開発において、型安全性とコードの保守性を向上させます。

## ベストプラクティス

### 1. Strict Modeを有効にする

`tsconfig.json`でStrict Modeを有効にすることで、より厳格な型チェックが行われます。

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

これにより、以下のオプションが有効になります：

- `strictNullChecks`: null/undefinedの扱いを厳格に
- `strictFunctionTypes`: 関数の型チェックを厳格に
- `noImplicitAny`: 暗黙的なany型を禁止

### 2. anyを避ける

`any`型は型安全性を損ないます。代わりに、適切な型を定義しましょう。

\`\`\`typescript
// ❌ 悪い例
function processData(data: any) {
  return data.value;
}

// ✅ 良い例
interface Data {
  value: string;
}

function processData(data: Data) {
  return data.value;
}
\`\`\`

不明な型の場合は`unknown`を使用：

\`\`\`typescript
function handleResponse(response: unknown) {
  if (typeof response === 'string') {
    console.log(response.toUpperCase());
  }
}
\`\`\`

### 3. インターフェースと型エイリアスを使い分ける

**Interface**: オブジェクトの形状を定義

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

**Type Alias**: ユニオン型、タプル、プリミティブ型など

\`\`\`typescript
type Status = 'pending' | 'active' | 'inactive';
type ID = string | number;
\`\`\`

### 4. ジェネリクスを活用する

再利用可能な型定義にはジェネリクスを使用：

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: string;
  name: string;
}

const response: ApiResponse<User> = {
  data: { id: '1', name: 'John' },
  status: 200,
  message: 'Success',
};
\`\`\`

### 5. Utility Typesを活用する

TypeScriptには便利な組み込みユーティリティ型があります：

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Partial: すべてのプロパティをオプションに
type PartialUser = Partial<User>;

// Pick: 特定のプロパティのみ
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit: 特定のプロパティを除外
type PublicUser = Omit<User, 'password'>;

// Required: すべてのプロパティを必須に
type RequiredUser = Required<PartialUser>;
\`\`\`

### 6. 型ガードを使う

型の絞り込みには型ガードを活用：

\`\`\`typescript
interface Cat {
  type: 'cat';
  meow: () => void;
}

interface Dog {
  type: 'dog';
  bark: () => void;
}

type Animal = Cat | Dog;

function makeSound(animal: Animal) {
  if (animal.type === 'cat') {
    animal.meow(); // Catとして型推論される
  } else {
    animal.bark(); // Dogとして型推論される
  }
}
\`\`\`

### 7. readonly修飾子を使う

不変性を保証するには`readonly`を使用：

\`\`\`typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};

// config.apiUrl = 'new-url'; // エラー！
\`\`\`

### 8. 型アサーションは慎重に

型アサーション（`as`）は最小限に：

\`\`\`typescript
// ❌ 避けるべき
const value = something as any as MyType;

// ✅ 型ガードを使う
if (isMyType(something)) {
  // somethingはMyType型として扱われる
}
\`\`\`

## 実践的なTips

### エラーハンドリング

\`\`\`typescript
type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return { success: false, error: new Error('Division by zero') };
  }
  return { success: true, value: a / b };
}

const result = divide(10, 2);
if (result.success) {
  console.log(result.value); // 5
} else {
  console.error(result.error.message);
}
\`\`\`

### 非同期処理の型定義

\`\`\`typescript
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data: User = await response.json();
  return data;
}
\`\`\`

## まとめ

TypeScriptのベストプラクティスを守ることで、型安全で保守性の高いコードを書くことができます。

重要なポイント：

1. Strict Modeを有効にする
2. `any`を避け、適切な型を使う
3. ジェネリクスとUtility Typesを活用
4. 型ガードで安全に型を絞り込む
5. `readonly`で不変性を保証

次回は、TypeScriptとReactの組み合わせについて解説します！
