---
title: JSON Web 签名 (JSON Web Signatures, JWS)
tags: [oidc, jose]
description: JSON Web 签名 (JWS) 是一种用于签署和验证 JSON 格式数据的标准方法，通常用于确保 OAuth 2.1 和 OpenID Connect (OIDC) 中 JSON Web Tokens (JWTs) 的完整性和真实性。
---

## 什么是 JSON Web 签名 (JWS)？

JSON Web 签名 (JWS) 定义了一种用于签署和验证 JSON 格式数据的标准方法。它在现代应用程序和开放标准（例如 <Ref slug="openid-connect" />）中被广泛使用，以确保传输数据的完整性和真实性。

当处理 <Ref slug="jwt">JSON Web Tokens (JWTs)</Ref> 时，JWS 尤其有用。例如，一个 <Ref slug="id-token" /> 或 <Ref slug="access-token" /> 可以使用 JWS 签署，并由接收者验证，而无需再次进行网络请求。

## JWS 如何工作？

JWS 使用加密算法对数据进行签署并生成签名。JWS 中有两个主要概念：JWS 头和 JWS 序列化。

### JWS 头

JWS 包含一个头，该头包含关于签署算法和密钥管理的重要元数据。JWS 头中的一些常见属性包括：

- `alg` (Algorithm): 用于签署数据的加密算法。
- `typ` (Type): 令牌类型，例如 JWT。
- `kid` (Key ID): 用于签署数据的密钥的唯一标识符。
- `jku` (JWK Set URL): <Ref slug="jwk" headingId="json-web-key-set-jwks" /> 所在的 URL。

有关 JWS 头属性的详细列表，请参阅 [JOSE Header](https://datatracker.ietf.org/doc/html/rfc7515#section-4)。

### JWS 序列化

JWS 有两种序列化格式：紧凑格式和 JSON 格式。每种格式都有其表示签名数据的方式。

#### 紧凑序列化

在紧凑序列化中，JWS 表示为一个由三个 Base64URL 编码部分组成的字符串，使用点（`.`）分隔。三个部分是：

```
{{header}}.{{payload}}.{{signature}}
```

每个部分都有特定的用途：

- `header`: 关于签署算法和密钥管理的元数据，使用 Base64URL 编码格式。
- `payload`: 被签署的数据，使用 Base64URL 编码格式。
- `signature`: 头和有效载荷的加密签名。

> [!注意]
> 紧凑序列化中不包含未保护的头。

例如，一个 JWS 可能看起来像这样：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIn0.Xv9da66g3y4nxs_0hlR9CBkOG9GkxfPmq1_7u4tNeXE
```

解码 Base64URL 编码的部分后，JWS 包含以下内容：

- 头部：`{"alg":"HS256","typ":"JWT"}`
- 有效载荷：`{"sub":"1234567890","name":"Alice"}`
- 签名：`Xv9da66g3y4nxs_0hlR9CBkOG9GkxfPmq1_7u4tNeXE`

头部指定 JWS 使用 HMAC-SHA256 算法 (`HS256`) 签署，令牌类型是 JWT (`typ: "JWT"`) 的 JSON 格式。有效载荷包含基本的用户信息，例如主题 (`sub`) 和名称 (`name`)。

签名通过以下方式计算：

```
Hash(
  Base64URLEncode(header) || '.' || Base64URLEncode(payload),
  secret
)
```

根据 JWS 头部，在 `Hash` 函数中使用了 HMAC-SHA256 算法，其中 `secret` 是共享密钥 `top-secret`。

关于 JWS 如何与 JWT 一起工作的详细示例，请参阅 <Ref slug="signing-key" /> 文章。

#### JSON 序列化

JSON 序列化提供一种更有结构的方式来表示 JWS。JWS 被表示为具有以下属性的 JSON 对象：

```json
{
  "payload": "{{payload}}",
  "signatures": [
    {
      "protected": "{{protected-header}}",
      "header": "{{header}}",
      "signature": "{{signature}}"
    }
  ]
}
```

- `payload`: Base64URL 编码的有效载荷。这是要签署的数据。
- `signatures`: 签名对象的数组，每个对象包含受保护的头、头和签名。

  每个签名对象可以包括：

  - `protected`: Base64URL 编码的受保护头（紧凑序列化中的 `header`）。
  - `header`: JSON 格式的未受保护头。头不包含在签名中。
  - `signature`: 头和有效载荷的加密签名（在紧凑序列化中为 `signature`）。

例如，一个 JSON 序列化的 JWS 可能如下所示：

```json
{
  "payload": "eyJzdWIiOiIx...bGciOiJIUzI1NiJ9",
  "signatures": [
    {
      "protected": "eyJhbGci...InR5cCI6IkpXVCJ9",
      "header": {
        "kid": "2010-12-29"
      },
      "signature": "Xv9da66g3y4nxs...R9CBkOG9GkxfPmq1_7u4tNeXE"
    },
    {
      "protected": "eyJhbGci...InR5cCI6IkpXVCJ9",
      "header": {
        "kid": "2010-12-30"
      },
      "signature": "Yv9da66g3y4nxs...R9CBkOG9GkxfPmq1_7u4tNeXE"
    }
  ]
}
```

在上述示例中，对于相同的有效载荷有两个签名（`signatures` 数组）。每个签名对象都包含受保护的头、头和签名。

<SeeAlso slugs={["jwt", "jwk", "jwe"]} />

<Resources
  urls={[
    "https://datatracker.ietf.org/doc/html/rfc7515",
    "https://datatracker.ietf.org/doc/html/rfc7516",
    "https://datatracker.ietf.org/doc/html/rfc7517",
  ]}
/>
