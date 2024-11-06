---
title: JSON Web 密钥 (JSON Web Key, JWK)
tags: [oidc, jose]
description: JSON Web 密钥 (JWK) 是用于表示加密密钥的基于 JSON 的格式。当需要将多个 JWK 组合在一起时，它们会被组织成一个 JSON Web 密钥 Set (JWKS)。
---

## 什么是 JSON Web 密钥 (JWK)？

JSON Web 密钥 (JWK) 是用于表示加密密钥的基于 JSON 的格式。它广泛用于 <Ref slug="jws" /> 和 <Ref slug="jwe" /> 的上下文中，以验证 <Ref slug="jwt">JSON Web Tokens (JWT)</Ref> 的完整性和机密性。它也用于 <Ref slug="openid-connect" /> 中进行身份和访问管理。

例如，一个 PEM 编码的 ECDSA 公钥：

```
-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEF/xQdbOho2Jw0hgmNPD0VAEPAgkQrfD4
f1Qx3y49cUm646fMBX9DYx+43HzXm6VdX77uFymz90aO4dBunpTdUzLFRAiT7+In
gzZGDrIE+FG6CcqQuRP65r65SUzDOmP5
-----END PUBLIC KEY-----
```

...可以表示为一个 JWK：

```json
{
  "kty": "EC",
  "crv": "P-384",
  "x": "F_xQdbOho2Jw0hgmNPD0VAEPAgkQrfD4f1Qx3y49cUm646fMBX9DYx-43HzXm6Vd",
  "y": "X77uFymz90aO4dBunpTdUzLFRAiT7-IngzZGDrIE-FG6CcqQuRP65r65SUzDOmP5"
}
```

## JWK 如何工作？

由于 JWK 是一种基于 JSON 的格式，与传统的格式如 PEM 相比，它可以携带关于密钥的丰富元数据。下面是 JWK 中的一些常见属性：

- `kty` (Key Type): 使用密钥的加密算法家族。常见值包括 `RSA`、`EC` 和 `oct`。在 [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518) 中，`EC` 被标记为“推荐+”。
- `use` (Public Key Use): 公钥的预期用途。常见值包括 `sig` (签名) 和 `enc` (加密)。
- `key_ops` (Key Operations): 密钥支持的操作。常见值包括 `sign`、`verify`、`encrypt` 和 `decrypt`。
- `alg` (Algorithm): 预期使用该密钥的算法。根据密钥类型，算法可能会有所不同。例如，`RS256` 可能用于 RSA 密钥，而 `ES256` 可能用于 EC 密钥。
- `kid` (Key ID): 密钥的唯一标识符。它可以用于在一组密钥中匹配一个特定的密钥。

除了 `kty`，其他所有属性都是可选的，可以用于提供关于密钥的附加上下文。根据 `kty` 的值，其他属性可能是必需的或可选的。在上面的例子中，JWK 表示一个 ECDSA 密钥 (`kty: "EC"`)，使用 P-384 曲线 (`crv: "P-384"`)。`x` 和 `y` 属性包含公钥坐标。

下面是一个 RSA 公钥 JWK 的非规范示例：

```json
{
  "kty": "RSA",
  "use": "sig",
  "alg": "RS256",
  "n": "0vx7agoebGcQSuuPiLJXZpt...-TmV4HCA1T8jXg3fE2VbA",
  "e": "AQAB",
  "kid": "2011-04-29-1234"
}
```

有关 JWK 属性及其含义的详细信息，请参阅 [RFC 7517](https://datatracker.ietf.org/doc/html/rfc7517)。

## JSON Web 密钥 Set (JWKS) ||json-web-key-set-jwks||

当需要将多个 JWK 组合在一起时，它们会被组织成一个 JSON Web 密钥 Set (JWKS)。JWKS 是一个 JSON 对象，包含一个 JWK 数组。在 <Ref slug="openid-connect-discovery" /> 中，通常在 `jwks_uri` 端点的响应中使用它来提供 JWT <Ref slug="signing-key" /> 验证的公钥。

以下是一个包含两个 JWK 的 JWKS 的非规范示例：

```json
{
  "keys": [
    {
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "n": "0vx7agoebGcQSuuPiLJXZpt...-TmV4HCA1T8jXg3fE2VbA",
      "e": "AQAB",
      "kid": "2011-04-29-1234"
    },
    {
      "kty": "EC",
      "crv": "P-384",
      "x": "F_xQdbOho2Jw0hgmNPD0VAEPAgkQrfD4f1Qx3y49cUm646fMBX9DYx-43HzXm6Vd",
      "y": "X77uFymz90aO4dBunpTdUzLFRAiT7-IngzZGDrIE-FG6CcqQuRP65r65SUzDOmP5"
    }
  ]
}
```

在这个示例中，JWKS 包含两个 JWK：一个 RSA 密钥和一个 EC 密钥。`keys` 属性是一个 JWK 数组，每一个代表一个不同的密钥。

<SeeAlso slugs={["jwt", "jws", "signing-key", "openid-connect-discovery"]} />

<Resources
  urls={[
    "https://tools.ietf.org/html/rfc7517",
    "https://tools.ietf.org/html/rfc7518",
    "https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata",
  ]}
/>
