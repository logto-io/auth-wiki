---
title: JSON Web Token (JWT)
tags: [oidc, jose]
description: JSON Web Token (JWT) 是定义在 RFC 7519 中的一个开放标准，可以在两个实体之间进行安全的通信。它体积小、URL 安全且自包含，使其成为在服务之间传递认证 (Authentication) 和授权 (Authorization) 数据的理想选择。
---

## 什么是 JSON Web Token (JWT)？

JSON Web Token (JWT) 广泛应用于现代 Web 应用和开放标准，如 OpenID Connect，促进认证 (Authentication) 和授权 (Authorization)。虽然官方的 [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519) 是一个重要的参考，但对于初学者而言可能较难理解。在本文中，我们将专注于 JWT 的核心概念，并通过简单的语言和示例进行介绍。

## 为什么我们需要 JWT？

如今，使用 JSON 在两个实体之间交换数据相当常见。考虑一个表示用户的 JSON 对象：

```json
{
  "sub": "foo",
  "name": "John Doe"
}
```

> `sub` 是 "subject" 的缩写，是 OpenID Connect 中的一个[标准声明 (Standard Claim)](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)，用于表示用户标识符 (user ID)。

我们如何保证这个 JSON 对象的完整性？换句话说，如何确保数据在传输过程中没有被篡改？一个常见的解决方案是使用数字签名。例如，我们可以使用[公钥加密](https://en.wikipedia.org/wiki/Public-key_cryptography)：服务器用它的私钥对 JSON 对象签名，客户端可以通过服务器的公钥验证这个签名。

简而言之，JWT 提供了一个标准化的方法来表示 JSON 对象及其签名。

> JWT 也可以用于加密 JSON 对象，但这不是本文的重点。

## JWT 的格式

由于创建数字签名的算法有很多，有必要在 JWT 签名时指定所使用的算法。这通过构建一个 JSON 对象来实现：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

> `alg` 是 "algorithm" 的缩写，`typ` 是 "type" 的缩写。

通常，`typ` 被设置为大写的 `JWT`。在我们的例子中，`alg` 是 `HS256`，即 [HMAC-SHA256](https://en.wikipedia.org/wiki/HMAC)（我们稍后会解释），表示我们使用这个算法来创建签名。

现在，我们拥有一个 JWT 所需的所有组成部分：

- 头部 JSON：算法和类型
- 载荷 JSON：实际数据
- 签名：涵盖头部和载荷的签名

然而，某些字符如空格和换行符对网络传输不友好。因此，头部和载荷需要进行 **Base64URL 编码**。典型的 JWT 如下所示：

```
{{header}}.{{payload}}.{{signature}}
```

> `.` 作为分隔符。

让我们把所有东西结合起来，创建一个 JWT：

### 头部

JSON: `{"alg":"HS256","typ":"JWT"}`

Base64URL 编码: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

### 载荷

JSON: `{"sub":"foo","name":"John Doe"}`

Base64URL 编码: `eyJzdWIiOiJmb28iLCJuYW1lIjoiSm9obiBEb2UifQ`

### 签名

在 HMAC-SHA256 中，使用一个密钥创建签名：

```
HMAC-SHA256(base64Url(header) + "." + base64Url(payload), secret)
```

例如，使用密钥 `some-great-secret`，签名为：`XM-XSs2Lmp76IcTQ7tVdFcZzN4W_WcoKMNANp925Q9g`。

### JWT

最终的 JWT 是：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmb28iLCJuYW1lIjoiSm9obiBEb2UifQ.XM-XSs2Lmp76IcTQ7tVdFcZzN4W_WcoKMNANp925Q9g
```

任何拥有密钥的实体都可以验证该有效 JWT。

## 选择签名算法

如前所述，创建数字签名的算法有很多。我们使用了 `HS256` 作为示例，但它可能不够安全，因为密钥必须在各方之间共享（例如客户端和服务器）。

在实际场景中，客户端可能包括像 React 应用这样的公共应用，无法保证密钥安全。因此，首选的方法是利用公钥加密（即非对称加密）来签署 JWT。让我们从最流行的算法开始：[RSA](https://en.wikipedia.org/wiki/RSA_cryptosystem)。

### RSA

RSA 是一种非对称算法，使用一对密钥：一个公钥和一个私钥。公钥用于验证签名，私钥用于签名。

RSA 的头部 JSON 如下所示：

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

> `RS256` 代表 RSA-SHA256，表示签名是通过 RSA 算法和 SHA256 哈希函数创建的。你也可以使用 `RS384` 和 `RS512` 来创建使用 SHA384 和 SHA512 哈希函数的签名。

使用私钥创建签名：

```
RSA-SHA256(base64Url(header) + "." + base64Url(payload), privateKey)
```

我们同样可以组合这些部分来创建一个 JWT，最终的 JWT 如下所示：

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmb28iLCJuYW1lIjoiSm9obiBEb2UifQ.{{signature}}
```

现在，客户端可以在不知道私钥的情况下验证签名。

### ECDSA

虽然 RSA 被广泛采用，但它的签名大小较大，有时会超过头部和载荷的总大小。椭圆曲线数字签名算法 (ECDSA) 是另一种非对称算法，可以生成更紧凑的签名，并且性能更佳。

为了生成 ECDSA 的私钥，我们需要选择一个曲线。这超出了本文的范围，但你可以在[这里](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Elliptic_Curve_Digital_Signature_Algorithm)找到更多信息。

ECDSA 的头部 JSON 如下所示：

```json
{
  "alg": "ES256",
  "typ": "JWT"
}
```

> `ES256` 代表 ECDSA-SHA256，表示签名是通过 ECDSA 算法和 SHA256 哈希函数创建的。你也可以使用 `ES384` 和 `ES512` 来创建使用 SHA384 和 SHA512 哈希函数的签名。

使用私钥创建签名：

```
ECDSA-SHA256(base64Url(header) + "." + base64Url(payload), privateKey)
```

最终的 JWT 保留与 RSA 相同的结构，但签名显著变短：

```
eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmb28iLCJuYW1lIjoiSm9obiBEb2UifQ.{{signature}}
```

## 验证 JWT

验证 JWT 是创建 JWT 的逆过程，非常简单：

1. 使用 `.` 分隔符将 JWT 分为三部分（头部、载荷和签名）。
2. 使用 Base64URL 解码头部和载荷。
3. 使用头部中指定的算法和公钥（对于非对称算法）验证签名。

有很多可用的库可以帮助完成 JWT 验证，例如用于 Node.js 和 Web 浏览器的 [jose](https://github.com/panva/jose)。

<SeeAlso slugs={['opaque-token', 'id-token', 'access-token']} />