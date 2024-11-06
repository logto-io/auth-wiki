---
title: 令牌内省 (Token introspection)
tags: [oauth 2.0, oidc]
description: 令牌内省 (Token introspection) 是 OAuth 2.0 的一个扩展，允许客户端查询授权服务器以验证访问令牌并检索其元数据。
---

## 什么是令牌内省 (token introspection)？

令牌内省 (Token introspection) 是在 [RFC 7662](https://datatracker.ietf.org/doc/html/rfc7662) 中定义的 OAuth 2.0 扩展，允许<Ref slug="client">客户端</Ref>查询<Ref slug="authorization-server">授权服务器</Ref>以验证访问令牌并检索其元数据。此扩展在以下情况下非常有用：

- 客户端希望实时验证访问令牌的有效性。
- 访问令牌是<Ref slug="opaque-token">不透明令牌</Ref>（不是自包含的），需要授权服务器验证。

## 令牌内省 (Token introspection) 如何工作？

以下是一个令牌内省 (token introspection) 请求的非规范示例：

```http
POST /introspect HTTP/1.1
Host: authorization-server.example.com
Content-Type: application/x-www-form-urlencoded

token=random-token-value
  &token_type_hint=access_token
```

`token_type_hint` 参数是可选的，应该设置为正在内省的令牌的类型。如果访问令牌是有效的，授权服务器将以该令牌的元数据进行响应：

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "active": true,
  "scope": "read write",
  "client_id": "client-id",
  "username": "johndoe",
  "token_type": "Bearer",
  "exp": 1634020800,
  "iat": 1634017200
}
```

值得注意的是，并非所有的授权服务器都支持令牌内省 (token introspection)，并且并非所有的令牌都可以内省。<Ref slug="authorization-server">授权服务器</Ref>可能会基于各种因素限制令牌内省 (token introspection) 的使用，例如，一些授权服务器可能不支持对<Ref slug="jwt">JWT</Ref>的内省。

### 令牌内省 (Token introspection) 请求中的关键参数

以下是一个令牌内省 (token introspection) 请求中的两个关键参数：

- **`token`**: 要内省的令牌。
- **`token_type_hint`**: 正在内省的令牌的类型。可以是 `access_token` 或 `refresh_token`。

<SeeAlso slugs={["oauth-2.0", "opaque-token", "jwt"]} />

<Resources
  urls={[
    'https://blog.logto.io/oauth2-token-introspection',
    'https://datatracker.ietf.org/doc/html/rfc7662',
  ]}
/>
