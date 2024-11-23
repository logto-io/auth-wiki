---
title: 不透明令牌 (Opaque token)
tags: [oauth 2.0, oidc]
description: 不透明令牌是一种令牌，其格式由发行者决定，通常表现为一串字符或数字，需要通过发行者验证，而不是包含所有必要信息以供直接验证。
---

## 什么是令牌？

在介绍不透明令牌之前，了解什么是令牌很重要：

令牌用于在各方之间表示和传输安全信息，它们支持绝大多数在互联网上幕后发生的<Ref slug="authentication" />和<Ref slug="authorization" />过程。Web 服务中最流行的两种令牌类型是<Ref slug="jwt" />和不透明令牌。

## 什么是不透明令牌？

不透明令牌是以专有格式存在的令牌，你无法访问，通常包含服务器持久存储中信息的某个标识符。

不透明令牌是令牌可以采用的一种形式，<Ref slug="access-token">访问令牌 (access tokens)</Ref>和<Ref slug="refresh-token">刷新令牌 (refresh tokens)</Ref>可以作为不透明令牌存在。不透明令牌的格式由其发行者决定，通常是用于帮助发行者在数据库中检索和识别某些信息的数字和/或字符串。以下是不透明令牌的示例：

```
M-oxIny1RfaFbmjMX54L8Pl-KQEPeQvF6awzjWFA3iq
```

另一方面，JWT 是另一种常见的令牌格式。它是一个包含所有声明和信息的 JSON 字符串，以及来自发行者的签名。默认情况下，它不是加密的，但可以使用<Ref slug="jwe" />标准进行加密。即使 JWT 通常未加密，它也不会影响其安全性——签名的存在确保了令牌内容的完整性，从而可以完全信任 JWT 内的数据。

与 JWT 不同，JWT 包含所有必要的信息，可以直接在受保护资源处进行验证，而不透明令牌不能被资源直接验证。相反，它们需要由不透明令牌的发行者（通常是<Ref slug="authorization-server" />）进行验证。此验证过程通常称为<Ref slug="token-introspection" />。

## 什么是 JWT？

与不透明令牌相反，JWT 是一种自包含的、无状态的令牌，以结构化和可读的格式携带信息。

JWT 由三部分组成：`header`、`payload` 和 `signature`，每部分都以 Base64URL 编码。

以下是一个 JWT 的示例：

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

- `header` 包含有关令牌类型和用于签名的算法的信息。例如，`{"alg": "HS256", "typ": "JWT"}`。
- `payload` 部分包含声明——关于用户或授权的信息片段，如用户 ID、过期时间和范围。因为这些数据是编码的但未加密，所以任何拥有令牌的人都可以解码以查看声明，但他们不能在不使签名无效的情况下更改它。根据规范和授权服务器配置，可以在有效负载中包含各种声明。这赋予了令牌其自包含的特性。例如，`{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}`。
- `signature` 是通过使用指定算法将头部、有效负载和密钥组合生成的。此签名用于验证令牌的完整性并确保其未被篡改。

JWT 常被使用，因为它们可以由客户端或任何服务在本地验证，而无需与授权服务器交互。这使得 JWT 在分布式系统中特别高效，其中多个服务可能需要独立验证令牌的真实性。

然而，这种便利也带来了确保令牌声明不被过度暴露的责任，因为它们对任何有权访问令牌的人都是可见的。此外，JWT 通常是短期的，过期时间包含在令牌的声明中，以确保令牌不会无限期有效。

## 不透明访问令牌验证

不透明访问令牌通过将其发送回授权服务器进行验证。授权服务器维护已发行令牌的状态，并可以根据其内部存储确定令牌的有效性。

```mermaid
sequenceDiagram
    participant C as 客户端
    participant AS as 授权服务器
    participant RP as 资源提供者

    C ->> AS: 1. post /oidc/token
    AS ->> C: 2. 不透明令牌
    C ->> RP: 3. get /api/resource
    RP ->> AS: 4. post /oidc/introspect
    AS ->> RP: 5. 令牌信息

```

1. 客户端向授权服务器请求访问令牌。
2. 授权服务器颁发不透明令牌。
3. 客户端在请求头中发送带有不透明令牌的资源访问请求。
4. 资源提供者向授权服务器发送令牌内省请求以验证令牌。
5. 授权服务器响应令牌信息。

## JWT 访问令牌验证（离线）

JWT 访问令牌可以由客户端或任何拥有令牌公钥的服务离线验证。

```mermaid

sequenceDiagram
    participant C as 客户端
    participant AS as 授权服务器
    participant RP as 资源提供者

    RP ->> AS: 0. get /oidc/.well-known/jwks.json

    C ->> AS: 1. post /oidc/token
    AS ->> C: 2. JWT 令牌
    C ->> RP: 3. get /api/resource
    RP ->> RP: 4. 验证 JWT 令牌
    RP ->> C: 5. 响应 200 OK

```

1. 资源提供者预先从<Ref slug="openid-connect-discovery" />获取授权服务器的公钥。公钥用于验证令牌的签名并确保其完整性。
2. 客户端向授权服务器请求访问令牌。
3. 授权服务器颁发 JWT 令牌。
4. 客户端在请求头中发送带有 JWT 令牌的资源访问请求。
5. 资源提供者使用从授权服务器获得的公钥解码并验证 JWT 令牌。
6. 资源提供者根据令牌的有效性授予访问权限。

## OIDC 中的使用案例

在 OIDC (<Ref slug="openid-connect" />) 的上下文中，不透明令牌和 JWT 用于不同的目的，并在不同的场景中使用。

### 不透明令牌

1. 用户资料检索：

默认情况下，当客户端请求访问令牌而未指定资源并包含 `openid` 范围时，授权服务器颁发不透明访问令牌。此令牌主要用于从 OIDC `/oidc/userinfo` 端点检索用户资料信息。在收到带有不透明访问令牌的请求后，授权服务器检查其内部存储以检索相关的授权信息，并在响应用户资料详细信息之前验证令牌的有效性。

2. 刷新令牌交换：

刷新令牌设计为仅在客户端和授权服务器之间交换，无需与资源提供者共享。因此，刷新令牌通常作为不透明令牌颁发。当当前访问令牌过期时，客户端可以使用不透明刷新令牌获取新的访问令牌，确保持续访问而无需重新认证用户。

### JWTs

1. ID 令牌：

在 OIDC 中，ID 令牌是一个包含用户信息的 JWT，用于认证用户。通常与访问令牌一起颁发，ID 令牌允许客户端验证用户的身份。例如：

```json
// ID 令牌的解码有效负载
{
  "iss": "<https://auth.wiki>",
  "sub": "1234567890",
  "aud": "client_id",
  "exp": 1630368000,
  "name": "John Doe",
  "email": "john.doe@mail.com",
  "picture": "<https://example.com/johndoe.jpg>"
}

```

客户端可以验证 ID 令牌以确保用户的身份，并提取用户信息以用于个性化或授权目的。ID 令牌仅供一次性使用，不应用于 API 资源授权。

2. API 资源访问（使用访问令牌）：

当客户端请求带有特定<Ref slug="resource-indicator" />的访问令牌时，授权服务器颁发用于访问该资源的 JWT 访问令牌。JWT 包含资源提供者可用于授权客户端访问的声明。例如：

```json
// JWT 访问令牌的解码有效负载
{
  "iss": "<https://auth.wiki>",
  "sub": "1234567890",
  "aud": "<https://api.example.com>",
  "scope": "read write",
  "exp": 1630368000
}

```

资源提供者可以通过检查声明来验证请求：

- `iss`：确认令牌由可信的授权服务器颁发。
- `sub`：标识与令牌关联的用户。
- `aud`：确保令牌用于特定资源。
- `scope`：验证授予用户的权限。

<SeeAlso slugs={['jwt']} />