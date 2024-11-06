---
title: 签名密钥 (Signing key)
tags: [oidc]
description: 签名密钥是一种加密密钥，用于在 OpenID Connect (OIDC) 中签署和验证 JSON Web Tokens (JWT)。它用于确保 OpenID 提供者发行的令牌的完整性和真实性。
---

## 什么是签名密钥 (Signing key)？

在 <Ref slug="openid-connect" /> 的上下文中，一个 **签名密钥**，通常是一个非对称密钥对，用于签署和验证 <Ref slug="jwt">JSON Web Tokens (JWTs)</Ref>。OpenID 提供者使用签名密钥来签署诸如 <Ref slug="id-token">ID 令牌</Ref> 和 <Ref slug="access-token">访问令牌 (access tokens)</Ref> 之类的令牌，以确保它们的完整性和真实性。

虽然签名密钥的概念可以更广泛，但我们将专注于它们在 OIDC 中用来保护令牌的方式。其他用例包括签署电子邮件、文档和软件包，可以从相同的原理中衍生出来。

## 示例：ID 令牌签名

当用户向 OpenID 提供者进行认证 (authentication) 时，提供者会发布一个包含用户信息（<Ref slug="claim">声明 (claims)</Ref>）并由提供者的签名密钥签署的 ID 令牌。由于 ID 令牌是一个 JWT，它由三个部分组成：头部、负载和签名。

### 1. 头部

假设头部是：

```json
{
  "alg": "ES384",
  "typ": "JWT"
}
```

JSON 表明 ID 令牌使用 [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) 算法和 P-384 曲线进行签名。`typ` 字段指定令牌类型为 JWT。

### 2. 负载

负载包含基本的用户信息：

```json
{
  "sub": "1234567890",
  "name": "Alice"
}
```

`sub` 声明是用户的唯一标识符，`name` 是他们的显示名称。

### 3. 签署令牌

根据 JWT 格式，头部和负载应进行 Base64URL 编码，并用 `.` 连接以进行签署：

```
{{header}}.{{payload}}
```

在这种情况下，值将为：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIn0
```

假设 OpenID 提供者使用以下私钥来签署令牌：

```
-----BEGIN PRIVATE KEY-----
MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDBW9PDXInlNT2hjOtQr
g4pkVkyJsKia33dHrsbOG4Z77pfYN7SYZCHh9YdLXTTKinehZANiAAQX/FB1s6Gj
YnDSGCY08PRUAQ8CCRCt8Ph/VDHfLj1xSbrjp8wFf0NjH7jcfNebpV1fvu4XKbP3
Ro7h0G6elN1TMsVECJPv4ieDNkYOsgT4UboJypC5E/rmvrlJTMM6Y/k=
-----END PRIVATE KEY-----
```

要签署令牌，OpenID 提供者需要使用私钥生成签名：

```
signature = sign(header + '.' + payload, private_key)
```

然后 Base64URL 编码的签名为：

```
Cjy6A_FHnwQBP0hRawoGTkRy8m8o0Ncc1q4BeyxYr0fxhKYmJJinIWZPXJdaAXRO9wOFuH2-UML2yWHjot_LnCPO6362asMvgNkEJMZ6UtqyOPlsCOJ7voTPOCT6sYu2
```

### 4. 组装 JWT

最后，OpenID 提供者通过用 `.` 连接头部、负载和签名来组装 JWT：

```
{{header}}.{{payload}}.{{signature}}
```

在这种情况下，ID 令牌将为：

```
eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIn0.Cjy6A_FHnwQBP0hRawoGTkRy8m8o0Ncc1q4BeyxYr0fxhKYmJJinIWZPXJdaAXRO9wOFuH2-UML2yWHjot_LnCPO6362asMvgNkEJMZ6UtqyOPlsCOJ7voTPOCT6sYu2
```

现在 ID 令牌已准备好发送给 <Ref slug="client" /> 进行进一步处理。

### 5. 验证令牌

当客户端收到 ID 令牌时，可以使用 OpenID 提供者的公钥验证签名。通常，公钥通过 <Ref slug="openid-connect-discovery" /> 端点 (`jwks_uri`) 以 <Ref slug="jwk" headingId="json-web-key-set-jwks" /> 格式提供。

在这个例子中，公钥为：

```
-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEF/xQdbOho2Jw0hgmNPD0VAEPAgkQrfD4
f1Qx3y49cUm646fMBX9DYx-43HzXm6VdX77uFymz90aO4dBunpTdUzLFRAiT7+In
gzZGDrIE+FG6CcqQuRP65r65SUzDOmP5
-----END PUBLIC KEY-----
```

对应的 JWK 值为：

```json
{
  "kty": "EC",
  "crv": "P-384",
  "x": "F_xQdbOho2Jw0hgmNPD0VAEPAgkQrfD4f1Qx3y49cUm646fMBX9DYx-43HzXm6Vd",
  "y": "X77uFymz90aO4dBunpTdUzLFRAiT7-IngzZGDrIE-FG6CcqQuRP65r65SUzDOmP5"
}
```

现在，客户端可以使用公钥验证签名。

## 选择正确的算法

有多种算法可用于签署 JWT：

- **对称算法**：HMAC 与 SHA 系列（例如，HS256、HS384、HS512）是使用相同密钥进行签署和验证的对称算法。由于需要在各方之间共享密钥，所以不推荐用于大多数情况。
- **非对称算法**：RSA（例如，RS256、RS384、RS512）和 ECDSA（例如，ES256、ES384、ES512）是使用一对密钥的非对称算法：一个用于签署的私钥和一个用于验证的公钥。
  - RSA 被广泛使用并支持许多库和平台。然而，与 ECDSA 相比，它的密钥大小和签名大小要大得多。
  - ECDSA 的性能更高，生成的签名更小，适合受限环境。由于它不太常见，请确保你的平台支持它。

> 由于性能和安全性的优势，ECDSA 应该是新应用程序的首选。

## 其他签名密钥场景

虽然上面的示例集中于 OIDC 中的 ID 令牌，但签名密钥的概念广泛用于各种场景，如签署电子邮件、文档和软件包。关键原则保持不变：

- 对于对称密钥，签署和验证使用相同的密钥。这适用于各方可以安全地共享密钥的场景，或者单一实体负责签署和验证。
- 对于非对称密钥，使用私钥进行签署，并使用相应的公钥进行验证。这适用于签署和验证各方为不同实体的大多数场景。

<SeeAlso slugs={["jwt", "jws", "jwk", "openid-connect"]} />

<Resources
  urls={[
    "https://blog.logto.io/introduction-to-ec-and-rsa-signing-algorithms-in-jwt",
    "https://tools.ietf.org/html/rfc7515",
    "https://tools.ietf.org/html/rfc7517",
  ]}
/>
