---
title: 用户信息端点 (Userinfo endpoint)
tags: [oidc]
description: 用户信息端点 (Userinfo endpoint) 是一个 OpenID Connect (OIDC) 端点，为客户端提供用户信息。它是 ID 令牌 (ID token) 的补充端点，允许客户端检索额外的用户信息。
---

## 什么是用户信息端点 (Userinfo endpoint)？

在 <Ref slug="openid-connect" /> 中，用户信息端点 (userinfo endpoint) 是 <Ref slug="openid-connect" headingId="openid-provider-op" /> 的一个端点，提供用户信息给 <Ref slug="client">客户端</Ref>。用户信息端点通常是 <Ref slug="id-token" /> 的补充端点，允许客户端检索 ID 令牌 (ID token) 中未包含的额外用户信息。

用户信息端点在 [OpenID Connect Core 规范](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo) 中定义，通常在客户端获取到 ID 令牌 (ID token) 后被访问。

## 用户信息端点 (Userinfo endpoint) 如何工作？

当客户端向用户信息端点发出请求时，它需要包含从 <Ref slug="token-request" /> 获得的访问令牌 (access token)，并使用 `GET` 或 `POST` HTTP 方法。用户信息端点验证访问令牌 (access token)，并在响应中返回用户信息。

以下是一个非规范的用户信息请求示例：

```http
GET /userinfo HTTP/1.1
Host: openid-provider.example.com
Authorization: Bearer some-access-token
```

不同 OpenID 提供者的用户信息端点路径可能会有所不同。你可以参考提供者的 <Ref slug="openid-connect-discovery" /> 找到用户信息端点 URL。如果访问令牌 (access token) 有效，用户信息端点将响应用户信息：

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "sub": "user123",
  "name": "Alice",
  "email": "alice@foo.com",
  "birthdate": "1990-01-01",
  "address": {
    "street": "1234 Elm St",
    "city": "Springfield",
    "country": "US"
  }
}
```

响应中可能包含各种用户属性，如 `name`、`email`、`birthdate` 和 `address`；通常，它包含比 <Ref slug="id-token" /> 更多的 <Ref slug="claim">声明 (claims)</Ref>。实际返回的属性取决于 <Ref slug="openid-connect" headingId="openid-provider-op" /> 的配置和用户的同意。请参考你的 OpenID 提供者的文档以获取可用的具体属性。

### 签名和加密

用户信息响应可以被签名和/或加密以确保其完整性和保密性。如果应用了其中一种或两种保护，用户信息端点的响应将是一个 <Ref slug="jwt" />，而不是纯 JSON 对象。

<SeeAlso slugs={["openid-connect", "id-token", "openid-connect-discovery", "jwt", "signing-key"]} />